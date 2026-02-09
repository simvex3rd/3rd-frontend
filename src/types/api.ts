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
 * Backend API Types (from Railway backend)
 */

/**
 * Model list item (GET /api/v1/models)
 */
export interface ModelListItem {
  id: string;
  name: string;
  thumbnail_url: string;
}

/**
 * Part geometry information
 */
export interface PartGeometry {
  initial_position: [number, number, number];
  initial_rotation: [number, number, number];
  initial_scale: [number, number, number];
  exploded_position: [number, number, number];
}

/**
 * Part detail (nested in ModelDetail)
 */
export interface Part {
  id: string;
  name: string;
  description: string;
  material: string;
  metadata?: Record<string, unknown>;
  geometry: PartGeometry;
}

/**
 * Model detail (GET /api/v1/models/:id)
 */
export interface ModelDetail {
  id: string;
  name: string;
  thumbnail_url: string;
  parts: Part[];
}

/**
 * Chat session (GET /api/v1/chat/sessions)
 */
export interface ChatSession {
  id: string;
  model_id: string;
  title?: string;
  created_at: string;
}

/**
 * Chat message (GET /api/v1/chat/sessions/:id/messages)
 */
export interface ChatMessage {
  id: string;
  session_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

/**
 * Study note (GET /api/v1/notes)
 */
export interface StudyNote {
  id: string;
  user_id: string;
  model_id: string;
  part_id?: string;
  content: string;
  updated_at: string;
}
