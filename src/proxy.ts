import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

// Check if Clerk is configured
const hasClerkKeys =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("your_");

if (!hasClerkKeys && process.env.NODE_ENV !== "production") {
  console.warn(
    "[security] Clerk keys not configured - auth middleware disabled in dev mode"
  );
}

/**
 * Proxy (Next.js 16 convention, replaces middleware.ts)
 *
 * Two-layer auth strategy:
 * 1. Server-side: Clerk proxy decorates requests with auth state.
 *    Protected routes use `auth.protect()` for server-side redirect.
 * 2. Client-side: `useAuthGuard()` hook as backup for edge cases
 *    where server-side auth detection fails.
 */
const isPublicRoute = createRouteMatcher([
  "/",
  "/toast-demo(.*)",
  "/privacy(.*)",
  "/terms(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/sso-callback(.*)",
  "/api/models(.*)",
  "/api/parts(.*)",
]);

const proxy = hasClerkKeys
  ? clerkMiddleware(async (auth, request) => {
      // Protect non-public routes — redirects to sign-in automatically
      if (!isPublicRoute(request)) {
        // treatPendingAsSignedOut: false — don't block users with pending
        // session tasks (e.g. org selection). Client-side guard handles UX.
        const { userId } = await auth({ treatPendingAsSignedOut: false });
        if (!userId) {
          const signInUrl = new URL("/sign-in", request.url);
          signInUrl.searchParams.set("redirect_url", request.nextUrl.pathname);
          return NextResponse.redirect(signInUrl);
        }
      }
    })
  : (_request: NextRequest) => {
      return NextResponse.next();
    };

export default proxy;

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|glb|gltf|obj|mtl|wasm)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
