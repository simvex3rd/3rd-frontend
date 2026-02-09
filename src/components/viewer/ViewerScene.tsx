"use client";

import { SceneCanvas } from "./SceneCanvas";
import { ModelOBJ } from "./ModelOBJ";

interface ViewerSceneProps {
  modelUrl: string | null;
  modelError: string | null;
}

/**
 * Wrapper that keeps SceneCanvas + ModelOBJ in a single dynamic-import unit.
 * This prevents Next.js dynamic boundaries from breaking R3F's context chain.
 */
export default function ViewerScene({
  modelUrl,
  modelError,
}: ViewerSceneProps) {
  return (
    <>
      <SceneCanvas>{modelUrl && <ModelOBJ url={modelUrl} />}</SceneCanvas>
      {modelError && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-neutral-400 text-[16px]">{modelError}</p>
        </div>
      )}
    </>
  );
}
