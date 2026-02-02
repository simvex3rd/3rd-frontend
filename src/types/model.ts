/**
 * 3D 모델 타입 정의 (백엔드 ERD 기반)
 */

export type Vector3 = { x: number; y: number; z: number };
export type Vector4 = { x: number; y: number; z: number; w: number };

/**
 * 모델 (최상위)
 */
export interface Model {
  id: number;
  name: string;
  description: string;
  thumbnailUrl: string;
  fileUrl: string;
  parts: Part[];
}

/**
 * 부품 (모델의 구성 요소)
 */
export interface Part {
  id: number;
  modelId: number;
  name: string;
  description: string;
  material: string;
  metadata: Record<string, unknown>; // 중량, 제조사, 규격 등
  geometries: PartGeometry[]; // 1:N
}

/**
 * 부품 형상 정보 (위치, 회전, 스케일)
 */
export interface PartGeometry {
  id: number;
  partId: number;
  initialPos: Vector3; // 초기 위치
  initialRot: Vector4; // 초기 회전 (Quaternion)
  initialScale: Vector3; // 초기 스케일
  explodedPos: Vector3; // 분해도 위치
}
