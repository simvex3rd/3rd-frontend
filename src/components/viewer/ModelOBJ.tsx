"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
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
  type Object3D,
} from "three";

// Pre-allocated objects to avoid GC pressure in useFrame (60fps)
const _highlightColor = new Color(0x00eee1);
const _defaultEmissive = new Color(0x000000);
const _tempDirection = new Vector3();
const _tempTarget = new Vector3();

/** Dispose all GPU resources from a Three.js object tree */
function disposeObject(obj: Object3D) {
  obj.traverse((child) => {
    if (child instanceof Mesh) {
      child.geometry?.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => {
            m.map?.dispose();
            m.dispose();
          });
        } else {
          child.material.map?.dispose();
          child.material.dispose();
        }
      }
    }
  });
}
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useSceneStore } from "@/stores/scene-store";
import { useUIStore } from "@/stores/ui-store";
import { toast } from "@/hooks/use-toast";
import type { PartWithGeometry } from "@/types/api";

/** Distinct color palette for part groups (10 colors, high contrast on dark bg) */
const PART_COLORS = [
  new Color(0x4fc3f7), // light blue
  new Color(0xef5350), // red
  new Color(0x66bb6a), // green
  new Color(0xffa726), // orange
  new Color(0xab47bc), // purple
  new Color(0x26c6da), // cyan
  new Color(0xffee58), // yellow
  new Color(0xec407a), // pink
  new Color(0x8d6e63), // brown
  new Color(0x78909c), // blue-gray
];

/** Build a map from mesh name → part color index */
function buildMeshColorMap(parts: PartWithGeometry[]): Map<string, number> {
  const map = new Map<string, number>();
  parts.forEach((part, index) => {
    if (part.mesh_names) {
      for (const meshName of part.mesh_names) {
        map.set(meshName, index);
      }
    }
  });
  return map;
}

