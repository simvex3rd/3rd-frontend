"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";

/**
 * Client-side auth guard hook.
 *
 * Redirects unauthenticated users to `/sign-in?redirect_url=<current path>`.
 * Use on any page that requires authentication.
 *
 * @returns `isReady` — true only when auth is loaded AND user is signed in
 *
 * @example
 * ```tsx
 * function ProtectedPage() {
 *   const { isReady } = useAuthGuard();
 *   if (!isReady) return <Loader />;
 *   return <Content />;
 * }
 * ```
 */
export function useAuthGuard() {
  // treatPendingAsSignedOut: false — Clerk v6 treats sessions with pending
  // tasks (e.g. org selection) as signed-out by default. We override this
  // so users who just logged in aren't bounced back to sign-in.
  const { isLoaded, isSignedIn, userId } = useAuth({
    treatPendingAsSignedOut: false,
  });
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("[auth-guard]", { isLoaded, isSignedIn, userId, pathname });
    }
    if (isLoaded && !isSignedIn) {
      router.replace(`/sign-in?redirect_url=${encodeURIComponent(pathname)}`);
    }
  }, [isLoaded, isSignedIn, userId, router, pathname]);

  return { isLoaded, isSignedIn, isReady: isLoaded && !!isSignedIn };
}
