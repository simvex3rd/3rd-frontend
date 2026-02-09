/**
 * Data normalization utilities
 *
 * Normalizes geometry data between different API formats:
 * - Mock API uses: initial_pos / initial_rot / initial_scale / exploded_pos with {x, y, z}
 * - Real API uses: initial_position / initial_rotation / initial_scale / exploded_position with [x, y, z]
 *
 * Canonical format (output): {x, y, z} objects with short key names
 */

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface NormalizedGeometry {
  id: number;
  part_id: number;
  initial_pos: Vec3;
  initial_rot: Vec3;
  initial_scale: Vec3;
  exploded_pos: Vec3;
}

export interface NormalizedPart {
  id: number;
  model_id: number;
  name: string | null;
  description: string | null;
  material: string | null;
  metadata: Record<string, unknown> | null;
  geometry: NormalizedGeometry | null;
}

/**
 * Convert a position value to Vec3.
 * Accepts {x, y, z} objects or [x, y, z] arrays.
 */
function toVec3(value: unknown, fallback: Vec3 = { x: 0, y: 0, z: 0 }): Vec3 {
  if (!value) return fallback;

  // Array format: [x, y, z]
  if (Array.isArray(value)) {
    return {
      x: value[0] ?? 0,
      y: value[1] ?? 0,
      z: value[2] ?? 0,
    };
  }

  // Object format: {x, y, z}
  if (typeof value === "object" && value !== null) {
    const obj = value as Record<string, unknown>;
    return {
      x: Number(obj.x ?? 0),
      y: Number(obj.y ?? 0),
      z: Number(obj.z ?? 0),
    };
  }

  return fallback;
}

/**
 * Normalize geometry data from either API format to canonical Vec3 format.
 */
export function normalizeGeometry(
  raw: Record<string, unknown>
): NormalizedGeometry {
  return {
    id: Number(raw.id ?? 0),
    part_id: Number(raw.part_id ?? 0),
    initial_pos: toVec3(raw.initial_pos ?? raw.initial_position),
    initial_rot: toVec3(raw.initial_rot ?? raw.initial_rotation),
    initial_scale: toVec3(raw.initial_scale, { x: 1, y: 1, z: 1 }),
    exploded_pos: toVec3(raw.exploded_pos ?? raw.exploded_position),
  };
}

/**
 * Normalize a part from either API format.
 */
export function normalizePart(raw: Record<string, unknown>): NormalizedPart {
  const geometry = raw.geometry as Record<string, unknown> | null | undefined;

  return {
    id: Number(raw.id ?? 0),
    model_id: Number(raw.model_id ?? 0),
    name: (raw.name as string) ?? null,
    description: (raw.description as string) ?? null,
    material: (raw.material as string) ?? null,
    metadata: (raw.metadata as Record<string, unknown>) ?? null,
    geometry: geometry ? normalizeGeometry(geometry) : null,
  };
}

/**
 * Normalize an array of parts from either API format.
 */
export function normalizeParts(
  rawParts: Record<string, unknown>[]
): NormalizedPart[] {
  return rawParts.map(normalizePart);
}
