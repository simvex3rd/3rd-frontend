/**
 * API Client exports
 *
 * Centralized exports for API client and utilities.
 * Switches between real and mock API based on NEXT_PUBLIC_USE_MOCK_API.
 */

import { api as realApi } from "./client";
import { mockApi } from "./mock";

/**
 * Environment-based API switching
 * Set NEXT_PUBLIC_USE_MOCK_API=true to use mock data
 */
const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

/**
 * Export the appropriate API based on environment
 */
export const api = USE_MOCK_API ? mockApi : realApi;

/**
 * Export individual API modules for convenience
 */
export const modelsApi = api.models;
export const chatApi = api.chat;
export const notesApi = api.notes;

/**
 * Re-export error utilities and ApiClientError
 */
export { ApiClientError } from "./client";
export {
  sanitizeError,
  createErrorResponse,
  createValidationError,
  createUnauthorizedError,
  createForbiddenError,
  createNotFoundError,
} from "./error-handler";
