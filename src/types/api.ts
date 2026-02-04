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
