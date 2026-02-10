import { describe, it, expect } from "vitest";
import { normalizeGeometry, normalizePart, normalizeParts } from "./normalize";

describe("normalize", () => {
  describe("normalizeGeometry", () => {
    it("should normalize object-format positions", () => {
      const result = normalizeGeometry({
        id: 1,
        part_id: 10,
        initial_pos: { x: 1, y: 2, z: 3 },
        initial_rot: { x: 0, y: 0, z: 0 },
        initial_scale: { x: 1, y: 1, z: 1 },
        exploded_pos: { x: 5, y: 0, z: 0 },
      });

      expect(result.id).toBe(1);
      expect(result.part_id).toBe(10);
      expect(result.initial_pos).toEqual({ x: 1, y: 2, z: 3 });
      expect(result.initial_rot).toEqual({ x: 0, y: 0, z: 0 });
      expect(result.initial_scale).toEqual({ x: 1, y: 1, z: 1 });
      expect(result.exploded_pos).toEqual({ x: 5, y: 0, z: 0 });
    });

    it("should normalize array-format positions (real API)", () => {
      const result = normalizeGeometry({
        id: 2,
        part_id: 20,
        initial_position: [1, 2, 3],
        initial_rotation: [0.1, 0.2, 0.3],
        initial_scale: [1, 1, 1],
        exploded_position: [10, 0, 0],
      });

      expect(result.initial_pos).toEqual({ x: 1, y: 2, z: 3 });
      expect(result.initial_rot).toEqual({ x: 0.1, y: 0.2, z: 0.3 });
      expect(result.initial_scale).toEqual({ x: 1, y: 1, z: 1 });
      expect(result.exploded_pos).toEqual({ x: 10, y: 0, z: 0 });
    });

    it("should fallback to {0,0,0} for missing positions", () => {
      const result = normalizeGeometry({
        id: 3,
        part_id: 30,
      });

      expect(result.initial_pos).toEqual({ x: 0, y: 0, z: 0 });
      expect(result.initial_rot).toEqual({ x: 0, y: 0, z: 0 });
      expect(result.exploded_pos).toEqual({ x: 0, y: 0, z: 0 });
    });

    it("should fallback to {1,1,1} for missing scale", () => {
      const result = normalizeGeometry({
        id: 4,
        part_id: 40,
      });

      expect(result.initial_scale).toEqual({ x: 1, y: 1, z: 1 });
    });

    it("should handle null positions", () => {
      const result = normalizeGeometry({
        id: 5,
        part_id: 50,
        initial_pos: null,
        initial_rot: null,
        initial_scale: null,
        exploded_pos: null,
      });

      expect(result.initial_pos).toEqual({ x: 0, y: 0, z: 0 });
      expect(result.initial_rot).toEqual({ x: 0, y: 0, z: 0 });
      expect(result.initial_scale).toEqual({ x: 1, y: 1, z: 1 });
      expect(result.exploded_pos).toEqual({ x: 0, y: 0, z: 0 });
    });

    it("should handle partial arrays", () => {
      const result = normalizeGeometry({
        id: 6,
        part_id: 60,
        initial_pos: [5],
      });

      expect(result.initial_pos).toEqual({ x: 5, y: 0, z: 0 });
    });

    it("should handle missing id and part_id", () => {
      const result = normalizeGeometry({});
      expect(result.id).toBe(0);
      expect(result.part_id).toBe(0);
    });

    it("should fallback when value is non-object non-array (e.g. number)", () => {
      const result = normalizeGeometry({
        id: 8,
        part_id: 80,
        initial_pos: 999,
        initial_scale: "invalid",
      });

      expect(result.initial_pos).toEqual({ x: 0, y: 0, z: 0 });
      expect(result.initial_scale).toEqual({ x: 1, y: 1, z: 1 });
    });

    it("should prefer short key names over long ones", () => {
      // When both initial_pos and initial_position are present,
      // initial_pos should take priority (it's checked first with ??)
      const result = normalizeGeometry({
        id: 7,
        part_id: 70,
        initial_pos: { x: 1, y: 1, z: 1 },
        initial_position: [9, 9, 9],
      });

      expect(result.initial_pos).toEqual({ x: 1, y: 1, z: 1 });
    });
  });

  describe("normalizePart", () => {
    it("should normalize a part with geometry", () => {
      const result = normalizePart({
        id: 1,
        model_id: 42,
        name: "Crankshaft",
        description: "Engine part",
        material: "Steel",
        metadata: { weight: "2.5kg" },
        geometry: {
          id: 1,
          part_id: 1,
          initial_pos: { x: 0, y: 0, z: 0 },
          initial_rot: { x: 0, y: 0, z: 0 },
          initial_scale: { x: 1, y: 1, z: 1 },
          exploded_pos: { x: 5, y: 0, z: 0 },
        },
      });

      expect(result.id).toBe(1);
      expect(result.model_id).toBe(42);
      expect(result.name).toBe("Crankshaft");
      expect(result.geometry).not.toBeNull();
      expect(result.geometry!.initial_pos).toEqual({ x: 0, y: 0, z: 0 });
    });

    it("should handle null geometry", () => {
      const result = normalizePart({
        id: 2,
        model_id: 42,
        name: "Bolt",
        geometry: null,
      });

      expect(result.geometry).toBeNull();
    });

    it("should handle missing geometry", () => {
      const result = normalizePart({
        id: 3,
        model_id: 42,
        name: "Nut",
      });

      expect(result.geometry).toBeNull();
    });

    it("should default missing fields to null", () => {
      const result = normalizePart({ id: 4, model_id: 42 });

      expect(result.name).toBeNull();
      expect(result.description).toBeNull();
      expect(result.material).toBeNull();
      expect(result.metadata).toBeNull();
    });
  });

  describe("normalizeParts", () => {
    it("should normalize an array of parts", () => {
      const result = normalizeParts([
        { id: 1, model_id: 1, name: "A" },
        { id: 2, model_id: 1, name: "B" },
      ]);

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe("A");
      expect(result[1].name).toBe("B");
    });

    it("should return empty array for empty input", () => {
      expect(normalizeParts([])).toEqual([]);
    });
  });
});
