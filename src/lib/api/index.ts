/**
 * API Client exports
 *
 * Centralized exports for API client and utilities.
 */

export { api, modelsApi, chatApi, notesApi, ApiClientError } from "./client";
export {
  sanitizeError,
  createErrorResponse,
  createValidationError,
  createUnauthorizedError,
  createForbiddenError,
  createNotFoundError,
} from "./error-handler";
