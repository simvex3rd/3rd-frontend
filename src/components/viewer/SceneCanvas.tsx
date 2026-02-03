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

  // Check if camera position is not default [0, 0, 5]
  const hasStoredCamera =
    cameraPosition[0] !== 0 ||
    cameraPosition[1] !== 0 ||
    cameraPosition[2] !== 5;

  // Only fit when auto-fit is enabled AND there's no stored camera position
  const shouldFit = enableAutoFit && !hasStoredCamera;

  return (
    <Canvas
      camera={{ position: cameraPosition, fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <Suspense fallback={null}>
        <CameraSync />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        {shouldFit ? (
          <Bounds fit clip observe={false} margin={1.2}>
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
