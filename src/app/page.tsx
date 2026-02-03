"use client";

import { SceneCanvas } from "@/components/viewer/SceneCanvas";
import { Model } from "@/components/viewer/Model";
import { PartInfoPanel } from "@/components/panels/PartInfoPanel";

export default function Home() {
  return (
    <div className="relative h-screen w-full">
      <SceneCanvas>
        <Model url="/models/V4_Engine/Crankshaft.glb" />
      </SceneCanvas>
      <PartInfoPanel />
    </div>
  );
}
