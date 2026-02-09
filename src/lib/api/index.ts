/**
 * API Client exports
 *
 * Centralized exports for API client and utilities.
 * Switches between real and mock API based on NEXT_PUBLIC_USE_MOCK_API.
 */

import type {
  ModelListItem,
  ModelDetail,
  ChatSessionResponse,
  ChatMessageResponse,
  StudyNoteResponse,
  HealthCheck,
  UserResponse,
  ClerkLoginRequest,
} from "@/types/api";
import { api as realApi } from "./client";
import { mockApi } from "./mock";

/**
 * Shared API interface that both real and mock clients conform to.
 */
export interface SimvexApi {
  health: {
    check: () => Promise<HealthCheck>;
  };
  auth: {
    login: (data: ClerkLoginRequest) => Promise<UserResponse>;
    me: () => Promise<UserResponse>;
  };
  models: {
    list: () => Promise<ModelListItem[]>;
    getDetail: (id: number | string) => Promise<ModelDetail>;
  };
  chat: {
    createSession: (
      modelId: number | string,
      title?: string
    ) => Promise<ChatSessionResponse>;
    streamMessage: (
      sessionId: number | string,
      content: string,
      options?: { n?: number; signal?: AbortSignal }
    ) => Promise<ReadableStreamDefaultReader<Uint8Array>>;
    listSessions: (modelId?: number | string) => Promise<ChatSessionResponse[]>;
    getMessages: (
      sessionId: number | string,
      limit?: number,
      skip?: number
    ) => Promise<ChatMessageResponse[]>;
    deleteSession: (sessionId: number | string) => Promise<void>;
  };
  notes: {
    get: (
      modelId: number | string,
      partId?: number | string
    ) => Promise<StudyNoteResponse | null>;
    save: (
      modelId: number | string,
      content: string,
      partId?: number | string
    ) => Promise<StudyNoteResponse>;
  };
}

/**
 * Environment-based API switching
 * Set NEXT_PUBLIC_USE_MOCK_API=true to use mock data
 */
const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

/**
 * Export the appropriate API based on environment.
 * Models always use mock data (loaded from public/models/).
 */
export const api: SimvexApi = USE_MOCK_API
  ? mockApi
  : { ...realApi, models: mockApi.models };

/**
 * Export individual API modules for convenience
 */
export const healthApi = api.health;
export const authApi = api.auth;
export const modelsApi = api.models;
export const chatApi = api.chat;
export const notesApi = api.notes;

/**
 * Re-export error utilities and ApiClientError
 */
export { ApiClientError, configureAuth } from "./client";
export {
  sanitizeError,
  createErrorResponse,
  createValidationError,
  createUnauthorizedError,
  createForbiddenError,
  createNotFoundError,
} from "./error-handler";
