"use client";

import { SceneCanvas } from "@/components/viewer/SceneCanvas";
import { Model } from "@/components/viewer/Model";

export default function Home() {
  return (
    <div className="h-screen w-full">
      <SceneCanvas>
        <Model url="/models/V4_Engine/Crankshaft.glb" />
      </SceneCanvas>
    </div>
  );
}
