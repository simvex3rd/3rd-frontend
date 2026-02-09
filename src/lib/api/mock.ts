/**
 * Mock API for SIMVEX
 *
 * Provides realistic mock data matching the backend OpenAPI spec.
 * Used for development and testing without backend dependency.
 *
 * Aligned with: https://3rd-backend-production.up.railway.app/api/openapi.json
 */

import type {
  ModelListItem,
  ModelDetail,
  ChatSessionResponse,
  ChatMessageResponse,
  StudyNoteResponse,
} from "@/types/api";

/**
 * Simulate network delay
 */
async function delay(ms?: number): Promise<void> {
  const randomDelay = ms ?? Math.random() * 300 + 200; // 200-500ms
  await new Promise((resolve) => setTimeout(resolve, randomDelay));
}

/**
 * Mock data storage
 */
const mockData = {
  models: [
    {
      id: 1,
      name: "V4 Engine",
      thumbnail_url: "/models/v4-engine/thumbnail.jpg",
    },
    {
      id: 2,
      name: "Electric Motor",
      thumbnail_url: "/models/electric-motor/thumbnail.jpg",
    },
    {
      id: 3,
      name: "Manual Gearbox",
      thumbnail_url: "/models/gearbox/thumbnail.jpg",
    },
  ] as ModelListItem[],

  modelDetails: {
    1: {
      id: 1,
      name: "V4 Engine",
      thumbnail_url: "/models/v4-engine/thumbnail.jpg",
      parts: [
        {
          id: 101,
          model_id: 1,
          name: "Crankshaft",
          description:
            "Converts reciprocating motion of pistons into rotational motion",
          material: "Forged Steel",
          metadata: { weight_kg: 12.5, max_rpm: 7000, bearing_count: 5 },
          geometry: {
            id: 1001,
            part_id: 101,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 0, y: -2, z: 0 },
          },
        },
        {
          id: 102,
          model_id: 1,
          name: "Piston 1",
          description: "First cylinder piston assembly with rings",
          material: "Aluminum Alloy",
          metadata: {
            weight_kg: 0.35,
            diameter_mm: 86,
            stroke_mm: 90,
            compression_ratio: 10.5,
          },
          geometry: {
            id: 1002,
            part_id: 102,
            initial_pos: { x: -0.5, y: 0.8, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: -1.5, y: 2.5, z: 0 },
          },
        },
        {
          id: 103,
          model_id: 1,
          name: "Piston 2",
          description: "Second cylinder piston assembly",
          material: "Aluminum Alloy",
          metadata: {
            weight_kg: 0.35,
            diameter_mm: 86,
            stroke_mm: 90,
            compression_ratio: 10.5,
          },
          geometry: {
            id: 1003,
            part_id: 103,
            initial_pos: { x: 0.5, y: 0.8, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 1.5, y: 2.5, z: 0 },
          },
        },
        {
          id: 104,
          model_id: 1,
          name: "Cylinder Head",
          description: "Houses valves, camshafts, and combustion chambers",
          material: "Cast Aluminum",
          metadata: { weight_kg: 8.2, valve_count: 16, camshaft_count: 2 },
          geometry: {
            id: 1004,
            part_id: 104,
            initial_pos: { x: 0, y: 1.5, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 0, y: 3.5, z: 0 },
          },
        },
      ],
    } as ModelDetail,

    2: {
      id: 2,
      name: "Electric Motor",
      thumbnail_url: "/models/electric-motor/thumbnail.jpg",
      parts: [
        {
          id: 201,
          model_id: 2,
          name: "Stator",
          description: "Stationary electromagnetic component",
          material: "Laminated Steel",
          metadata: { weight_kg: 15.3, winding_type: "three-phase" },
          geometry: {
            id: 2001,
            part_id: 201,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 0, y: 0, z: -2 },
          },
        },
        {
          id: 202,
          model_id: 2,
          name: "Rotor",
          description: "Rotating magnetic core",
          material: "Laminated Steel",
          metadata: { weight_kg: 8.7, max_rpm: 15000 },
          geometry: {
            id: 2002,
            part_id: 202,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 0, y: 0, z: 2 },
          },
        },
      ],
    } as ModelDetail,

    3: {
      id: 3,
      name: "Manual Gearbox",
      thumbnail_url: "/models/gearbox/thumbnail.jpg",
      parts: [
        {
          id: 301,
          model_id: 3,
          name: "Input Shaft",
          description: "Primary shaft receiving power from clutch",
          material: "Hardened Steel",
          metadata: { weight_kg: 3.2, spline_count: 23 },
          geometry: {
            id: 3001,
            part_id: 301,
            initial_pos: { x: 0, y: 0, z: -1 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 0, y: 0, z: -3 },
          },
        },
        {
          id: 302,
          model_id: 3,
          name: "Output Shaft",
          description: "Final drive shaft to differential",
          material: "Hardened Steel",
          metadata: { weight_kg: 2.8 },
          geometry: {
            id: 3002,
            part_id: 302,
            initial_pos: { x: 0, y: 0, z: 1 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 0, y: 0, z: 3 },
          },
        },
      ],
    } as ModelDetail,
  } as Record<number, ModelDetail>,

  chatSessions: [
    {
      id: 1,
      user_id: "user-1",
      model_id: 1,
      title: "Understanding Engine Timing",
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 2,
      user_id: "user-1",
      model_id: 1,
      title: "Combustion Process",
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
  ] as ChatSessionResponse[],

  chatMessages: {
    1: [
      {
        id: 1,
        session_id: 1,
        role: "user",
        content: "How does the timing belt work?",
        created_at: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: 2,
        session_id: 1,
        role: "assistant",
        content:
          "The timing belt synchronizes the rotation of the crankshaft and camshaft. This ensures the engine valves open and close at the correct times relative to piston position.",
        created_at: new Date(Date.now() - 86300000).toISOString(),
      },
    ] as ChatMessageResponse[],
    2: [
      {
        id: 3,
        session_id: 2,
        role: "user",
        content: "Explain the four-stroke cycle",
        created_at: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 4,
        session_id: 2,
        role: "assistant",
        content:
          "The four-stroke cycle consists of:\n1. **Intake**: Air-fuel mixture enters\n2. **Compression**: Mixture compressed\n3. **Power**: Spark ignites mixture\n4. **Exhaust**: Burnt gases expelled",
        created_at: new Date(Date.now() - 3500000).toISOString(),
      },
    ] as ChatMessageResponse[],
  } as Record<number, ChatMessageResponse[]>,

  notes: [
    {
      id: 1,
      user_id: "user-1",
      model_id: 1,
      part_id: 101,
      content:
        "Key component - converts linear to rotational motion. 5 main bearings support the shaft.",
      updated_at: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: 2,
      user_id: "user-1",
      model_id: 1,
      part_id: null,
      content:
        "Overall engine notes:\n- 4 cylinders\n- DOHC design\n- ~2.0L displacement",
      updated_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ] as StudyNoteResponse[],
};

/**
 * Generate unique IDs
 */
let sessionIdCounter = 100;
let messageIdCounter = 1000;
let noteIdCounter = 100;

/**
 * Mock Models API
 */
export const mockModelsApi = {
  list: async (): Promise<ModelListItem[]> => {
    await delay();
    return [...mockData.models];
  },

  getDetail: async (id: number | string): Promise<ModelDetail> => {
    await delay();
    const numericId = Number(id);
    const model = mockData.modelDetails[numericId];
    if (!model) {
      throw new Error(`Model not found: ${id}`);
    }
    return JSON.parse(JSON.stringify(model)); // Deep clone
  },
};

/**
 * Mock Chat API
 */
export const mockChatApi = {
  createSession: async (
    modelId: number | string,
    title?: string
  ): Promise<ChatSessionResponse> => {
    await delay();

    const session: ChatSessionResponse = {
      id: ++sessionIdCounter,
      user_id: "user-1",
      model_id: Number(modelId),
      title: title || `New Chat ${mockData.chatSessions.length + 1}`,
      created_at: new Date().toISOString(),
    };

    mockData.chatSessions.push(session);
    mockData.chatMessages[session.id] = [];

    return session;
  },

  /**
   * Stream chat message - matches backend SSE format: `data: {text}\n\n`
   */
  streamMessage: async (
    sessionId: number | string,
    content: string,
    _n?: number
  ): Promise<ReadableStreamDefaultReader<Uint8Array>> => {
    await delay(100);

    const numericSessionId = Number(sessionId);

    // Add user message
    const userMessage: ChatMessageResponse = {
      id: ++messageIdCounter,
      session_id: numericSessionId,
      role: "user",
      content,
      created_at: new Date().toISOString(),
    };

    if (!mockData.chatMessages[numericSessionId]) {
      mockData.chatMessages[numericSessionId] = [];
    }
    mockData.chatMessages[numericSessionId].push(userMessage);

    // Generate assistant response chunks (plain text, matching backend format)
    const chunks = [
      "Great question! Here's how it works:\n\n",
      "## Key Components\n\n",
      "The engine has **four main parts**:\n\n",
      "1. **Crankshaft** — converts linear to rotational motion\n",
      "2. **Pistons** — reciprocating compression cycle\n",
      "3. **Cylinder Head** — houses valves and camshafts\n",
      "4. **Connecting Rods** — link pistons to crankshaft\n\n",
      "### How They Work Together\n\n",
      "The pistons move in a `reciprocating pattern` driven by combustion. ",
      "Each piston fires in sequence:\n\n",
      "```\nIntake → Compression → Power → Exhaust\n```\n\n",
      "> **Pro tip:** The timing belt synchronizes the crankshaft and camshaft rotation.\n\n",
      "This ensures *optimal valve timing* for maximum efficiency.",
    ];

    const encoder = new TextEncoder();
    const assistantContent: string[] = [];

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        for (const chunk of chunks) {
          await delay(150);
          assistantContent.push(chunk);
          // SSE multi-line format: each line gets its own data: prefix
          const lines = chunk.split("\n");
          const sseData = lines.map((l) => `data: ${l}`).join("\n") + "\n\n";
          controller.enqueue(encoder.encode(sseData));
        }

        // Store complete assistant message
        const assistantMessage: ChatMessageResponse = {
          id: ++messageIdCounter,
          session_id: numericSessionId,
          role: "assistant",
          content: assistantContent.join(""),
          created_at: new Date().toISOString(),
        };
        mockData.chatMessages[numericSessionId].push(assistantMessage);

        // Signal end of stream
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return stream.getReader();
  },

  listSessions: async (
    modelId?: number | string
  ): Promise<ChatSessionResponse[]> => {
    await delay();
    let sessions = [...mockData.chatSessions];

    if (modelId != null) {
      const numericModelId = Number(modelId);
      sessions = sessions.filter((s) => s.model_id === numericModelId);
    }

    return sessions.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  getMessages: async (
    sessionId: number | string,
    limit = 20,
    skip = 0
  ): Promise<ChatMessageResponse[]> => {
    await delay();

    const numericSessionId = Number(sessionId);
    const messages = mockData.chatMessages[numericSessionId] || [];
    return messages
      .slice()
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .slice(skip, skip + limit);
  },

  /**
   * Delete a chat session (matches backend 204 No Content)
   */
  deleteSession: async (sessionId: number | string): Promise<void> => {
    await delay();

    const numericSessionId = Number(sessionId);
    const index = mockData.chatSessions.findIndex(
      (s) => s.id === numericSessionId
    );
    if (index !== -1) {
      mockData.chatSessions.splice(index, 1);
      delete mockData.chatMessages[numericSessionId];
    }
  },
};

/**
 * Mock Notes API (no DELETE - matches backend)
 */
export const mockNotesApi = {
  /**
   * Get note for model or part.
   * Returns null if not found (matches backend behavior).
   */
  get: async (
    modelId: number | string,
    partId?: number | string
  ): Promise<StudyNoteResponse | null> => {
    await delay();

    const numericModelId = Number(modelId);
    const numericPartId = partId != null ? Number(partId) : null;

    const note = mockData.notes.find(
      (n) => n.model_id === numericModelId && n.part_id === numericPartId
    );

    return note ? { ...note } : null;
  },

  save: async (
    modelId: number | string,
    content: string,
    partId?: number | string
  ): Promise<StudyNoteResponse> => {
    await delay();

    const numericModelId = Number(modelId);
    const numericPartId = partId != null ? Number(partId) : null;

    const existingIndex = mockData.notes.findIndex(
      (n) => n.model_id === numericModelId && n.part_id === numericPartId
    );

    const note: StudyNoteResponse = {
      id:
        existingIndex >= 0 ? mockData.notes[existingIndex].id : ++noteIdCounter,
      user_id: "user-1",
      model_id: numericModelId,
      part_id: numericPartId,
      content,
      updated_at: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      mockData.notes[existingIndex] = note;
    } else {
      mockData.notes.push(note);
    }

    return { ...note };
  },
};

/**
 * Unified Mock API (matches client.ts interface)
 */
export const mockApi = {
  models: mockModelsApi,
  chat: mockChatApi,
  notes: mockNotesApi,
};
