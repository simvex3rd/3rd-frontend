/**
 * ERD users 테이블 기반 사용자 타입 정의
 *
 * ERD 매핑:
 * - DB: users (snake_case)
 * - TS: User (camelCase)
 *
 * @see docs/TYPE_MAPPING.md 전체 ERD 매핑 참조
 */

/**
 * 데이터베이스 사용자 엔티티
 * Clerk 인증 시스템과 동기화됨
 */
export interface User {
  /**
   * Clerk 사용자 ID (varchar)
   * 형식: "user_2N..."
   */
  id: string;

  /**
   * 사용자 이메일 주소 (DB에서 nullable)
   * OAuth 제공자에 따라 null일 수 있음
   */
  email: string | null;

  /**
   * 사용자명
   * DB에서 필수 필드
   */
  username: string;

  /**
   * 계정 생성 시각
   */
  createdAt: Date;

  /**
   * 마지막 로그인 시각
   */
  lastLogin: Date;
}

/**
 * 사용자 생성 페이로드 (API 요청용)
 */
export interface CreateUserPayload {
  id: string;
  email: string | null;
  username: string;
}

/**
 * 사용자 업데이트 페이로드 (PATCH /api/users/me)
 */
export interface UpdateUserPayload {
  username?: string;
}
