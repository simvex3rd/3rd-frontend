/**
 * User validation schemas
 *
 * Zod schemas for validating user-related API payloads.
 */

import { z } from "zod";

/**
 * User schema (for API responses)
 */
export const UserSchema = z.object({
  id: z.string().min(1, "User ID is required"),
  email: z.string().email("Invalid email").nullable(),
  username: z.string().min(1, "Username is required"),
  createdAt: z.coerce.date(),
  lastLogin: z.coerce.date(),
});

/**
 * Create user payload schema
 */
export const CreateUserPayloadSchema = z.object({
  id: z.string().min(1, "User ID is required"),
  email: z.string().email("Invalid email").nullable(),
  username: z.string().min(1, "Username is required"),
});

/**
 * Update user payload schema
 */
export const UpdateUserPayloadSchema = z.object({
  username: z.string().min(1, "Username cannot be empty").optional(),
});

/**
 * Type exports (inferred from schemas)
 */
export type UserSchemaType = z.infer<typeof UserSchema>;
export type CreateUserPayloadType = z.infer<typeof CreateUserPayloadSchema>;
export type UpdateUserPayloadType = z.infer<typeof UpdateUserPayloadSchema>;
