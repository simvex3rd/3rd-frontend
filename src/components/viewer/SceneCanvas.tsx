"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense, ReactNode } from "react";
import { Stats } from "./Stats";

interface SceneCanvasProps {
  children: ReactNode;
  enableControls?: boolean;
}

export function SceneCanvas({
  children,
  enableControls = true,
}: SceneCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <Suspense fallback={null}>
        <Environment preset="city" />
        {children}
        {enableControls && <OrbitControls makeDefault />}
        <Stats />
      </Suspense>
    </Canvas>
  );
}
