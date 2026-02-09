/**
 * Mock API for SIMVEX
 *
 * Provides realistic mock data matching the backend API structure.
 * Used for development and testing without backend dependency.
 */

import type {
  ModelListItem,
  ModelDetail,
  ChatSession,
  ChatMessage,
  StudyNote,
} from "@/types/api";

/**
 * Simulate network delay
 */
async function delay(ms = 300): Promise<void> {
  const randomDelay = Math.random() * 300 + 200; // 200-500ms
  await new Promise((resolve) => setTimeout(resolve, ms || randomDelay));
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
  ] as ChatSession[],

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
    ] as ChatMessage[],
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
    ] as ChatMessage[],
  } as Record<number, ChatMessage[]>,

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
  ] as StudyNote[],
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
  /**
   * List all models
   */
  list: async (): Promise<ModelListItem[]> => {
    await delay();
    return [...mockData.models];
  },

  /**
   * Get model detail with parts
   */
  getDetail: async (id: string): Promise<ModelDetail> => {
    await delay();
    const numericId = parseInt(id, 10);
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
  /**
   * Create new chat session
   */
  createSession: async (
    modelId: string,
    title?: string
  ): Promise<ChatSession> => {
    await delay();

    const session: ChatSession = {
      id: ++sessionIdCounter,
      user_id: "user-1",
      model_id: parseInt(modelId, 10),
      title: title || `New Chat ${mockData.chatSessions.length + 1}`,
      created_at: new Date().toISOString(),
    };

    mockData.chatSessions.push(session);
    mockData.chatMessages[session.id] = [];

    return session;
  },

  /**
   * Stream chat message (matches real API interface - returns ReadableStreamDefaultReader)
   */
  streamMessage: async (
    sessionId: string,
    content: string
  ): Promise<ReadableStreamDefaultReader<Uint8Array>> => {
    await delay(100);

    const numericSessionId = parseInt(sessionId, 10);

    // Add user message
    const userMessage: ChatMessage = {
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

    // Generate assistant response
    const responses = [
      "That's a great question about the engine components. ",
      "Let me explain how this works. ",
      "The mechanism involves several interconnected parts. ",
      "First, consider the primary motion of the crankshaft. ",
      "This rotational force is transmitted through the connecting rods. ",
      "The pistons move in a reciprocating pattern. ",
      "Timing is crucial for proper valve operation. ",
      "The entire system operates in a synchronized manner.",
    ];

    const encoder = new TextEncoder();
    const assistantContent: string[] = [];

    // Create a ReadableStream that matches the SSE format
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        // Stream response in chunks (SSE format)
        for (const chunk of responses) {
          await delay(150); // Simulate streaming delay
          assistantContent.push(chunk);
          const data = `data: ${JSON.stringify({ type: "content", data: chunk })}\n\n`;
          controller.enqueue(encoder.encode(data));
        }

        // Add complete assistant message to storage
        const assistantMessage: ChatMessage = {
          id: ++messageIdCounter,
          session_id: numericSessionId,
          role: "assistant",
          content: assistantContent.join(""),
          created_at: new Date().toISOString(),
        };

        mockData.chatMessages[numericSessionId].push(assistantMessage);

        // Send done event
        const doneData = `data: ${JSON.stringify({ type: "done", data: assistantMessage.id })}\n\n`;
        controller.enqueue(encoder.encode(doneData));

        controller.close();
      },
    });

    return stream.getReader();
  },

  /**
   * List chat sessions
   */
  listSessions: async (modelId?: string): Promise<ChatSession[]> => {
    await delay();
    let sessions = [...mockData.chatSessions];

    if (modelId) {
      const numericModelId = parseInt(modelId, 10);
      sessions = sessions.filter((s) => s.model_id === numericModelId);
    }

    return sessions.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  /**
   * Get messages for a session
   */
  getMessages: async (
    sessionId: string,
    limit = 50,
    skip = 0
  ): Promise<ChatMessage[]> => {
    await delay();

    const numericSessionId = parseInt(sessionId, 10);
    const messages = mockData.chatMessages[numericSessionId] || [];
    return messages
      .slice()
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
      .slice(skip, skip + limit);
  },

  /**
   * Delete a chat session
   */
  deleteSession: async (sessionId: string): Promise<{ message: string }> => {
    await delay();

    const numericSessionId = parseInt(sessionId, 10);
    const index = mockData.chatSessions.findIndex(
      (s) => s.id === numericSessionId
    );
    if (index !== -1) {
      mockData.chatSessions.splice(index, 1);
      delete mockData.chatMessages[numericSessionId];
    }

    return { message: "Session deleted successfully" };
  },
};

/**
 * Mock Notes API
 */
export const mockNotesApi = {
  /**
   * Get note for model or part
   */
  get: async (modelId: string, partId?: string): Promise<StudyNote> => {
    await delay();

    const numericModelId = parseInt(modelId, 10);
    const numericPartId = partId ? parseInt(partId, 10) : null;

    const note = mockData.notes.find(
      (n) => n.model_id === numericModelId && n.part_id === numericPartId
    );

    if (!note) {
      throw new Error("Note not found");
    }

    return { ...note };
  },

  /**
   * Save note (create or update)
   */
  save: async (
    modelId: string,
    content: string,
    partId?: string
  ): Promise<StudyNote> => {
    await delay();

    const numericModelId = parseInt(modelId, 10);
    const numericPartId = partId ? parseInt(partId, 10) : null;

    const existingIndex = mockData.notes.findIndex(
      (n) => n.model_id === numericModelId && n.part_id === numericPartId
    );

    const note: StudyNote = {
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

  /**
   * Delete a note
   */
  delete: async (
    modelId: string,
    partId?: string
  ): Promise<{ message: string }> => {
    await delay();

    const numericModelId = parseInt(modelId, 10);
    const numericPartId = partId ? parseInt(partId, 10) : null;

    const index = mockData.notes.findIndex(
      (n) => n.model_id === numericModelId && n.part_id === numericPartId
    );

    if (index !== -1) {
      mockData.notes.splice(index, 1);
    }

    return { message: "Note deleted successfully" };
  },
};

/**
 * Unified Mock API (matches src/lib/api/client.ts interface)
 */
export const mockApi = {
  models: mockModelsApi,
  chat: mockChatApi,
  notes: mockNotesApi,
};
