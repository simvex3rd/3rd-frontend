/**
 * ERD study_notes 테이블 기반 학습 노트 타입 정의
 *
 * ERD 매핑:
 * - DB: study_notes (snake_case)
 * - TS: StudyNote (camelCase)
 *
 * @see docs/TYPE_MAPPING.md 전체 ERD 매핑 참조
 */

/**
 * 학습 노트 엔티티
 * 3D 모델 또는 특정 부품에 대한 사용자 노트
 */
export interface StudyNote {
  /**
   * 노트 ID (자동 증가)
   */
  id: number;

  /**
   * 사용자 ID (FK: users.id)
   * Clerk 사용자 ID 형식: "user_2N..."
   */
  userId: string;

  /**
   * 모델 ID (FK: models.id)
   * 필수: 노트는 반드시 모델과 연결되어야 함
   */
  modelId: number;

  /**
   * 부품 ID (FK: parts.id, nullable)
   * 선택: 노트는 전체 모델 또는 특정 부품에 대한 것일 수 있음
   */
  partId: number | null;

  /**
   * 노트 내용 (마크다운 지원, DB에서 nullable)
   * 플레이스홀더 노트인 경우 null 가능
   */
  content: string | null;

  /**
   * 마지막 업데이트 시각 (DB에서 nullable)
   */
  updatedAt: Date | null;
}

/**
 * 노트 생성 페이로드 (POST /api/notes)
 */
export interface CreateNotePayload {
  modelId: number;
  partId?: number | null;
  content: string;
}

/**
 * 노트 업데이트 페이로드 (PATCH /api/notes/[id])
 */
export interface UpdateNotePayload {
  content?: string;
  partId?: number | null;
}

/**
 * 노트 필터 옵션 (GET /api/notes)
 */
export interface NoteFilterOptions {
  modelId?: number;
  partId?: number;
  limit?: number;
  offset?: number;
}
