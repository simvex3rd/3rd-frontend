/**
 * API error handling utilities
 *
 * Sanitizes errors to prevent information disclosure in production.
 */

import { ApiError, ApiErrorCode } from "@/types/api";

/**
 * Sanitize error for API response
 *
 * In production, hides sensitive error details (stack traces, internal messages).
 * In development, shows full error details for debugging.
 *
 * @param error - The error to sanitize
 * @returns Sanitized ApiError object safe for client
 */
export function sanitizeError(error: unknown): ApiError {
  const isDevelopment = process.env.NODE_ENV !== "production";

  // Default safe error for production
  const safeError: ApiError = {
    code: ApiErrorCode.INTERNAL_ERROR,
    message: "An unexpected error occurred. Please try again later.",
  };

  // In development, show detailed errors
  if (isDevelopment) {
    if (error instanceof Error) {
      return {
        code: ApiErrorCode.INTERNAL_ERROR,
        message: error.message,
        details: {
          stack: error.stack,
          name: error.name,
        },
      };
    }

    return {
      code: ApiErrorCode.INTERNAL_ERROR,
      message: String(error),
      details: error,
    };
  }

  // In production, return safe generic error
  return safeError;
}

/**
 * Create API error response
 *
 * @param error - The error to convert to API response
 * @param status - HTTP status code (default: 500)
 * @returns Response object with sanitized error
 */
export function createErrorResponse(
  error: unknown,
  status: number = 500
): Response {
  const apiError = sanitizeError(error);

  return Response.json(
    {
      success: false,
      error: apiError,
    },
    { status }
  );
}

/**
 * Create validation error response
 *
 * Used for input validation failures (400 Bad Request).
 *
 * @param message - Error message
 * @param details - Optional validation details
 * @returns Response object
 */
export function createValidationError(
  message: string,
  details?: unknown
): Response {
  return Response.json(
    {
      success: false,
      error: {
        code: ApiErrorCode.BAD_REQUEST,
        message,
        details: process.env.NODE_ENV === "development" ? details : undefined,
      },
    },
    { status: 400 }
  );
}

/**
 * Create unauthorized error response
 *
 * Used when authentication is required but missing.
 *
 * @param message - Error message (default: "Unauthorized")
 * @returns Response object
 */
export function createUnauthorizedError(
  message: string = "Unauthorized"
): Response {
  return Response.json(
    {
      success: false,
      error: {
        code: ApiErrorCode.UNAUTHORIZED,
        message,
      },
    },
    { status: 401 }
  );
}

/**
 * Create forbidden error response
 *
 * Used when user is authenticated but lacks permissions.
 *
 * @param message - Error message (default: "Forbidden")
 * @returns Response object
 */
export function createForbiddenError(message: string = "Forbidden"): Response {
  return Response.json(
    {
      success: false,
      error: {
        code: ApiErrorCode.FORBIDDEN,
        message,
      },
    },
    { status: 403 }
  );
}

/**
 * Create not found error response
 *
 * @param resource - Resource name (e.g., "User", "Model")
 * @returns Response object
 */
export function createNotFoundError(resource: string): Response {
  return Response.json(
    {
      success: false,
      error: {
        code: ApiErrorCode.NOT_FOUND,
        message: `${resource} not found`,
      },
    },
    { status: 404 }
  );
}
