import { describe, it, expect } from "vitest";
import {
  UserSchema,
  CreateUserPayloadSchema,
  UpdateUserPayloadSchema,
} from "./user";

describe("user validation schemas", () => {
  describe("UserSchema", () => {
    const validUser = {
      id: "user_abc123",
      email: "user@example.com",
      username: "johndoe",
      createdAt: "2026-01-01T00:00:00Z",
      lastLogin: "2026-02-01T00:00:00Z",
    };

    it("should accept valid user", () => {
      const result = UserSchema.safeParse(validUser);
      expect(result.success).toBe(true);
    });

    it("should coerce date strings to Date", () => {
      const parsed = UserSchema.parse(validUser);
      expect(parsed.createdAt).toBeInstanceOf(Date);
      expect(parsed.lastLogin).toBeInstanceOf(Date);
    });

    it("should accept null email", () => {
      const result = UserSchema.safeParse({ ...validUser, email: null });
      expect(result.success).toBe(true);
    });

    it("should reject empty id", () => {
      const result = UserSchema.safeParse({ ...validUser, id: "" });
      expect(result.success).toBe(false);
    });

    it("should reject empty username", () => {
      const result = UserSchema.safeParse({ ...validUser, username: "" });
      expect(result.success).toBe(false);
    });

    it("should reject invalid email format", () => {
      const result = UserSchema.safeParse({
        ...validUser,
        email: "not-an-email",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("CreateUserPayloadSchema", () => {
    it("should accept valid payload", () => {
      const result = CreateUserPayloadSchema.safeParse({
        id: "user_abc",
        email: "test@example.com",
        username: "testuser",
      });
      expect(result.success).toBe(true);
    });

    it("should accept null email", () => {
      const result = CreateUserPayloadSchema.safeParse({
        id: "user_abc",
        email: null,
        username: "testuser",
      });
      expect(result.success).toBe(true);
    });

    it("should reject missing id", () => {
      const result = CreateUserPayloadSchema.safeParse({
        email: "test@example.com",
        username: "testuser",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("UpdateUserPayloadSchema", () => {
    it("should accept optional username", () => {
      const result = UpdateUserPayloadSchema.safeParse({
        username: "newname",
      });
      expect(result.success).toBe(true);
    });

    it("should accept empty object", () => {
      const result = UpdateUserPayloadSchema.safeParse({});
      expect(result.success).toBe(true);
    });

    it("should reject empty username string", () => {
      const result = UpdateUserPayloadSchema.safeParse({ username: "" });
      expect(result.success).toBe(false);
    });
  });
});
