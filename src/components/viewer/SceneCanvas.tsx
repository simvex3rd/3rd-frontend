"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { Suspense, ReactNode, useEffect } from "react";
import { Stats } from "./Stats";
import { CameraSync } from "./CameraSync";
import { useSceneStore } from "@/stores/scene-store";
import { useUIStore } from "@/stores/ui-store";
import { Box3, Vector3, Mesh } from "three";

interface SceneCanvasProps {
  children: ReactNode;
  enableControls?: boolean;
}

/**
 * Inner component that handles focus on selected part.
 * Must be rendered inside Canvas.
 */
function FocusController() {
  // eslint-disable-next-line react-hooks/exhaustive-deps -- useThree is not a standard hook
  const { camera, scene } = useThree();
  const activeViewerTool = useUIStore((state) => state.activeViewerTool);
  const selectedObject = useSceneStore((state) => state.selectedObject);

  useEffect(() => {
    if (activeViewerTool !== "focus" || !selectedObject) return;

    // Find the selected mesh in the scene
    let targetMesh: Mesh | null = null;
    scene.traverse((child) => {
      if (
        child instanceof Mesh &&
        (child.userData.name === selectedObject ||
          child.name === selectedObject)
      ) {
        targetMesh = child;
      }
    });

    if (!targetMesh) return;

    // Compute world bounding box
    const box = new Box3().setFromObject(targetMesh);
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const distance = maxDim * 3;

    // Move camera to look at the part
    const direction = new Vector3()
      .subVectors(camera.position, center)
      .normalize();
    const newPos = center.clone().add(direction.multiplyScalar(distance));

    camera.position.copy(newPos);
    camera.lookAt(center);

    // Update scene store camera
    useSceneStore.getState().setCameraPosition([newPos.x, newPos.y, newPos.z]);
    useSceneStore.getState().setCameraTarget([center.x, center.y, center.z]);
  }, [activeViewerTool, selectedObject, camera, scene]);

  return null;
}

/**
 * Inner controls component to read UI store inside Canvas.
 */
function Controls() {
  const isCameraLocked = useUIStore((state) => state.isCameraLocked);

  return (
    <OrbitControls
      makeDefault
      enablePan={!isCameraLocked}
      enableZoom={!isCameraLocked}
      enableRotate={!isCameraLocked}
    />
  );
}

export function SceneCanvas({
  children,
  enableControls = true,
}: SceneCanvasProps) {
  const cameraPosition = useSceneStore((state) => state.cameraPosition);

  // Force react-use-measure to re-measure after CSS zoom is fully applied.
  // Without this, the initial getBoundingClientRect() may return stale values
  // before body zoom: 0.75 + transform: scale(1.3333) settle.
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Canvas
      camera={{ position: cameraPosition, fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <Suspense fallback={null}>
        <CameraSync />
        <FocusController />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        {children}
        {enableControls && <Controls />}
        <Stats />
      </Suspense>
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport
          axisColors={["#ff4444", "#44ff44", "#4444ff"]}
          labelColor="white"
        />
      </GizmoHelper>
    </Canvas>
  );
}
