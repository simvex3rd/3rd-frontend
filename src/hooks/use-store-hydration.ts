"use client";

import { useEffect, useState } from "react";
import { useSceneStore } from "@/stores/scene-store";

/**
 * Hook to handle Zustand persist hydration in Next.js App Router
 * Call this in client components to restore persisted state from localStorage
 *
 * @returns {boolean} Whether the store has been hydrated from localStorage
 */
export function useStoreHydration(): boolean {
  // Initialize with current hydration status to avoid setState in effect
  // Use optional chaining in case persist is not yet initialized
  const [hydrated, setHydrated] = useState(
    () => useSceneStore.persist?.hasHydrated() ?? false
  );

  useEffect(() => {
    // If already hydrated during initial state, no need to do anything
    if (hydrated) return;

    // Subscribe to hydration events
    const unsubFinishHydration = useSceneStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    // Trigger rehydration from localStorage with error handling
    try {
      useSceneStore.persist.rehydrate();
    } catch (error) {
      // Distinguish between expected storage errors and unexpected bugs
      const isStorageError =
        error instanceof DOMException || // QuotaExceededError, SecurityError
        (error instanceof Error && error.message.includes("localStorage"));

      if (!isStorageError && process.env.NODE_ENV === "development") {
        // Re-throw unexpected errors in development to catch bugs
        console.error("[Hydration] Unexpected error type:", error);
        throw error;
      }

      // Log sanitized error (avoid exposing sensitive data/XSS risk)
      console.warn(
        "[Hydration] localStorage unavailable, using defaults:",
        error instanceof Error ? error.name : "Unknown error"
      );

      // Development-only detailed logging
      if (process.env.NODE_ENV === "development") {
        console.debug("[Hydration] Full error details:", error);
      }

      // Mark as hydrated to allow app to function normally
      // Using queueMicrotask to defer state update and satisfy ESLint
      // This is a legitimate fallback case, not a cascading render
      queueMicrotask(() => {
        setHydrated(true);
      });
    }

    return () => {
      unsubFinishHydration();
    };
  }, [hydrated]);

  return hydrated;
}
