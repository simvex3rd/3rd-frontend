import { describe, it, expect } from "vitest";
import {
  StudyNoteSchema,
  CreateNotePayloadSchema,
  UpdateNotePayloadSchema,
  NoteFilterOptionsSchema,
} from "./note";

describe("note validation schemas", () => {
  describe("StudyNoteSchema", () => {
    const validNote = {
      id: 1,
      userId: "user_abc",
      modelId: 42,
      partId: 10,
      content: "This is a study note",
      updatedAt: "2026-01-01T00:00:00Z",
    };

    it("should accept valid note", () => {
      const result = StudyNoteSchema.safeParse(validNote);
      expect(result.success).toBe(true);
    });

    it("should accept null partId, content, updatedAt", () => {
      const result = StudyNoteSchema.safeParse({
        ...validNote,
        partId: null,
        content: null,
        updatedAt: null,
      });
      expect(result.success).toBe(true);
    });

    it("should coerce updatedAt to Date", () => {
      const parsed = StudyNoteSchema.parse(validNote);
      expect(parsed.updatedAt).toBeInstanceOf(Date);
    });

    it("should reject empty userId", () => {
      const result = StudyNoteSchema.safeParse({ ...validNote, userId: "" });
      expect(result.success).toBe(false);
    });

    it("should reject non-positive modelId", () => {
      const result = StudyNoteSchema.safeParse({ ...validNote, modelId: 0 });
      expect(result.success).toBe(false);
    });
  });

  describe("CreateNotePayloadSchema", () => {
    it("should accept valid payload", () => {
      const result = CreateNotePayloadSchema.safeParse({
        modelId: 1,
        content: "My note",
      });
      expect(result.success).toBe(true);
    });

    it("should accept optional partId", () => {
      const result = CreateNotePayloadSchema.safeParse({
        modelId: 1,
        partId: 5,
        content: "My note",
      });
      expect(result.success).toBe(true);
    });

    it("should reject empty content", () => {
      const result = CreateNotePayloadSchema.safeParse({
        modelId: 1,
        content: "",
      });
      expect(result.success).toBe(false);
    });

    it("should reject non-positive modelId", () => {
      const result = CreateNotePayloadSchema.safeParse({
        modelId: 0,
        content: "Note",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("UpdateNotePayloadSchema", () => {
    it("should accept optional content", () => {
      const result = UpdateNotePayloadSchema.safeParse({
        content: "Updated note",
      });
      expect(result.success).toBe(true);
    });

    it("should accept optional partId", () => {
      const result = UpdateNotePayloadSchema.safeParse({ partId: 5 });
      expect(result.success).toBe(true);
    });

    it("should accept empty object", () => {
      const result = UpdateNotePayloadSchema.safeParse({});
      expect(result.success).toBe(true);
    });

    it("should reject non-positive partId", () => {
      const result = UpdateNotePayloadSchema.safeParse({ partId: -1 });
      expect(result.success).toBe(false);
    });
  });

  describe("NoteFilterOptionsSchema", () => {
    it("should accept empty object (uses defaults)", () => {
      const result = NoteFilterOptionsSchema.parse({});
      expect(result.limit).toBe(20);
      expect(result.offset).toBe(0);
    });

    it("should accept all filter options", () => {
      const result = NoteFilterOptionsSchema.safeParse({
        modelId: 1,
        partId: 5,
        limit: 50,
        offset: 10,
      });
      expect(result.success).toBe(true);
    });

    it("should reject limit over 100", () => {
      const result = NoteFilterOptionsSchema.safeParse({ limit: 101 });
      expect(result.success).toBe(false);
    });

    it("should reject negative offset", () => {
      const result = NoteFilterOptionsSchema.safeParse({ offset: -1 });
      expect(result.success).toBe(false);
    });
  });
});
