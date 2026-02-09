"use client";

import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import {
  Box3,
  Vector3,
  Sphere,
  MathUtils,
  Mesh,
  PerspectiveCamera,
} from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useSceneStore } from "@/stores/scene-store";

/**
 * Auto-fit camera to loaded model.
 *
 * Waits for model meshes (userData.selectable) to appear, then:
 * 1. Forces world matrix update for accurate bounding box
 * 2. Computes bounding sphere from model meshes only
 * 3. Calculates optimal distance with comfortable padding
 * 4. Positions camera at a gentle 3/4 view angle
 * 5. Syncs OrbitControls target to model center
 */
export function AutoFitCamera() {
  // eslint-disable-next-line react-hooks/exhaustive-deps -- useThree is not a standard hook
  const { camera, scene, controls } = useThree();
  const fitted = useRef(false);
  const hasSavedCamera = useSceneStore((state) => state.hasSavedCamera);

  useFrame(() => {
    if (fitted.current || hasSavedCamera) return;
    if (!controls) return;

    // Force world matrices to be current before computing bounds
    scene.updateMatrixWorld(true);

    // Collect bounding box from MODEL meshes only
    const box = new Box3();
    let meshCount = 0;
    scene.traverse((child) => {
      if (child instanceof Mesh && child.userData.selectable) {
        box.expandByObject(child);
        meshCount++;
      }
    });

    if (meshCount < 2 || box.isEmpty()) return;

    const sphere = new Sphere();
    box.getBoundingSphere(sphere);
    const { center, radius } = sphere;

    if (radius < 0.001) return;

    // Distance calculation: model fills ~55% of viewport height
    const perspCam = camera as PerspectiveCamera;
    const fovRad = MathUtils.degToRad(perspCam.fov);
    const fitDistance = radius / Math.tan(fovRad / 2);
    const distance = fitDistance * 1.8;

    // Gentle 3/4 view: 20° above, 15° to the side
    const elevation = MathUtils.degToRad(20);
    const azimuth = MathUtils.degToRad(15);

    const camPos = new Vector3(
      center.x + distance * Math.cos(elevation) * Math.sin(azimuth),
      center.y + distance * Math.sin(elevation),
      center.z + distance * Math.cos(elevation) * Math.cos(azimuth)
    );

    // Update OrbitControls target first
    const orbit = controls as OrbitControlsImpl;
    orbit.target.copy(center);

    // Set camera position and orientation
    camera.position.copy(camPos);
    camera.lookAt(center);
    camera.updateProjectionMatrix();

    // Recompute OrbitControls internal state
    orbit.update();

    fitted.current = true;
  });

  return null;
}
