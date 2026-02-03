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
      // localStorage may fail in:
      // - Private/incognito mode (some browsers block access)
      // - Quota exceeded
      // - Corrupted data
      // - Browser security settings
      console.error("[Hydration] Failed to restore from localStorage:", error);

      // Fallback: Schedule state update to avoid cascading renders
      // Treat as first-time visitor (allow app to function)
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
