"use client";

import { SceneCanvas } from "@/components/viewer/SceneCanvas";
import { Model } from "@/components/viewer/Model";
import { PartInfoPanel } from "@/components/panels/PartInfoPanel";
import { useStoreHydration } from "@/hooks/use-store-hydration";

export default function Home() {
  // Restore persisted state from localStorage
  useStoreHydration();

  return (
    <div className="relative h-screen w-full">
      <SceneCanvas>
        <Model url="/models/V4_Engine/Crankshaft-draco.glb" />
      </SceneCanvas>
      <PartInfoPanel />
    </div>
  );
}