interface ModelOBJProps {
  url: string;
  parts?: PartWithGeometry[];
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
export function ModelOBJ({ url, parts = [] }: ModelOBJProps) {
  const groupRef = useRef<Group>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const modelCenterRef = useRef<Vector3>(new Vector3());
  const meshesRef = useRef<Mesh[]>([]);
  const needsCameraFitRef = useRef(false);
  const setSelectedObject = useSceneStore((state) => state.setSelectedObject);
  const selectedObject = useSceneStore((state) => state.selectedObject);
  const explodeLevel = useSceneStore((state) => state.explodeLevel);
  const isWireframeMode = useUIStore((state) => state.isWireframeMode);
  const isColorMode = useUIStore((state) => state.isColorMode);
  const setHasColorData = useSceneStore((state) => state.setHasColorData);

  // Load OBJ file (with optional MTL for colors)
  useEffect(() => {
    let cancelled = false;

    /** Process loaded OBJ object */
    const processObject = (object: Group) => {
      if (cancelled || !groupRef.current) {
        disposeObject(object);
        return;
      }

      // Dispose and clear previous model to prevent VRAM leaks
      while (groupRef.current.children.length > 0) {
        const child = groupRef.current.children[0];
        disposeObject(child);
        groupRef.current.remove(child);
      }

      // Add loaded model
      groupRef.current.add(object);

      // Build mesh→part color map and determine if color data is available
      const meshColorMap = buildMeshColorMap(parts);
      const hasColors = meshColorMap.size > 0;
      setHasColorData(hasColors);

      // Compute model bounding box center for explode
      const modelBox = new Box3().setFromObject(object);
      modelCenterRef.current = modelBox.getCenter(new Vector3());

      // Initialize meshes and cache refs for useFrame (avoid traverse at 60fps)
      const cachedMeshes: Mesh[] = [];
      let meshIndex = 0;
      object.traverse((child) => {
        if (child instanceof Mesh) {
          cachedMeshes.push(child);

          // Set name
          if (!child.userData.name) {
            child.userData.name = child.name || child.uuid;
          }

          // Convert to MeshStandardMaterial with default gray
          if (!(child.material instanceof MeshStandardMaterial)) {
            const oldMat = child.material as { dispose?: () => void };
            child.material = new MeshStandardMaterial({
              color: 0xcccccc,
              metalness: 0.3,
              roughness: 0.7,
            });
            oldMat.dispose?.();
          }

          // Assign part color based on mesh_names mapping
          const meshName = child.userData.name;
          const partIndex = meshColorMap.get(meshName);
          if (partIndex !== undefined) {
            child.userData.partColor =
              PART_COLORS[partIndex % PART_COLORS.length].clone();
          }

          // Store original emissive color
          if (
            child.material instanceof MeshStandardMaterial &&
            !child.userData.originalEmissive
          ) {
            child.userData.originalEmissive = child.material.emissive.clone();
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
      meshesRef.current = cachedMeshes;

      // Center and scale model
      const box = new Box3().setFromObject(object);
      const center = box.getCenter(new Vector3());
      const size = box.getSize(new Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = maxDim > 0 ? 5 / maxDim : 1; // Scale to fit in 5 units

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

      // Signal camera fit needed (done in useFrame where camera/controls are available)
      if (!useSceneStore.getState().hasSavedCamera) {
        needsCameraFitRef.current = true;
      }

      setIsLoaded(true);
    };

    const onProgress = (progress: ProgressEvent) => {
      const pct =
        progress.total > 0
          ? ((progress.loaded / progress.total) * 100).toFixed(2)
          : "?";
      if (process.env.NODE_ENV === "development")
        console.log(`Loading OBJ: ${pct}%`);
    };

    const onError = (error: unknown) => {
      if (!cancelled) {
        console.error("Error loading OBJ:", error);
        toast.error("3D 모델 로드 실패", "모델 파일을 불러올 수 없습니다");
      }
    };

    // Load OBJ
    const objLoader = new OBJLoader();
    objLoader.load(url, processObject, onProgress, onError);

    return () => {
      cancelled = true;
      // Dispose GPU resources on unmount to prevent VRAM leaks
      if (groupRef.current) {
        while (groupRef.current.children.length > 0) {
          const child = groupRef.current.children[0];
          disposeObject(child);
          groupRef.current.remove(child);
        }
      }
      meshesRef.current = [];
      setHasColorData(false);
    };
  }, [url, parts, setHasColorData]);

  // Apply wireframe mode (uses cached meshes)
  useEffect(() => {
    if (!isLoaded) return;

    for (const child of meshesRef.current) {
      if (child.material instanceof MeshStandardMaterial) {
        child.material.wireframe = isWireframeMode;
      }
    }
  }, [isWireframeMode, isLoaded]);

  // Apply color mode toggle (part colors vs default gray)
  useEffect(() => {
    if (!isLoaded) return;

    const _gray = new Color(0xcccccc);
    for (const child of meshesRef.current) {
      if (child.material instanceof MeshStandardMaterial) {
        if (isColorMode && child.userData.partColor) {
          child.material.color.copy(child.userData.partColor);
        } else {
          child.material.color.copy(_gray);
        }
        child.material.needsUpdate = true;
      }
    }
  }, [isColorMode, isLoaded]);

  // Combined: camera fit (once) + selection highlight + explode animation
  useFrame((state) => {
    if (!groupRef.current || !isLoaded) return;

    // Auto-fit camera on first frame after model load
    if (needsCameraFitRef.current) {
      needsCameraFitRef.current = false;
      const { camera, controls } = state;

      const finalBox = new Box3().setFromObject(groupRef.current);
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
          modelCenter.x + distance * Math.cos(elevation) * Math.sin(azimuth),
          modelCenter.y + distance * Math.sin(elevation),
          modelCenter.z + distance * Math.cos(elevation) * Math.cos(azimuth)
        );
        camera.lookAt(modelCenter);
        camera.updateProjectionMatrix();

        if (controls) {
          const orbit = controls as unknown as OrbitControlsImpl;
          orbit.target.copy(modelCenter);
          orbit.update();
        }
      }
    }

    const modelCenter = modelCenterRef.current;

    // Iterate cached meshes instead of traversing scene graph at 60fps
    for (const child of meshesRef.current) {
      // --- Selection highlight (no allocations) ---
      if (child.material instanceof MeshStandardMaterial) {
        const isSelected = selectedObject === child.userData.name;
        if (isSelected) {
          child.material.emissive.copy(_highlightColor);
          child.material.emissiveIntensity = 0.5;
        } else {
          child.material.emissive.copy(
            child.userData.originalEmissive || _defaultEmissive
          );
          child.material.emissiveIntensity = 0;
        }
      }

      // --- Explode animation (reuse pre-allocated vectors) ---
      if (!child.userData.initialPosition) continue;
      const initial = child.userData.initialPosition as Vector3;

      if (explodeLevel === 0) {
        child.position.lerp(initial, 0.1);
        continue;
      }

      _tempDirection.subVectors(initial, modelCenter);
      const distance = _tempDirection.length();

      if (distance > 0.001) {
        _tempDirection.normalize();
      } else {
        const index = child.userData.meshIndex ?? 0;
        const angle = (index / 6) * Math.PI * 2;
        const elevation = ((index % 3) - 1) * 0.5;
        _tempDirection
          .set(Math.cos(angle), elevation, Math.sin(angle))
          .normalize();
      }

      const explodeDistance = explodeLevel * 2.0;
      _tempTarget
        .copy(initial)
        .addScaledVector(_tempDirection, explodeDistance);
      child.position.lerp(_tempTarget, 0.1);
    }
  });

  // Handle click on a part
  const handleClick = useCallback(
    (event: { stopPropagation: () => void; object: Mesh }) => {
      event.stopPropagation();
      const mesh = event.object as Mesh;

      if (mesh.userData.selectable) {
        const name = mesh.userData.name || mesh.name || mesh.uuid;
        setSelectedObject(name);
        // Auto-show PartInfoPanel only if no other panel is open
        const { activeSideTool } = useUIStore.getState();
        if (!activeSideTool) {
          useUIStore.setState({
            isPartInfoVisible: true,
            activeSideTool: "search",
          });
        }
      }
    },
    [setSelectedObject]
  );

  // Handle click on empty space (missed) to deselect
  const handlePointerMissed = useCallback(() => {
    setSelectedObject(null);
    // Only close Part Info panel, leave AI/Memo panels alone
    const { activeSideTool } = useUIStore.getState();
    if (activeSideTool === "search") {
      useUIStore.setState({ isPartInfoVisible: false, activeSideTool: null });
    } else {
      useUIStore.setState({ isPartInfoVisible: false });
    }
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
