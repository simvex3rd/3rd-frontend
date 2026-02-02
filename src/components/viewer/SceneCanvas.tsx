"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
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
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        {children}
        {enableControls && <OrbitControls makeDefault />}
        <Stats />
      </Suspense>
    </Canvas>
  );
}
