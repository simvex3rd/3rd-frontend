import { Part } from "@/types/model";

/**
 * 개발용 Mock Part 데이터
 *
 * TODO: 백엔드 준비되면 실제 API 호출로 교체
 * - API 서비스 생성: src/lib/api/parts.ts
 * - 구현: async function fetchPartByMeshName(meshName: string): Promise<Part | undefined>
 * - API 엔드포인트: GET /api/parts?meshName={meshName} 또는 GET /api/models/{modelId}/parts/{partName}
 * - getPartByMeshName()을 mockParts 대신 API 호출하도록 업데이트
 */
export const mockParts: Record<string, Part> = {
  Crankshaft: {
    id: 1,
    modelId: 1,
    name: "크랭크샤프트",
    description: "왕복 운동을 회전 운동으로 변환하는 주요 회전 부품",
    material: "단조 강철 합금",
    metadata: {
      weight: "12.5kg",
      manufacturer: "SIMVEX Corp",
      partNumber: "CS-V4-001",
      tolerance: "±0.01mm",
    },
    geometries: [
      {
        id: 1,
        partId: 1,
        initialPos: { x: 0, y: 0, z: 0 },
        initialRot: { x: 0, y: 0, z: 0, w: 1 },
        initialScale: { x: 1, y: 1, z: 1 },
        explodedPos: { x: 0, y: 0, z: 0 },
      },
    ],
  },
  Piston: {
    id: 2,
    modelId: 1,
    name: "피스톤",
    description: "크랭크샤프트로 힘을 전달하는 왕복 운동 부품",
    material: "알루미늄 합금",
    metadata: {
      weight: "0.8kg",
      manufacturer: "SIMVEX Corp",
      partNumber: "PS-V4-001",
      tolerance: "±0.02mm",
    },
    geometries: [
      {
        id: 2,
        partId: 2,
        initialPos: { x: 0, y: 10, z: 0 },
        initialRot: { x: 0, y: 0, z: 0, w: 1 },
        initialScale: { x: 1, y: 1, z: 1 },
        explodedPos: { x: 0, y: 20, z: 0 },
      },
    ],
  },
  ConnectingRod: {
    id: 3,
    modelId: 1,
    name: "커넥팅 로드",
    description: "피스톤과 크랭크샤프트를 연결",
    material: "티타늄 합금",
    metadata: {
      weight: "1.2kg",
      manufacturer: "SIMVEX Corp",
      partNumber: "CR-V4-001",
      tolerance: "±0.015mm",
    },
    geometries: [
      {
        id: 3,
        partId: 3,
        initialPos: { x: 0, y: 5, z: 0 },
        initialRot: { x: 0, y: 0, z: 0, w: 1 },
        initialScale: { x: 1, y: 1, z: 1 },
        explodedPos: { x: 0, y: 15, z: 0 },
      },
    ],
  },
};

/**
 * 메시 이름으로 Part 정보 가져오기
 *
 * TODO: 백엔드 준비되면 API 호출로 교체
 * 예제 구현:
 * ```
 * export async function getPartByMeshName(meshName: string): Promise<Part | undefined> {
 *   try {
 *     const response = await fetch(`/api/parts?meshName=${encodeURIComponent(meshName)}`);
 *     if (!response.ok) return undefined;
 *     return await response.json();
 *   } catch (error) {
 *     console.error('Failed to fetch part:', error);
 *     return undefined;
 *   }
 * }
 * ```
 *
 * @param meshName - Three.js 메시 이름
 * @returns Part 데이터 또는 undefined
 */
export function getPartByMeshName(meshName: string): Part | undefined {
  // TODO: API 호출로 교체
  // return await fetchPartByMeshName(meshName);

  // 먼저 정확히 일치하는 것 찾기
  if (mockParts[meshName]) {
    return mockParts[meshName];
  }

  // 대소문자 구분 없이 검색
  const normalizedName = meshName.toLowerCase();
  const matchingKey = Object.keys(mockParts).find(
    (key) => key.toLowerCase() === normalizedName
  );

  return matchingKey ? mockParts[matchingKey] : undefined;
}
