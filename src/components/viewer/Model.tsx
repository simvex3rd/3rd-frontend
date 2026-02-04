"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { Mesh, MeshStandardMaterial, Color } from "three";
import { ThreeEvent } from "@react-three/fiber";
import { useSceneStore } from "@/stores/scene-store";

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

  // 메시에 userData 초기화
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
      }
    });
  }, [scene]);

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
