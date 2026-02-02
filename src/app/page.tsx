"use client";

import { SceneCanvas } from "@/components/viewer/SceneCanvas";
import { Model } from "@/components/viewer/Model";

export default function Home() {
  return (
    <div className="h-screen w-full">
      <SceneCanvas>
        <Model url="https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/scene.gltf" />
      </SceneCanvas>
    </div>
  );
}
