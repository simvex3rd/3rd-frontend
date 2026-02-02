"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useSceneStore } from "@/stores/scene-store";

/**
 * Syncs camera position/rotation with Zustand store
 * Saves camera state to localStorage via persist middleware
 */
export function CameraSync() {
  const { camera } = useThree();
  const cameraPosition = useSceneStore((state) => state.cameraPosition);
  const cameraRotation = useSceneStore((state) => state.cameraRotation);
  const setCameraPosition = useSceneStore((state) => state.setCameraPosition);
  const setCameraRotation = useSceneStore((state) => state.setCameraRotation);

  // Restore camera from store on mount
  useEffect(() => {
    if (cameraPosition) {
      camera.position.set(...cameraPosition);
    }
    if (cameraRotation) {
      camera.rotation.set(...cameraRotation);
    }
    camera.updateProjectionMatrix();
  }, [camera, cameraPosition, cameraRotation]);

  // Save camera state on change (throttled via animation frame)
  useEffect(() => {
    let animationFrameId: number;

    const syncCamera = () => {
      const pos = camera.position.toArray() as [number, number, number];
      const rot = [camera.rotation.x, camera.rotation.y, camera.rotation.z] as [
        number,
        number,
        number,
      ];

      setCameraPosition(pos);
      setCameraRotation(rot);

      animationFrameId = requestAnimationFrame(syncCamera);
    };

    // Start syncing after a delay (avoid initial spam)
    const timeoutId = setTimeout(() => {
      animationFrameId = requestAnimationFrame(syncCamera);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
    };
  }, [camera, setCameraPosition, setCameraRotation]);

  return null;
}
