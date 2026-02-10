import { describe, it, expect } from "vitest";
import {
  Vector3Schema,
  Vector4Schema,
  PartGeometrySchema,
  PartSchema,
  ModelSchema,
} from "./model";

describe("model validation schemas", () => {
  describe("Vector3Schema", () => {
    it("should accept valid {x, y, z}", () => {
      const result = Vector3Schema.safeParse({ x: 1, y: 2, z: 3 });
      expect(result.success).toBe(true);
    });

    it("should accept zero values", () => {
      const result = Vector3Schema.safeParse({ x: 0, y: 0, z: 0 });
      expect(result.success).toBe(true);
    });

    it("should accept negative values", () => {
      const result = Vector3Schema.safeParse({ x: -1.5, y: -2.5, z: -3.5 });
      expect(result.success).toBe(true);
    });

    it("should reject missing fields", () => {
      const result = Vector3Schema.safeParse({ x: 1, y: 2 });
      expect(result.success).toBe(false);
    });

    it("should reject string values", () => {
      const result = Vector3Schema.safeParse({ x: "1", y: "2", z: "3" });
      expect(result.success).toBe(false);
    });
  });

  describe("Vector4Schema", () => {
    it("should accept valid {x, y, z, w}", () => {
      const result = Vector4Schema.safeParse({ x: 0, y: 0, z: 0, w: 1 });
      expect(result.success).toBe(true);
    });

    it("should reject missing w", () => {
      const result = Vector4Schema.safeParse({ x: 0, y: 0, z: 0 });
      expect(result.success).toBe(false);
    });
  });

  describe("PartGeometrySchema", () => {
    const validGeometry = {
      id: 1,
      partId: 10,
      initialPos: { x: 0, y: 0, z: 0 },
      initialRot: { x: 0, y: 0, z: 0, w: 1 },
      initialScale: { x: 1, y: 1, z: 1 },
      explodedPos: { x: 5, y: 0, z: 0 },
    };

    it("should accept valid geometry", () => {
      const result = PartGeometrySchema.safeParse(validGeometry);
      expect(result.success).toBe(true);
    });

    it("should accept null positions", () => {
      const result = PartGeometrySchema.safeParse({
        ...validGeometry,
        initialPos: null,
        initialRot: null,
        initialScale: null,
        explodedPos: null,
      });
      expect(result.success).toBe(true);
    });

    it("should reject non-positive partId", () => {
      const result = PartGeometrySchema.safeParse({
        ...validGeometry,
        partId: 0,
      });
      expect(result.success).toBe(false);
    });
  });

  describe("PartSchema", () => {
    const validPart = {
      id: 1,
      modelId: 42,
      name: "Crankshaft",
      description: "Main engine crankshaft",
      material: "Steel",
      metadata: { weight: "2.5kg" },
      geometries: [],
    };

    it("should accept valid part", () => {
      const result = PartSchema.safeParse(validPart);
      expect(result.success).toBe(true);
    });

    it("should accept null name, description, material, metadata", () => {
      const result = PartSchema.safeParse({
        ...validPart,
        name: null,
        description: null,
        material: null,
        metadata: null,
      });
      expect(result.success).toBe(true);
    });

    it("should accept part with geometries", () => {
      const result = PartSchema.safeParse({
        ...validPart,
        geometries: [
          {
            id: 1,
            partId: 1,
            initialPos: null,
            initialRot: null,
            initialScale: null,
            explodedPos: null,
          },
        ],
      });
      expect(result.success).toBe(true);
    });

    it("should reject non-positive modelId", () => {
      const result = PartSchema.safeParse({ ...validPart, modelId: -1 });
      expect(result.success).toBe(false);
    });
  });

  describe("ModelSchema", () => {
    const validModel = {
      id: 1,
      name: "V8 Engine",
      description: "A V8 engine model",
      thumbnailUrl: "https://example.com/thumb.jpg",
      fileUrl: "https://example.com/model.glb",
      parts: [],
    };

    it("should accept valid model", () => {
      const result = ModelSchema.safeParse(validModel);
      expect(result.success).toBe(true);
    });

    it("should accept null urls", () => {
      const result = ModelSchema.safeParse({
        ...validModel,
        thumbnailUrl: null,
        fileUrl: null,
      });
      expect(result.success).toBe(true);
    });

    it("should reject invalid thumbnailUrl", () => {
      const result = ModelSchema.safeParse({
        ...validModel,
        thumbnailUrl: "not-a-url",
      });
      expect(result.success).toBe(false);
    });

    it("should reject invalid fileUrl", () => {
      const result = ModelSchema.safeParse({
        ...validModel,
        fileUrl: "not-a-url",
      });
      expect(result.success).toBe(false);
    });

    it("should accept model with parts", () => {
      const result = ModelSchema.safeParse({
        ...validModel,
        parts: [
          {
            id: 1,
            modelId: 1,
            name: "Part A",
            description: null,
            material: null,
            metadata: null,
            geometries: [],
          },
        ],
      });
      expect(result.success).toBe(true);
    });
  });
});
