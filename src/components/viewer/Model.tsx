"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { Mesh } from "three";

interface ModelProps {
  url: string;
}

export function Model({ url }: ModelProps) {
  const { scene } = useGLTF(url);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      scene.traverse((child) => {
        if (child instanceof Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    };
  }, [scene]);

  return <primitive object={scene} />;
}
