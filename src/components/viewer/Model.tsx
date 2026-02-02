"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { Mesh } from "three";
import { ThreeEvent } from "@react-three/fiber";
import { useSceneStore } from "@/stores/scene-store";

interface ModelProps {
  url: string;
}

export function Model({ url }: ModelProps) {
  const { scene } = useGLTF(url);
  const setSelectedObject = useSceneStore((state) => state.setSelectedObject);

  useEffect(() => {
    // Traverse scene and add click handlers to all meshes
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        // Store original name or generate one
        if (!child.userData.name) {
          child.userData.name = child.name || child.uuid;
        }

        // Enable raycast for this mesh
        child.userData.selectable = true;
      }
    });
  }, [scene]);

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    const mesh = event.object as Mesh;

    if (mesh.userData.selectable) {
      const partName = mesh.userData.name || mesh.name || mesh.uuid;
      setSelectedObject(partName);
    }
  };

  return <primitive object={scene} onClick={handleClick} />;
}
