/**
 * SIMVEX API Client
 *
 * Centralized API client for backend communication.
 * Aligned with OpenAPI spec: https://3rd-backend-production.up.railway.app/api/openapi.json
 */

import type {
  ModelListItem,
  ModelDetail,
  ChatSessionResponse,
  ChatMessageCreate,
  ChatMessageResponse,
  StudyNoteUpsert,
  StudyNoteResponse,
  HealthCheck,
  ClerkLoginRequest,
  UserResponse,
} from "@/types/api";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://3rd-backend-production.up.railway.app/api/v1";

// ---------------------------------------------------------------------------
// Auth token management
// ---------------------------------------------------------------------------

let _getToken: (() => Promise<string | null>) | null = null;

/**
 * Configure the auth token getter (call once from a Clerk-aware component).
 *
 * @example
 * ```tsx
 * const { getToken } = useAuth();
 * useEffect(() => { configureAuth(getToken); }, [getToken]);
 * ```
 */
export function configureAuth(getToken: () => Promise<string | null>) {
  _getToken = getToken;
}

async function getAuthHeaders(): Promise<Record<string, string>> {
  if (!_getToken) return {};
  try {
    const token = await _getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

// ---------------------------------------------------------------------------
// Fetch wrapper
// ---------------------------------------------------------------------------

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

async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit & { auth?: boolean }
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const needsAuth = options?.auth !== false;

  const authHeaders = needsAuth ? await getAuthHeaders() : {};

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiClientError(
        errorData.detail?.[0]?.msg ||
          errorData.message ||
          `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData.code
      );
    }

    // 204 No Content
    if (response.status === 204) {
      return undefined as unknown as T;
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiClientError) throw error;
    throw new ApiClientError(
      error instanceof Error ? error.message : "Network error occurred"
    );
  }
}

// ---------------------------------------------------------------------------
// Health API
// ---------------------------------------------------------------------------

export const healthApi = {
  check: async (): Promise<HealthCheck> => {
    return apiFetch<HealthCheck>("/health", { auth: false });
  },
};

// ---------------------------------------------------------------------------
// Auth API
// ---------------------------------------------------------------------------

export const authApi = {
  login: async (data: ClerkLoginRequest): Promise<UserResponse> => {
    return apiFetch<UserResponse>("/auth/clerk/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  me: async (): Promise<UserResponse> => {
    return apiFetch<UserResponse>("/auth/me");
  },
};

// ---------------------------------------------------------------------------
// Models API
// ---------------------------------------------------------------------------

export const modelsApi = {
  /**
   * List all models (no auth required)
   */
  list: async (): Promise<ModelListItem[]> => {
    return apiFetch<ModelListItem[]>("/models", { auth: false });
  },

  /**
   * Get model detail with parts (auth required)
   */
  getDetail: async (id: number | string): Promise<ModelDetail> => {
    return apiFetch<ModelDetail>(`/models/${id}`);
  },
};

// ---------------------------------------------------------------------------
// Chat API
// ---------------------------------------------------------------------------

export const chatApi = {
  /**
   * Create new chat session
   */
  createSession: async (
    modelId: number | string,
    title?: string
  ): Promise<ChatSessionResponse> => {
    return apiFetch<ChatSessionResponse>("/chat/sessions", {
      method: "POST",
      body: JSON.stringify({
        model_id: Number(modelId),
        title: title ?? null,
      }),
    });
  },

  /**
   * Stream chat message (SSE)
   * Backend format: `data: {text}\n\n`
   */
  streamMessage: async (
    sessionId: number | string,
    content: string,
    n?: number
  ): Promise<ReadableStreamDefaultReader<Uint8Array>> => {
    const params = n != null ? `?n=${n}` : "";
    const url = `${API_URL}/chat/sessions/${sessionId}/messages/stream${params}`;

    const authHeaders = await getAuthHeaders();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
      },
      body: JSON.stringify({ content } satisfies ChatMessageCreate),
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
   * List chat sessions (optionally filtered by model)
   */
  listSessions: async (
    modelId?: number | string
  ): Promise<ChatSessionResponse[]> => {
    const params = modelId != null ? `?model_id=${Number(modelId)}` : "";
    return apiFetch<ChatSessionResponse[]>(`/chat/sessions${params}`);
  },

  /**
   * Get messages for a session (newest first, paginated)
   */
  getMessages: async (
    sessionId: number | string,
    limit = 20,
    skip = 0
  ): Promise<ChatMessageResponse[]> => {
    return apiFetch<ChatMessageResponse[]>(
      `/chat/sessions/${sessionId}/messages?limit=${limit}&skip=${skip}`
    );
  },

  /**
   * Delete a chat session (returns 204 No Content)
   */
  deleteSession: async (sessionId: number | string): Promise<void> => {
    await apiFetch<void>(`/chat/sessions/${sessionId}`, {
      method: "DELETE",
    });
  },
};

// ---------------------------------------------------------------------------
// Notes API (no DELETE endpoint on backend)
// ---------------------------------------------------------------------------

export const notesApi = {
  /**
   * Get note for model or part.
   * Returns null if no note exists (backend returns null, not 404).
   */
  get: async (
    modelId: number | string,
    partId?: number | string
  ): Promise<StudyNoteResponse | null> => {
    const params = new URLSearchParams({
      model_id: String(Number(modelId)),
    });
    // Only append part_id if it's a valid number (mesh names like "Crankshaft" → NaN)
    if (partId != null && !isNaN(Number(partId))) {
      params.append("part_id", String(Number(partId)));
    }
    return apiFetch<StudyNoteResponse | null>(`/notes?${params}`);
  },

  /**
   * Upsert note (create or update)
   */
  save: async (
    modelId: number | string,
    content: string,
    partId?: number | string
  ): Promise<StudyNoteResponse> => {
    const body: StudyNoteUpsert = {
      model_id: Number(modelId),
      // Only send part_id if it's a valid number (mesh names produce NaN)
      part_id: partId != null && !isNaN(Number(partId)) ? Number(partId) : null,
      content,
    };
    return apiFetch<StudyNoteResponse>("/notes", {
      method: "PUT",
      body: JSON.stringify(body),
    });
  },
};

// ---------------------------------------------------------------------------
// Unified API client
// ---------------------------------------------------------------------------

export const api = {
  health: healthApi,
  auth: authApi,
  models: modelsApi,
  chat: chatApi,
  notes: notesApi,
};
