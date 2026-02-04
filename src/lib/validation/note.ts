/**
 * Note validation schemas
 *
 * Zod schemas for validating study note-related API payloads.
 */

import { z } from "zod";

/**
 * Study note schema
 */
export const StudyNoteSchema = z.object({
  id: z.number().int().positive(),
  userId: z.string().min(1, "User ID is required"),
  modelId: z.number().int().positive("Model ID must be positive"),
  partId: z.number().int().positive("Part ID must be positive").nullable(),
  content: z.string().nullable(),
  updatedAt: z.coerce.date().nullable(),
});

/**
 * Create note payload schema
 */
export const CreateNotePayloadSchema = z.object({
  modelId: z.number().int().positive("Model ID must be positive"),
  partId: z.number().int().positive("Part ID must be positive").optional(),
  content: z.string().min(1, "Note content cannot be empty"),
});

/**
 * Update note payload schema
 */
export const UpdateNotePayloadSchema = z.object({
  content: z.string().optional(),
  partId: z.number().int().positive("Part ID must be positive").optional(),
});

/**
 * Note filter options schema
 */
export const NoteFilterOptionsSchema = z.object({
  modelId: z.number().int().positive().optional(),
  partId: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional().default(20),
  offset: z.number().int().nonnegative().optional().default(0),
});

/**
 * Type exports (inferred from schemas)
 */
export type StudyNoteSchemaType = z.infer<typeof StudyNoteSchema>;
export type CreateNotePayloadType = z.infer<typeof CreateNotePayloadSchema>;
export type UpdateNotePayloadType = z.infer<typeof UpdateNotePayloadSchema>;
export type NoteFilterOptionsType = z.infer<typeof NoteFilterOptionsSchema>;
