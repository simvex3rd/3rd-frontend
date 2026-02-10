import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

// Check if Clerk is configured
const hasClerkKeys =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("your_");

/**
 * Public routes that don't require authentication
 * - Landing page: /
 * - 3D viewer: /viewer
 * - Lab (placeholder): /lab
 * - Legal pages: /privacy, /terms
 * - Demo page: /toast-demo
 * - Sign in/up pages
 * - Read-only APIs: /api/models, /api/parts
 *
 * Protected routes (require authentication):
 * - Study dashboard: /study
 * - AI chat: /chat
 *
 * Note: Backend API at Railway handles its own authentication.
 * Frontend middleware only protects Next.js page routes.
 */
const isPublicRoute = createRouteMatcher([
  "/",
  "/viewer(.*)",
  "/lab(.*)",
  "/study(.*)",
  "/toast-demo(.*)",
  "/privacy(.*)",
  "/terms(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/sso-callback(.*)",
  "/api/models(.*)",
  "/api/parts(.*)",
]);

const isAuthRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

/**
 * Protected routes that require authentication
 * - Chat: /api/chat/*
 * - Notes: /api/notes/*
 * - User profile: /api/users/*
 */
if (!hasClerkKeys && process.env.NODE_ENV !== "production") {
  console.warn(
    "[security] Clerk keys not configured - auth middleware disabled in dev mode"
  );
}

const middleware = hasClerkKeys
  ? clerkMiddleware(async (auth, request) => {
      const { userId } = await auth();
      // Redirect signed-in users away from auth pages
      if (userId && isAuthRoute(request)) {
        const url = new URL("/", request.url);
        return NextResponse.redirect(url);
      }
      if (!isPublicRoute(request)) {
        if (!userId) {
          const signInUrl = new URL("/sign-in", request.url);
          signInUrl.searchParams.set("redirect_url", request.nextUrl.pathname);
          return NextResponse.redirect(signInUrl);
        }
      }
    })
  : (request: NextRequest) => {
      // In production without Clerk, block protected routes
      if (process.env.NODE_ENV === "production" && !isPublicRoute(request)) {
        return NextResponse.json(
          { error: "Authentication not configured" },
          { status: 503 }
        );
      }
      return NextResponse.next();
    };

export default middleware;

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|glb|gltf|obj|mtl|wasm)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
