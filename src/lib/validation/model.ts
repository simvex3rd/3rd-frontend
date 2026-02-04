/**
 * Model validation schemas
 *
 * Zod schemas for validating 3D model-related API payloads.
 */

import { z } from "zod";

/**
 * Vector3 schema (x, y, z)
 */
export const Vector3Schema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});

/**
 * Vector4 schema (x, y, z, w for quaternion)
 */
export const Vector4Schema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
  w: z.number(),
});

/**
 * Part geometry schema
 */
export const PartGeometrySchema = z.object({
  id: z.number().int().positive(),
  partId: z.number().int().positive("Part ID must be positive"),
  initialPos: Vector3Schema.nullable(),
  initialRot: Vector4Schema.nullable(),
  initialScale: Vector3Schema.nullable(),
  explodedPos: Vector3Schema.nullable(),
});

/**
 * Part schema
 */
export const PartSchema = z.object({
  id: z.number().int().positive(),
  modelId: z.number().int().positive("Model ID must be positive"),
  name: z.string().nullable(),
  description: z.string().nullable(),
  material: z.string().nullable(),
  metadata: z.record(z.string(), z.unknown()).nullable(),
  geometries: z.array(PartGeometrySchema),
});

/**
 * Model schema
 */
export const ModelSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().nullable(),
  description: z.string().nullable(),
  thumbnailUrl: z.string().url("Invalid thumbnail URL").nullable(),
  fileUrl: z.string().url("Invalid file URL").nullable(),
  parts: z.array(PartSchema),
});

/**
 * Type exports (inferred from schemas)
 */
export type Vector3SchemaType = z.infer<typeof Vector3Schema>;
export type Vector4SchemaType = z.infer<typeof Vector4Schema>;
export type PartGeometrySchemaType = z.infer<typeof PartGeometrySchema>;
export type PartSchemaType = z.infer<typeof PartSchema>;
export type ModelSchemaType = z.infer<typeof ModelSchema>;
