import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Check if Clerk is configured
const hasClerkKeys =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("your_");

/**
 * Public routes that don't require authentication
 * - Landing page: /
 * - 3D viewer: / (public access to view models)
 * - Model API: /api/models, /api/parts (read-only)
 */
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/models(.*)",
  "/api/parts(.*)",
]);

/**
 * Protected routes that require authentication
 * - Chat: /api/chat/*
 * - Notes: /api/notes/*
 * - User profile: /api/users/*
 */
const middleware = hasClerkKeys
  ? clerkMiddleware(async (auth, request) => {
      if (!isPublicRoute(request)) {
        await auth.protect();
      }
    })
  : () => NextResponse.next();

export default middleware;

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|glb|gltf)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
