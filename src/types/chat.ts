/**
 * Chat types definition based on ERD chat_sessions and chat_messages tables
 *
 * ERD Mapping:
 * - DB: chat_sessions, chat_messages (snake_case)
 * - TS: ChatSession, ChatMessage (camelCase)
 *
 * @see docs/TYPE_MAPPING.md for full ERD mapping
 */

/**
 * Chat session entity
 * Represents a conversation thread with AI
 */
export interface ChatSession {
  /**
   * Session ID (auto-increment)
   */
  id: number;

  /**
   * User ID (FK: users.id)
   * Clerk user ID format: "user_2N..."
   */
  userId: string;

  /**
   * Model ID (FK: models.id)
   * 3D model being discussed in this session
   */
  modelId: number;

  /**
   * Session title
   * Generated from first message or user-defined
   */
  title: string;

  /**
   * Last AI response ID (nullable)
   * Used for conversation continuation
   */
  lastResponseId: string | null;

  /**
   * Session creation timestamp
   */
  createdAt: Date;
}

/**
 * Chat message entity
 * Individual message in a session
 */
export interface ChatMessage {
  /**
   * Message ID (auto-increment)
   */
  id: number;

  /**
   * Session ID (FK: chat_sessions.id)
   */
  sessionId: number;

  /**
   * Message role
   * - user: User's message
   * - assistant: AI's response
   * - system: System message (e.g., "Session started")
   */
  role: "user" | "assistant" | "system";

  /**
   * Message content (text)
   */
  content: string;

  /**
   * Message creation timestamp
   */
  createdAt: Date;
}

/**
 * Create session payload (for POST /api/chat/sessions)
 */
export interface CreateSessionPayload {
  modelId: number;
  title?: string;
}

/**
 * Send message payload (for POST /api/chat/sessions/[id]/messages)
 */
export interface SendMessagePayload {
  content: string;
}

/**
 * Chat session with messages (for GET /api/chat/sessions/[id])
 */
export interface ChatSessionWithMessages extends ChatSession {
  messages: ChatMessage[];
}
