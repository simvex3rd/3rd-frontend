"use client";

import { useEffect } from "react";
import { useSceneStore } from "@/stores/scene-store";

/**
 * Hook to handle Zustand persist hydration in Next.js App Router
 * Call this in client components to restore persisted state from localStorage
 */
export function useStoreHydration() {
  useEffect(() => {
    // Rehydrate the persisted store on mount
    useSceneStore.persist.rehydrate();
  }, []);
}
