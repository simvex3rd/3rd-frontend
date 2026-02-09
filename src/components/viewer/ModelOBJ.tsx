"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import {
  Mesh,
  MeshStandardMaterial,
  Color,
  Box3,
  Vector3,
  Group,
  Sphere,
  MathUtils,
  PerspectiveCamera,
} from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useSceneStore } from "@/stores/scene-store";
import { useUIStore } from "@/stores/ui-store";

interface ModelOBJProps {
  url: string;
}

/**
 * OBJ Model Loader Component
 *
 * Loads .obj files and provides interactions:
 * - Click to select parts (auto-shows PartInfoPanel)
 * - Click background to deselect
 * - Hover effect
 * - Explode animation (center-based direction)
 * - Wireframe mode toggle
 * - Focus on selected part
 */
export function ModelOBJ({ url }: ModelOBJProps) {
  const groupRef = useRef<Group>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const modelCenterRef = useRef<Vector3>(new Vector3());
  // eslint-disable-next-line react-hooks/exhaustive-deps -- useThree is not a standard hook
  const { camera, controls } = useThree();
  const setSelectedObject = useSceneStore((state) => state.setSelectedObject);
  const selectedObject = useSceneStore((state) => state.selectedObject);
  const explodeLevel = useSceneStore((state) => state.explodeLevel);
  const isWireframeMode = useUIStore((state) => state.isWireframeMode);

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

          // Compute model bounding box center for explode
          const modelBox = new Box3().setFromObject(object);
          modelCenterRef.current = modelBox.getCenter(new Vector3());

          // Initialize meshes
          let meshIndex = 0;
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

              // Store mesh index for fallback explode direction
              child.userData.meshIndex = meshIndex++;
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
          object.position.x = -center.x * scale;
          object.position.y = -center.y * scale;
          object.position.z = -center.z * scale;

          // Recompute model center after centering/scaling (should be ~origin now)
          groupRef.current.updateMatrixWorld(true);
          const finalBox = new Box3().setFromObject(groupRef.current);
          modelCenterRef.current = finalBox.getCenter(new Vector3());

          // Auto-fit camera if no saved camera from previous session
          if (!useSceneStore.getState().hasSavedCamera) {
            const sphere = new Sphere();
            finalBox.getBoundingSphere(sphere);
            const { center: modelCenter, radius } = sphere;

            if (radius > 0.001) {
              const perspCam = camera as PerspectiveCamera;
              const fovRad = MathUtils.degToRad(perspCam.fov);
              const fitDistance = radius / Math.tan(fovRad / 2);
              const distance = fitDistance * 1.8; // ~55% viewport fill

              // Gentle 3/4 view: 20° elevation, 15° azimuth
              const elevation = MathUtils.degToRad(20);
              const azimuth = MathUtils.degToRad(15);

              camera.position.set(
                modelCenter.x +
                  distance * Math.cos(elevation) * Math.sin(azimuth),
                modelCenter.y + distance * Math.sin(elevation),
                modelCenter.z +
                  distance * Math.cos(elevation) * Math.cos(azimuth)
              );
              camera.lookAt(modelCenter);
              camera.updateProjectionMatrix();

              if (controls) {
                const orbit = controls as OrbitControlsImpl;
                orbit.target.copy(modelCenter);
                orbit.update();
              }
            }
          }

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
  }, [url, camera, controls]);

  // Apply wireframe mode
  useEffect(() => {
    if (!groupRef.current || !isLoaded) return;

    groupRef.current.traverse((child) => {
      if (
        child instanceof Mesh &&
        child.material instanceof MeshStandardMaterial
      ) {
        child.material.wireframe = isWireframeMode;
      }
    });
  }, [isWireframeMode, isLoaded]);

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

  // Handle explode animation - center-based direction
  useFrame(() => {
    if (!groupRef.current || !isLoaded) return;

    const modelCenter = modelCenterRef.current;

    groupRef.current.traverse((child) => {
      if (child instanceof Mesh && child.userData.initialPosition) {
        const initial = child.userData.initialPosition as Vector3;

        if (explodeLevel === 0) {
          // Smooth lerp back to initial position
          child.position.lerp(initial, 0.1);
          return;
        }

        // Calculate direction from model center to part position
        const direction = new Vector3().subVectors(initial, modelCenter);
        const distance = direction.length();

        if (distance > 0.001) {
          // Normal case: part is not at center
          direction.normalize();
        } else {
          // Fallback for parts at/near center: use mesh index to create a direction
          const index = child.userData.meshIndex ?? 0;
          const angle = (index / 6) * Math.PI * 2; // Distribute around a circle
          const elevation = ((index % 3) - 1) * 0.5; // Spread vertically
          direction
            .set(Math.cos(angle), elevation, Math.sin(angle))
            .normalize();
        }

        const explodeDistance = explodeLevel * 2.0;
        const target = initial
          .clone()
          .add(direction.multiplyScalar(explodeDistance));

        // Smooth lerp to target position
        child.position.lerp(target, 0.1);
      }
    });
  });

  // Handle click on a part
  const handleClick = useCallback(
    (event: { stopPropagation: () => void; object: Mesh }) => {
      event.stopPropagation();
      const mesh = event.object as Mesh;

      if (mesh.userData.selectable) {
        const name = mesh.userData.name || mesh.name || mesh.uuid;
        setSelectedObject(name);
        // Auto-show PartInfoPanel
        useUIStore.setState({ isPartInfoVisible: true });
      }
    },
    [setSelectedObject]
  );

  // Handle click on empty space (missed) to deselect
  const handlePointerMissed = useCallback(() => {
    setSelectedObject(null);
    useUIStore.setState({ isPartInfoVisible: false });
  }, [setSelectedObject]);

  return (
    <group
      ref={groupRef}
      onClick={handleClick}
      onPointerMissed={handlePointerMissed}
    >
      {/* Model will be added here via loader */}
    </group>
  );
}
