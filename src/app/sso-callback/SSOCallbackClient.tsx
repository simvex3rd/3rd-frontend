"use client";

import {
  AuthenticateWithRedirectCallback,
  useAuth,
  useUser,
} from "@clerk/nextjs";
import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/api";

export default function SSOCallbackClient() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const syncAttempted = useRef(false);

  useEffect(() => {
    if (isSignedIn && user && !syncAttempted.current) {
      syncAttempted.current = true;
      const email = user.primaryEmailAddress?.emailAddress ?? null;
      const username =
        user.fullName ?? user.firstName ?? email?.split("@")[0] ?? "user";

      api.auth
        .login({ email, username })
        .catch(() =>
          console.warn("Backend user sync failed after OAuth sign-in")
        );
      // Redirect is handled by AuthenticateWithRedirectCallback via redirectUrlComplete
    }
  }, [isSignedIn, user]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950">
      <Loader2 className="h-[32px] w-[32px] animate-spin text-primary" />
      <AuthenticateWithRedirectCallback
        signInFallbackRedirectUrl="/"
        signUpFallbackRedirectUrl="/"
      />
    </div>
  );
}
