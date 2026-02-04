"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useSceneStore } from "@/stores/scene-store";
import { useStoreHydration } from "@/hooks/use-store-hydration";

/**
 * Syncs camera position/rotation/target with Zustand store
 * Saves camera state to localStorage via persist middleware
 */
export function CameraSync() {
  // eslint-disable-next-line react-hooks/exhaustive-deps -- useThree is not an effect callback
  const { camera, controls } = useThree();
  const setCameraPosition = useSceneStore((state) => state.setCameraPosition);
  const setCameraRotation = useSceneStore((state) => state.setCameraRotation);
  const setCameraTarget = useSceneStore((state) => state.setCameraTarget);
  const hasHydrated = useStoreHydration();

  // Restore camera only once after hydration (use ref to avoid re-renders)
  const hasRestoredRef = useRef(false);

  useEffect(() => {
    if (!hasHydrated || hasRestoredRef.current || !controls) return;

    const storedPosition = useSceneStore.getState().cameraPosition;
    const storedRotation = useSceneStore.getState().cameraRotation;
    const storedTarget = useSceneStore.getState().cameraTarget;

    if (storedPosition) {
      camera.position.set(...storedPosition);
    }
    if (storedRotation) {
      camera.rotation.set(...storedRotation);
    }
    if (storedTarget) {
      const orbitControls = controls as OrbitControlsImpl;
      orbitControls.target.set(...storedTarget);
      orbitControls.update();
    }
    camera.updateProjectionMatrix();

    hasRestoredRef.current = true;
  }, [camera, controls, hasHydrated]);

  // Save camera state only when OrbitControls interaction ends
  useEffect(() => {
    if (!controls) return;

    const handleEnd = () => {
      const orbitControls = controls as OrbitControlsImpl;
      const pos = camera.position.toArray() as [number, number, number];
      const rot = [camera.rotation.x, camera.rotation.y, camera.rotation.z] as [
        number,
        number,
        number,
      ];
      const target = orbitControls.target.toArray() as [number, number, number];

      setCameraPosition(pos);
      setCameraRotation(rot);
      setCameraTarget(target);
    };

    // Type-safe casting to OrbitControls implementation
    const orbitControls = controls as OrbitControlsImpl;
    orbitControls.addEventListener("end", handleEnd);
    return () => {
      orbitControls.removeEventListener("end", handleEnd);
    };
  }, [camera, controls, setCameraPosition, setCameraRotation, setCameraTarget]);

  return null;
}
