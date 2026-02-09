"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { Mesh, MeshStandardMaterial, Color, Box3, Vector3, Group } from "three";
import { useSceneStore } from "@/stores/scene-store";

interface ModelOBJProps {
  url: string;
}

/**
 * OBJ Model Loader Component
 *
 * Loads .obj files and provides same interactions as GLTF models:
 * - Click to select parts
 * - Hover effect
 * - Explode animation
 */
export function ModelOBJ({ url }: ModelOBJProps) {
  const groupRef = useRef<Group>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const setSelectedObject = useSceneStore((state) => state.setSelectedObject);
  const selectedObject = useSceneStore((state) => state.selectedObject);
  const explodeLevel = useSceneStore((state) => state.explodeLevel);

  // Load OBJ file
  useEffect(() => {
    const loader = new OBJLoader();

    loader.load(
      url,
      (object) => {
        if (groupRef.current) {
          // Clear previous model
          while (groupRef.current.children.length > 0) {
            groupRef.current.remove(groupRef.current.children[0]);
          }

          // Add loaded model
          groupRef.current.add(object);

          // Initialize meshes
          object.traverse((child) => {
            if (child instanceof Mesh) {
              // Set name
              if (!child.userData.name) {
                child.userData.name = child.name || child.uuid;
              }

              // Apply standard material if needed
              if (!(child.material instanceof MeshStandardMaterial)) {
                child.material = new MeshStandardMaterial({
                  color: 0xcccccc,
                  metalness: 0.3,
                  roughness: 0.7,
                });
              }

              // Store original emissive color
              if (
                child.material instanceof MeshStandardMaterial &&
                !child.userData.originalEmissive
              ) {
                child.userData.originalEmissive =
                  child.material.emissive.clone();
              }

              // Enable raycasting
              child.userData.selectable = true;

              // Store initial position for explode animation
              if (!child.userData.initialPosition) {
                child.userData.initialPosition = child.position.clone();
              }
            }
          });

          // Center and scale model
          const box = new Box3().setFromObject(object);
          const center = box.getCenter(new Vector3());
          const size = box.getSize(new Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 5 / maxDim; // Scale to fit in 5 units

          // Apply scale first
          object.scale.setScalar(scale);

          // Then center by moving the object
          // Multiply center by scale to get the correct offset
          object.position.x = -center.x * scale;
          object.position.y = -center.y * scale;
          object.position.z = -center.z * scale;

          setIsLoaded(true);
        }
      },
      (progress) => {
        console.log(
          `Loading OBJ: ${((progress.loaded / progress.total) * 100).toFixed(2)}%`
        );
      },
      (error) => {
        console.error("Error loading OBJ:", error);
      }
    );
  }, [url]);

  // Handle selection highlight
  useFrame(() => {
    if (!groupRef.current || !isLoaded) return;

    groupRef.current.traverse((child) => {
      if (
        child instanceof Mesh &&
        child.material instanceof MeshStandardMaterial
      ) {
        const isSelected = selectedObject === child.userData.name;

        if (isSelected) {
          // Highlight selected part
          child.material.emissive = new Color(0x00eee1); // Primary cyan
          child.material.emissiveIntensity = 0.5;
        } else {
          // Reset to original
          child.material.emissive =
            child.userData.originalEmissive || new Color(0x000000);
          child.material.emissiveIntensity = 0;
        }
      }
    });
  });

  // Handle explode animation
  useFrame(() => {
    if (!groupRef.current || !isLoaded) return;

    groupRef.current.traverse((child) => {
      if (child instanceof Mesh && child.userData.initialPosition) {
        const initial = child.userData.initialPosition as Vector3;
        const target = initial.clone().multiplyScalar(1 + explodeLevel * 0.5);

        // Smooth lerp to target position
        child.position.lerp(target, 0.1);
      }
    });
  });

  // Handle click
  const handleClick = (event: any) => {
    event.stopPropagation();
    const mesh = event.object as Mesh;

    if (mesh.userData.selectable) {
      const name = mesh.userData.name || mesh.name || mesh.uuid;
      setSelectedObject(name);
    }
  };

  return (
    <group ref={groupRef} onClick={handleClick}>
      {/* Model will be added here via loader */}
    </group>
  );
}
