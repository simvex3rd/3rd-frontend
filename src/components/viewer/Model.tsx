"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { Mesh, MeshStandardMaterial, Color } from "three";
import { ThreeEvent } from "@react-three/fiber";
import { useSceneStore } from "@/stores/scene-store";

interface ModelProps {
  url: string;
}

export function Model({ url }: ModelProps) {
  const { scene } = useGLTF(url);
  const setSelectedObject = useSceneStore((state) => state.setSelectedObject);
  const selectedObject = useSceneStore((state) => state.selectedObject);

  // Initialize meshes with userData
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        // Store original name or generate one
        if (!child.userData.name) {
          child.userData.name = child.name || child.uuid;
        }

        // Store original emissive color
        if (
          child.material instanceof MeshStandardMaterial &&
          !child.userData.originalEmissive
        ) {
          child.userData.originalEmissive = child.material.emissive.clone();
        }

        // Enable raycast for this mesh
        child.userData.selectable = true;
      }
    });
  }, [scene]);

  // Apply highlight effect to selected part
  useEffect(() => {
    scene.traverse((child) => {
      if (
        child instanceof Mesh &&
        child.material instanceof MeshStandardMaterial
      ) {
        const partName = child.userData.name || child.name || child.uuid;
        const isSelected = selectedObject === partName;

        if (isSelected) {
          // Highlight selected part with emissive color
          child.material.emissive = new Color(0x4444ff);
          child.material.emissiveIntensity = 0.5;
        } else {
          // Restore original emissive
          child.material.emissive =
            child.userData.originalEmissive || new Color(0x000000);
          child.material.emissiveIntensity = 1;
        }
      }
    });
  }, [scene, selectedObject]);

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
