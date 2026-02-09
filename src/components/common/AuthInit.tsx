"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { configureAuth } from "@/lib/api";

/**
 * Invisible component that wires Clerk's getToken into the API client.
 * Must be rendered inside ClerkProvider.
 */
export function AuthInit() {
  const { getToken } = useAuth();

  useEffect(() => {
    configureAuth(getToken);
  }, [getToken]);

  return null;
}
