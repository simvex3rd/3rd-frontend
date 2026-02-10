import { describe, it, expect } from "vitest";
import {
  ChatSessionSchema,
  ChatMessageSchema,
  CreateSessionPayloadSchema,
  SendMessagePayloadSchema,
  ChatSessionWithMessagesSchema,
} from "./chat";

describe("chat validation schemas", () => {
  describe("ChatSessionSchema", () => {
    const validSession = {
      id: 1,
      userId: "user_abc",
      modelId: 42,
      title: "Engine Discussion",
      lastResponseId: "resp_123",
      createdAt: "2026-01-01T00:00:00Z",
    };

    it("should accept valid session", () => {
      const result = ChatSessionSchema.safeParse(validSession);
      expect(result.success).toBe(true);
    });

    it("should accept null title and lastResponseId", () => {
      const result = ChatSessionSchema.safeParse({
        ...validSession,
        title: null,
        lastResponseId: null,
      });
      expect(result.success).toBe(true);
    });

    it("should coerce date string to Date", () => {
      const result = ChatSessionSchema.parse(validSession);
      expect(result.createdAt).toBeInstanceOf(Date);
    });

    it("should reject non-positive id", () => {
      const result = ChatSessionSchema.safeParse({ ...validSession, id: 0 });
      expect(result.success).toBe(false);
    });

    it("should reject empty userId", () => {
      const result = ChatSessionSchema.safeParse({
        ...validSession,
        userId: "",
      });
      expect(result.success).toBe(false);
    });

    it("should reject negative modelId", () => {
      const result = ChatSessionSchema.safeParse({
        ...validSession,
        modelId: -1,
      });
      expect(result.success).toBe(false);
    });

    it("should reject non-integer id", () => {
      const result = ChatSessionSchema.safeParse({
        ...validSession,
        id: 1.5,
      });
      expect(result.success).toBe(false);
    });
  });

  describe("ChatMessageSchema", () => {
    const validMessage = {
      id: 1,
      sessionId: 10,
      role: "user",
      content: "Hello!",
      createdAt: "2026-01-01T00:00:00Z",
    };

    it("should accept valid message", () => {
      const result = ChatMessageSchema.safeParse(validMessage);
      expect(result.success).toBe(true);
    });

    it("should accept all valid roles", () => {
      for (const role of ["user", "assistant", "system"]) {
        const result = ChatMessageSchema.safeParse({
          ...validMessage,
          role,
        });
        expect(result.success).toBe(true);
      }
    });

    it("should reject invalid role", () => {
      const result = ChatMessageSchema.safeParse({
        ...validMessage,
        role: "admin",
      });
      expect(result.success).toBe(false);
    });

    it("should reject empty content", () => {
      const result = ChatMessageSchema.safeParse({
        ...validMessage,
        content: "",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("CreateSessionPayloadSchema", () => {
    it("should accept valid payload", () => {
      const result = CreateSessionPayloadSchema.safeParse({ modelId: 1 });
      expect(result.success).toBe(true);
    });

    it("should accept optional title", () => {
      const result = CreateSessionPayloadSchema.safeParse({
        modelId: 1,
        title: "My Session",
      });
      expect(result.success).toBe(true);
    });

    it("should reject title over 100 chars", () => {
      const result = CreateSessionPayloadSchema.safeParse({
        modelId: 1,
        title: "a".repeat(101),
      });
      expect(result.success).toBe(false);
    });

    it("should reject non-positive modelId", () => {
      const result = CreateSessionPayloadSchema.safeParse({ modelId: 0 });
      expect(result.success).toBe(false);
    });
  });

  describe("SendMessagePayloadSchema", () => {
    it("should accept valid message", () => {
      const result = SendMessagePayloadSchema.safeParse({
        content: "Hello!",
      });
      expect(result.success).toBe(true);
    });

    it("should reject empty content", () => {
      const result = SendMessagePayloadSchema.safeParse({ content: "" });
      expect(result.success).toBe(false);
    });

    it("should reject content over 10000 chars", () => {
      const result = SendMessagePayloadSchema.safeParse({
        content: "a".repeat(10001),
      });
      expect(result.success).toBe(false);
    });

    it("should accept max-length content", () => {
      const result = SendMessagePayloadSchema.safeParse({
        content: "a".repeat(10000),
      });
      expect(result.success).toBe(true);
    });
  });

  describe("ChatSessionWithMessagesSchema", () => {
    it("should accept session with messages array", () => {
      const result = ChatSessionWithMessagesSchema.safeParse({
        id: 1,
        userId: "user_abc",
        modelId: 42,
        title: null,
        lastResponseId: null,
        createdAt: "2026-01-01T00:00:00Z",
        messages: [
          {
            id: 1,
            sessionId: 1,
            role: "user",
            content: "Hi",
            createdAt: "2026-01-01T00:00:00Z",
          },
        ],
      });
      expect(result.success).toBe(true);
    });

    it("should accept session with empty messages", () => {
      const result = ChatSessionWithMessagesSchema.safeParse({
        id: 1,
        userId: "user_abc",
        modelId: 42,
        title: null,
        lastResponseId: null,
        createdAt: "2026-01-01T00:00:00Z",
        messages: [],
      });
      expect(result.success).toBe(true);
    });
  });
});
