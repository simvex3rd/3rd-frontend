/**
 * Standard API response types
 *
 * Usage:
 * ```typescript
 * const response: ApiResponse<Model> = await fetch('/api/models/1').then(r => r.json());
 * if (response.success) {
 *   console.log(response.data); // Model object
 * } else {
 *   console.error(response.error); // { code, message }
 * }
 * ```
 */

/**
 * Standard API response wrapper
 * All API endpoints should return this format
 */
export interface ApiResponse<T> {
  /**
   * Whether the request was successful
   */
  success: boolean;

  /**
   * Response data (present if success: true)
   */
  data?: T;

  /**
   * Error details (present if success: false)
   */
  error?: ApiError;
}

/**
 * API error details
 */
export interface ApiError {
  /**
   * Error code (e.g., "NOT_FOUND", "UNAUTHORIZED")
   */
  code: string;

  /**
   * Human-readable error message
   */
  message: string;

  /**
   * Additional error details (optional)
   */
  details?: unknown;
}

/**
 * Paginated API response
 * For endpoints returning lists (e.g., /api/notes)
 */
export interface PaginatedResponse<T> {
  /**
   * Whether the request was successful
   */
  success: boolean;

  /**
   * Array of data items (present if success: true)
   */
  data?: T[];

  /**
   * Pagination metadata (present if success: true)
   */
  pagination?: PaginationMeta;

  /**
   * Error details (present if success: false)
   */
  error?: ApiError;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  /**
   * Current page number (1-indexed)
   */
  page: number;

  /**
   * Number of items per page
   */
  pageSize: number;

  /**
   * Total number of items across all pages
   */
  total: number;

  /**
   * Total number of pages
   */
  totalPages: number;

  /**
   * Whether there is a next page
   */
  hasNext: boolean;

  /**
   * Whether there is a previous page
   */
  hasPrev: boolean;
}

/**
 * Common API error codes
 */
export enum ApiErrorCode {
  // Client errors (4xx)
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  CONFLICT = "CONFLICT",
  VALIDATION_ERROR = "VALIDATION_ERROR",

  // Server errors (5xx)
  INTERNAL_ERROR = "INTERNAL_ERROR",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",

  // Custom errors
  DATABASE_ERROR = "DATABASE_ERROR",
  EXTERNAL_API_ERROR = "EXTERNAL_API_ERROR",
}

/**
 * API request options
 */
export interface ApiRequestOptions {
  /**
   * Request method
   */
  method?: "GET" | "POST" | "PATCH" | "DELETE";

  /**
   * Request body (auto-serialized to JSON)
   */
  body?: unknown;

  /**
   * Additional headers
   */
  headers?: Record<string, string>;

  /**
   * Request timeout in milliseconds
   */
  timeout?: number;
}

/**
 * Backend API Types - Auto-generated from OpenAPI spec
 * Source: https://3rd-backend-production.up.railway.app/api/openapi.json
 * Generated: 2026-02-09
 */

// ============================================================================
// Health API
// ============================================================================

/**
 * Health check response (GET /api/v1/health)
 */
export interface HealthCheck {
  /** Service status */
  status: string;
}

// ============================================================================
// Auth API
// ============================================================================

/**
 * Clerk login request payload (POST /api/v1/auth/clerk/login)
 */
export interface ClerkLoginRequest {
  /** User email */
  email?: string | null;
  /** User display name */
  username: string;
}

/**
 * User response (GET /api/v1/auth/me)
 */
export interface UserResponse {
  /** Clerk user ID */
  id: string;
  /** User email */
  email?: string | null;
  /** User display name */
  username: string;
}

// ============================================================================
// Models API
// ============================================================================

/**
 * Model list item (GET /api/v1/models)
 */
export interface ModelListItem {
  /** Model ID */
  id: number;
  /** Model name */
  name?: string | null;
  /** Thumbnail image URL */
  thumbnail_url?: string | null;
}

/**
 * Part geometry (3D transform data)
 */
export interface PartGeometryResponse {
  /** Geometry ID */
  id: number;
  /** Part ID */
  part_id: number;
  /** Initial position {x, y, z} */
  initial_pos?: Record<string, unknown> | null;
  /** Initial rotation {x, y, z} */
  initial_rot?: Record<string, unknown> | null;
  /** Initial scale {x, y, z} */
  initial_scale?: Record<string, unknown> | null;
  /** Exploded view position {x, y, z} */
  exploded_pos?: Record<string, unknown> | null;
}

/**
 * Part with geometry information (nested in ModelDetail)
 */
export interface PartWithGeometry {
  /** Part ID */
  id: number;
  /** Model ID */
  model_id: number;
  /** Part name */
  name?: string | null;
  /** Part description */
  description?: string | null;
  /** Part material */
  material?: string | null;
  /** Part metadata (JSON) */
  metadata?: Record<string, unknown> | null;
  /** OBJ mesh group names that belong to this part */
  mesh_names?: string[] | null;
  /** 3D geometry information */
  geometry?: PartGeometryResponse | null;
}

/**
 * Model detail (GET /api/v1/models/:id)
 */
export interface ModelDetail {
  /** Model ID */
  id: number;
  /** Model name */
  name?: string | null;
  /** Model description */
  description?: string | null;
  /** Thumbnail image URL */
  thumbnail_url?: string | null;
  /** Model file URL (GLB/GLTF) */
  file_url?: string | null;
  /** Parts list with geometry */
  parts: PartWithGeometry[];
}

