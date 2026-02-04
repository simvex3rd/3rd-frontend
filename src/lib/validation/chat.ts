/**
 * Chat validation schemas
 *
 * Zod schemas for validating chat-related API payloads.
 */

import { z } from "zod";

/**
 * Chat session schema
 */
export const ChatSessionSchema = z.object({
  id: z.number().int().positive(),
  userId: z.string().min(1, "User ID is required"),
  modelId: z.number().int().positive("Model ID must be positive"),
  title: z.string().nullable(),
  lastResponseId: z.string().nullable(),
  createdAt: z.coerce.date(),
});

/**
 * Chat message schema
 */
export const ChatMessageSchema = z.object({
  id: z.number().int().positive(),
  sessionId: z.number().int().positive("Session ID must be positive"),
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().min(1, "Message content cannot be empty"),
  createdAt: z.coerce.date(),
});

/**
 * Create session payload schema
 */
export const CreateSessionPayloadSchema = z.object({
  modelId: z.number().int().positive("Model ID must be positive"),
  title: z.string().max(100, "Title too long").optional(),
});

/**
 * Send message payload schema
 */
export const SendMessagePayloadSchema = z.object({
  content: z
    .string()
    .min(1, "Message cannot be empty")
    .max(10000, "Message too long"),
});

/**
 * Chat session with messages schema
 */
export const ChatSessionWithMessagesSchema = ChatSessionSchema.extend({
  messages: z.array(ChatMessageSchema),
});

/**
 * Type exports (inferred from schemas)
 */
export type ChatSessionSchemaType = z.infer<typeof ChatSessionSchema>;
export type ChatMessageSchemaType = z.infer<typeof ChatMessageSchema>;
export type CreateSessionPayloadType = z.infer<
  typeof CreateSessionPayloadSchema
>;
export type SendMessagePayloadType = z.infer<typeof SendMessagePayloadSchema>;
export type ChatSessionWithMessagesType = z.infer<
  typeof ChatSessionWithMessagesSchema
>;
