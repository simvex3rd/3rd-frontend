/**
 * ERD chat_sessions, chat_messages 테이블 기반 채팅 타입 정의
 *
 * ERD 매핑:
 * - DB: chat_sessions, chat_messages (snake_case)
 * - TS: ChatSession, ChatMessage (camelCase)
 *
 * @see docs/TYPE_MAPPING.md 전체 ERD 매핑 참조
 */

/**
 * 채팅 세션 엔티티
 * AI와의 대화 스레드를 나타냄
 */
export interface ChatSession {
  /**
   * 세션 ID (자동 증가)
   */
  id: number;

  /**
   * 사용자 ID (FK: users.id)
   * Clerk 사용자 ID 형식: "user_2N..."
   */
  userId: string;

  /**
   * 모델 ID (FK: models.id)
   * 이 세션에서 논의 중인 3D 모델
   */
  modelId: number;

  /**
   * 세션 제목 (DB에서 nullable)
   * 첫 메시지에서 생성되거나 사용자가 직접 지정
   * 아직 설정되지 않은 경우 null 가능
   */
  title: string | null;

  /**
   * 마지막 AI 응답 ID (nullable)
   * 대화 이어가기에 사용
   */
  lastResponseId: string | null;

  /**
   * 세션 생성 시각
   */
  createdAt: Date;
}

/**
 * 채팅 메시지 엔티티
 * 세션 내 개별 메시지
 */
export interface ChatMessage {
  /**
   * 메시지 ID (자동 증가)
   */
  id: number;

  /**
   * 세션 ID (FK: chat_sessions.id)
   */
  sessionId: number;

  /**
   * 메시지 역할
   * - user: 사용자 메시지
   * - assistant: AI 응답
   * - system: 시스템 메시지 (예: "세션 시작됨")
   */
  role: "user" | "assistant" | "system";

  /**
   * 메시지 내용 (텍스트)
   */
  content: string;

  /**
   * 메시지 생성 시각
   */
  createdAt: Date;
}

/**
 * UI Message type (used in chat components and hooks)
 * Lightweight version of ChatMessage for client-side rendering
 */
export interface Message {
  /**
   * Message ID (string for client-generated IDs)
   */
  id: string;

  /**
   * Message role
   */
  role: "user" | "assistant" | "system";

  /**
   * Message content
   */
  content: string;

  /**
   * Message timestamp
   */
  timestamp: Date;
}

/**
 * 세션 생성 페이로드 (POST /api/chat/sessions)
 */
export interface CreateSessionPayload {
  modelId: number;
  title?: string;
}

/**
 * 메시지 전송 페이로드 (POST /api/chat/sessions/[id]/messages)
 */
export interface SendMessagePayload {
  content: string;
}

/**
 * 메시지 포함 채팅 세션 (GET /api/chat/sessions/[id])
 */
export interface ChatSessionWithMessages extends ChatSession {
  messages: ChatMessage[];
}