// ============================================================================
// Notes API
// ============================================================================

/**
 * Study note upsert payload (PUT /api/v1/notes)
 */
export interface StudyNoteUpsert {
  /** Model ID */
  model_id: number;
  /** Part ID (optional - if null, note is for the entire model) */
  part_id?: number | null;
  /** Note content */
  content?: string | null;
}

/**
 * Study note response (GET /api/v1/notes)
 */
export interface StudyNoteResponse {
  /** Note ID */
  id: number;
  /** User ID */
  user_id: string;
  /** Model ID */
  model_id: number;
  /** Part ID (optional) */
  part_id?: number | null;
  /** Note content */
  content?: string | null;
  /** Last updated timestamp */
  updated_at?: string | null;
}

// ============================================================================
// Chat API
// ============================================================================

/**
 * Chat session creation payload (POST /api/v1/chat/sessions)
 */
export interface ChatSessionCreate {
  /** Model ID for context */
  model_id: number;
  /** Session title */
  title?: string | null;
}

/**
 * Chat session response (GET /api/v1/chat/sessions)
 */
export interface ChatSessionResponse {
  /** Session ID */
  id: number;
  /** User ID */
  user_id: string;
  /** Model ID */
  model_id: number;
  /** Session title */
  title?: string | null;
  /** Last response ID */
  last_response_id?: string | null;
  /** Creation timestamp */
  created_at: string;
}

/**
 * Chat message creation payload (POST /api/v1/chat/sessions/:id/messages/stream)
 */
export interface ChatMessageCreate {
  /** Message content */
  content: string;
}

/**
 * Chat message response (GET /api/v1/chat/sessions/:id/messages)
 */
export interface ChatMessageResponse {
  /** Message ID */
  id: number;
  /** Session ID */
  session_id: number;
  /** Role (user or assistant) */
  role: string;
  /** Message content */
  content: string;
  /** Creation timestamp */
  created_at: string;
}

// ============================================================================
// Quiz API
// ============================================================================

/**
 * Quiz generation request (POST /api/v1/quiz/generate)
 */
export interface QuizGenerateRequest {
  /** Model ID */
  model_id: number;
  /** Part ID (optional - quiz for specific part) */
  part_id?: number | null;
  /** Number of questions (default: 5) */
  count?: number;
  /** Quiz type (default: "multiple_choice") */
  type?: string;
}

/**
 * Quiz generation response
 */
export interface QuizGenerateResponse {
  /** Generated quiz ID */
  quiz_id: number;
  /** Questions list */
  questions: QuizQuestionResponse[];
}

/**
 * Single quiz question
 */
export interface QuizQuestionResponse {
  /** Question ID */
  id: number;
  /** Question text */
  question: string;
  /** Question type */
  type: string;
  /** Answer options */
  options: string[];
}

/**
 * Quiz submit request (POST /api/v1/quiz/{quiz_id}/submit)
 */
export interface QuizSubmitRequest {
  /** User answers */
  answers: QuizAnswer[];
}

/**
 * Single quiz answer
 */
export interface QuizAnswer {
  /** Question ID */
  question_id: number;
  /** Selected answer */
  answer: string;
}

/**
 * Quiz submit response
 */
export interface QuizSubmitResponse {
  /** Number of correct answers */
  score: number;
  /** Total questions */
  total: number;
  /** Per-question results */
  results: QuizResultDetail[];
}

/**
 * Per-question result detail
 */
export interface QuizResultDetail {
  /** Question ID */
  question_id: number;
  /** Whether answer was correct */
  correct: boolean;
  /** Correct answer (shown on wrong answers) */
  correct_answer?: string | null;
}

// ============================================================================
// Error Handling
// ============================================================================

/**
 * Validation error item
 */
export interface ValidationError {
  /** Error location (path) */
  loc: (string | number)[];
  /** Error message */
  msg: string;
  /** Error type */
  type: string;
}

/**
 * HTTP validation error response (422)
 */
export interface HTTPValidationError {
  /** List of validation errors */
  detail?: ValidationError[];
}

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Check if response is a validation error
 */
export function isValidationError(
  error: unknown
): error is HTTPValidationError {
  return (
    typeof error === "object" &&
    error !== null &&
    "detail" in error &&
    Array.isArray((error as HTTPValidationError).detail)
  );
}

/**
 * Check if geometry has exploded position
 */
export function hasExplodedPosition(
  geometry: PartGeometryResponse | null | undefined
): geometry is PartGeometryResponse & {
  exploded_pos: Record<string, unknown>;
} {
  return geometry?.exploded_pos != null;
}

// ============================================================================
// Legacy Type Aliases (for backward compatibility)
// ============================================================================

/**
 * @deprecated Use PartWithGeometry instead
 */
export type Part = PartWithGeometry;

/**
 * @deprecated Use PartGeometryResponse instead
 */
export type PartGeometry = PartGeometryResponse;

/**
 * @deprecated Use ChatSessionResponse instead
 */
export type ChatSession = ChatSessionResponse;

/**
 * @deprecated Use ChatMessageResponse instead
 */
export type ChatMessage = ChatMessageResponse;

/**
 * @deprecated Use StudyNoteResponse instead
 */
export type StudyNote = StudyNoteResponse;
