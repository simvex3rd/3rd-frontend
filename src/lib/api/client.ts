/**
 * SIMVEX API Client
 *
 * Centralized API client for backend communication.
 * Handles authentication, error handling, and request formatting.
 */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://3rd-backend-production.up.railway.app/api/v1";

/**
 * API client error class
 */
export class ApiClientError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

/**
 * Generic fetch wrapper with error handling
 */
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiClientError(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData.code
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }
    throw new ApiClientError(
      error instanceof Error ? error.message : "Network error occurred"
    );
  }
}

/**
 * Models API
 */
export const modelsApi = {
  /**
   * List all models
   */
  list: async () => {
    return apiFetch<
      {
        id: string;
        name: string;
        thumbnail_url: string;
      }[]
    >("/models");
  },

  /**
   * Get model detail with parts
   */
  getDetail: async (id: string) => {
    return apiFetch<{
      id: string;
      name: string;
      thumbnail_url: string;
      parts: Array<{
        id: string;
        name: string;
        description: string;
        material: string;
        metadata?: Record<string, unknown>;
        geometry: {
          initial_position: [number, number, number];
          initial_rotation: [number, number, number];
          initial_scale: [number, number, number];
          exploded_position: [number, number, number];
        };
      }>;
    }>(`/models/${id}`);
  },
};

/**
 * Chat API
 */
export const chatApi = {
  /**
   * Create new chat session
   */
  createSession: async (modelId: string, title?: string) => {
    return apiFetch<{
      id: string;
      model_id: string;
      title?: string;
      created_at: string;
    }>("/chat/sessions", {
      method: "POST",
      body: JSON.stringify({ model_id: modelId, title }),
    });
  },

  /**
   * Stream chat message (SSE)
   */
  streamMessage: async (sessionId: string, content: string) => {
    const url = `${API_URL}/chat/sessions/${sessionId}/messages/stream`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new ApiClientError(
        `Failed to stream message: ${response.statusText}`,
        response.status
      );
    }

    if (!response.body) {
      throw new ApiClientError("Response body is null");
    }

    return response.body.getReader();
  },

  /**
   * List chat sessions
   */
  listSessions: async (modelId?: string) => {
    const params = modelId ? `?model_id=${modelId}` : "";
    return apiFetch<
      Array<{
        id: string;
        model_id: string;
        title?: string;
        created_at: string;
      }>
    >(`/chat/sessions${params}`);
  },

  /**
   * Get messages for a session
   */
  getMessages: async (sessionId: string, limit = 50, skip = 0) => {
    return apiFetch<
      Array<{
        id: string;
        session_id: string;
        role: "user" | "assistant";
        content: string;
        created_at: string;
      }>
    >(`/chat/sessions/${sessionId}/messages?limit=${limit}&skip=${skip}`);
  },

  /**
   * Delete a chat session
   */
  deleteSession: async (sessionId: string) => {
    return apiFetch<{ message: string }>(`/chat/sessions/${sessionId}`, {
      method: "DELETE",
    });
  },
};

/**
 * Notes API
 */
export const notesApi = {
  /**
   * Get note for model or part
   */
  get: async (modelId: string, partId?: string) => {
    const params = new URLSearchParams({ model_id: modelId });
    if (partId) params.append("part_id", partId);

    return apiFetch<{
      id: string;
      user_id: string;
      model_id: string;
      part_id?: string;
      content: string;
      updated_at: string;
    }>(`/notes?${params}`);
  },

  /**
   * Save note (create or update)
   */
  save: async (modelId: string, content: string, partId?: string) => {
    return apiFetch<{
      id: string;
      user_id: string;
      model_id: string;
      part_id?: string;
      content: string;
      updated_at: string;
    }>("/notes", {
      method: "PUT",
      body: JSON.stringify({ model_id: modelId, part_id: partId, content }),
    });
  },

  /**
   * Delete a note
   */
  delete: async (modelId: string, partId?: string) => {
    const params = new URLSearchParams({ model_id: modelId });
    if (partId) params.append("part_id", partId);

    return apiFetch<{ message: string }>(`/notes?${params}`, {
      method: "DELETE",
    });
  },
};

/**
 * Unified API client
 */
export const api = {
  models: modelsApi,
  chat: chatApi,
  notes: notesApi,
};
