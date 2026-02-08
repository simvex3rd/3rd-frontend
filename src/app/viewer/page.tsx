"use client";

import { SceneCanvas } from "@/components/viewer/SceneCanvas";
import { Model } from "@/components/viewer/Model";
import { PartInfoPanel } from "@/components/panels/PartInfoPanel";
import { useStoreHydration } from "@/hooks/use-store-hydration";

export default function Home() {
  // Restore persisted state from localStorage
  const isHydrated = useStoreHydration();

  return (
    <div className="relative h-screen w-full">
      {/* Only render Canvas after hydration to prevent flickering */}
      {!isHydrated && (
        <div className="flex h-full items-center justify-center">
          <p className="text-neutral-400">Loading...</p>
        </div>
      )}

      {isHydrated && (
        <SceneCanvas>
          <Model url="/models/V4_Engine/Crankshaft-draco.glb" />
        </SceneCanvas>
      )}

      <PartInfoPanel />
    </div>
  );
}
