"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Bounds,
  GizmoHelper,
  GizmoViewport,
} from "@react-three/drei";
import { Suspense, ReactNode } from "react";
import { Stats } from "./Stats";
import { CameraSync } from "./CameraSync";
import { useSceneStore } from "@/stores/scene-store";

interface SceneCanvasProps {
  children: ReactNode;
  enableControls?: boolean;
  enableAutoFit?: boolean;
}

export function SceneCanvas({
  children,
  enableControls = true,
  enableAutoFit = true,
}: SceneCanvasProps) {
  const cameraPosition = useSceneStore((state) => state.cameraPosition);
  const hasSavedCamera = useSceneStore((state) => state.hasSavedCamera);

  // Only fit when auto-fit is enabled AND there's no saved camera
  const shouldFit = enableAutoFit && !hasSavedCamera;

  return (
    <Canvas
      camera={{ position: cameraPosition, fov: 35 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <Suspense fallback={null}>
        <CameraSync />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        {shouldFit ? (
          <Bounds fit clip observe={false} margin={1.0}>
            {children}
          </Bounds>
        ) : (
          children
        )}
        {enableControls && (
          <>
            <OrbitControls
              makeDefault
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
            />
            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
              <GizmoViewport
                axisColors={["#ff4444", "#44ff44", "#4444ff"]}
                labelColor="white"
              />
            </GizmoHelper>
          </>
        )}
        <Stats />
      </Suspense>
    </Canvas>
  );
}
