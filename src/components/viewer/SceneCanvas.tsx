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
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        {enableAutoFit ? (
          <Bounds fit clip observe margin={1.2}>
            {children}
          </Bounds>
        ) : (
          children
        )}
        {enableControls && (
          <OrbitControls
            makeDefault
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
          />
        )}
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport
            axisColors={["#ff4444", "#44ff44", "#4444ff"]}
            labelColor="white"
          />
        </GizmoHelper>
        <Stats />
      </Suspense>
    </Canvas>
  );
}
