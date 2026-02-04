"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { Mesh, MeshStandardMaterial, Color } from "three";
import { ThreeEvent } from "@react-three/fiber";
import { useSceneStore } from "@/stores/scene-store";

interface ModelProps {
  url: string;
}

// Configure DRACOLoader to use local decoder files
// This enables loading of Draco-compressed GLTF models
// Decoder files are located in public/draco/
useGLTF.setDecoderPath("/draco/");

export function Model({ url }: ModelProps) {
  // Enable Draco compression support (second parameter)
  const { scene } = useGLTF(url, true);
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

  // Cleanup Three.js resources on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      scene.traverse((child) => {
        if (child instanceof Mesh) {
          // Dispose geometry
          if (child.geometry) {
            child.geometry.dispose();
          }

          // Dispose material(s)
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((material) => {
                material.dispose();
                // Dispose textures
                if (material.map) material.map.dispose();
                if (material.normalMap) material.normalMap.dispose();
                if (material.roughnessMap) material.roughnessMap.dispose();
                if (material.metalnessMap) material.metalnessMap.dispose();
              });
            } else {
              child.material.dispose();
              // Dispose textures
              if (child.material.map) child.material.map.dispose();
              if (child.material.normalMap) child.material.normalMap.dispose();
              if (child.material.roughnessMap)
                child.material.roughnessMap.dispose();
              if (child.material.metalnessMap)
                child.material.metalnessMap.dispose();
            }
          }
        }
      });
    };
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
