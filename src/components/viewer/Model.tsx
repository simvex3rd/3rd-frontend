"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { Mesh, MeshStandardMaterial, Color, Box3, Vector3 } from "three";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useSceneStore } from "@/stores/scene-store";
import { api } from "@/lib/api";
import {
  normalizeGeometry,
  type NormalizedGeometry,
} from "@/lib/api/normalize";

interface ModelProps {
  url: string;
}

// DRACOLoader가 로컬 디코더 파일을 사용하도록 설정
// Draco 압축된 GLTF 모델 로딩을 활성화
// 디코더 파일은 public/draco/에 위치
useGLTF.setDecoderPath("/draco/");

export function Model({ url }: ModelProps) {
  // Draco 압축 지원 활성화 (두 번째 파라미터)
  const { scene } = useGLTF(url, true);
  const setSelectedObject = useSceneStore((state) => state.setSelectedObject);
  const selectedObject = useSceneStore((state) => state.selectedObject);
  const explodeLevel = useSceneStore((state) => state.explodeLevel);
  const modelId = useSceneStore((state) => state.modelId);

  // 메시에 userData 초기화 + API 데이터 로드
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        // 원본 이름 저장 또는 생성
        if (!child.userData.name) {
          child.userData.name = child.name || child.uuid;
        }

        // 원본 emissive 색상 저장
        if (
          child.material instanceof MeshStandardMaterial &&
          !child.userData.originalEmissive
        ) {
          child.userData.originalEmissive = child.material.emissive.clone();
        }

        // 이 메시에 raycast 활성화
        child.userData.selectable = true;

        // 초기 위치 저장 (explode 애니메이션용)
        if (!child.userData.initialPosition) {
          child.userData.initialPosition = child.position.clone();
        }
      }
    });

    // API에서 부품 geometry 데이터 가져오기
    const loadPartGeometry = async () => {
      try {
        const effectiveModelId = modelId || "1";
        const modelData = await api.models.getDetail(effectiveModelId);

        scene.traverse((child) => {
          if (child instanceof Mesh) {
            const partName = child.userData.name || child.name;
            const partData = modelData.parts.find(
              (p) => p.name === partName || p.id === partName
            );

            if (partData?.geometry) {
              child.userData.partGeometry = normalizeGeometry(
                partData.geometry as unknown as Record<string, unknown>
              );
            }
          }
        });
      } catch (error) {
        console.error("Failed to load part geometry data:", error);
      }
    };

    loadPartGeometry();
  }, [scene, modelId]);

  // 선택된 부품에 하이라이트 효과 적용
  useEffect(() => {
    scene.traverse((child) => {
      if (
        child instanceof Mesh &&
        child.material instanceof MeshStandardMaterial
      ) {
        const partName = child.userData.name || child.name || child.uuid;
        const isSelected = selectedObject === partName;

        if (isSelected) {
          // 선택된 부품을 emissive 색상으로 하이라이트
          child.material.emissive = new Color(0x4444ff);
          child.material.emissiveIntensity = 0.5;
        } else {
          // 원본 emissive 복원
          child.material.emissive =
            child.userData.originalEmissive || new Color(0x000000);
          child.material.emissiveIntensity = 1;
        }
      }
    });
  }, [scene, selectedObject]);

  // Animate parts based on explode level
  useFrame(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh && child.userData.partGeometry) {
        const geo = child.userData.partGeometry as NormalizedGeometry;
        const initialPos = child.userData.initialPosition;

        if (geo.initial_pos && geo.exploded_pos && initialPos) {
          // Lerp between initial and exploded positions
          const targetX =
            initialPos.x +
            (geo.exploded_pos.x - geo.initial_pos.x) * explodeLevel;
          const targetY =
            initialPos.y +
            (geo.exploded_pos.y - geo.initial_pos.y) * explodeLevel;
          const targetZ =
            initialPos.z +
            (geo.exploded_pos.z - geo.initial_pos.z) * explodeLevel;

          // Smooth transition with lerp
          child.position.lerp(new Vector3(targetX, targetY, targetZ), 0.1);
        }
      }
    });
  });

  // Auto-scale model to fit viewport
  useEffect(() => {
    const box = new Box3().setFromObject(scene);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());

    // Calculate scale to fit TARGET_SIZE
    const maxDim = Math.max(size.x, size.y, size.z);
    const TARGET_SIZE = 5; // Desired size in world units
    const scale = TARGET_SIZE / maxDim;

    // Apply scale and center
    scene.scale.setScalar(scale);
    scene.position.copy(center).multiplyScalar(-scale);

    console.log(
      `Model scaled: ${scale.toFixed(3)}x, centered at (${center.x.toFixed(2)}, ${center.y.toFixed(2)}, ${center.z.toFixed(2)})`
    );
  }, [scene]);

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

          // Clear userData to prevent memory leaks
          if (child.userData.originalEmissive) {
            delete child.userData.originalEmissive;
          }
          if (child.userData.name) {
            delete child.userData.name;
          }
          if (child.userData.selectable !== undefined) {
            delete child.userData.selectable;
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
