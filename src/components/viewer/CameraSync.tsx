"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useSceneStore } from "@/stores/scene-store";

/**
 * Syncs camera position/rotation with Zustand store
 * Saves camera state to localStorage via persist middleware
 */
export function CameraSync() {
  // eslint-disable-next-line react-hooks/exhaustive-deps -- useThree is not an effect callback
  const { camera, controls } = useThree();
  const setCameraPosition = useSceneStore((state) => state.setCameraPosition);
  const setCameraRotation = useSceneStore((state) => state.setCameraRotation);
  const hasHydrated = useSceneStore((state) => state._hasHydrated);

  // Restore camera only once after hydration (use ref to avoid re-renders)
  const hasRestoredRef = useRef(false);

  useEffect(() => {
    if (!hasHydrated || hasRestoredRef.current) return;

    const storedPosition = useSceneStore.getState().cameraPosition;
    const storedRotation = useSceneStore.getState().cameraRotation;

    if (storedPosition) {
      camera.position.set(...storedPosition);
    }
    if (storedRotation) {
      camera.rotation.set(...storedRotation);
    }
    camera.updateProjectionMatrix();

    hasRestoredRef.current = true;
  }, [camera, hasHydrated]);

  // Save camera state only when OrbitControls interaction ends
  useEffect(() => {
    if (!controls) return;

    const handleEnd = () => {
      const pos = camera.position.toArray() as [number, number, number];
      const rot = [camera.rotation.x, camera.rotation.y, camera.rotation.z] as [
        number,
        number,
        number,
      ];

      setCameraPosition(pos);
      setCameraRotation(rot);
    };

    // Type assertion needed because controls type is not specific enough
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (controls as any).addEventListener("end", handleEnd);
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (controls as any).removeEventListener("end", handleEnd);
    };
  }, [camera, controls, setCameraPosition, setCameraRotation]);

  return null;
}
