import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  sanitizeError,
  createErrorResponse,
  createValidationError,
  createUnauthorizedError,
  createForbiddenError,
  createNotFoundError,
  createServiceUnavailableError,
} from "./error-handler";
import { ApiErrorCode } from "@/types/api";

describe("error-handler", () => {
  const originalEnv = process.env.NODE_ENV;

  afterEach(() => {
    vi.stubEnv("NODE_ENV", originalEnv ?? "test");
  });

  describe("sanitizeError", () => {
    describe("in development", () => {
      beforeEach(() => {
        vi.stubEnv("NODE_ENV", "development");
      });

      it("should expose Error message and stack in development", () => {
        const error = new Error("Database connection failed");
        const result = sanitizeError(error);

        expect(result.code).toBe(ApiErrorCode.INTERNAL_ERROR);
        expect(result.message).toBe("Database connection failed");
        expect(result.details).toHaveProperty("stack");
        expect(result.details).toHaveProperty("name", "Error");
      });

      it("should stringify non-Error in development", () => {
        const result = sanitizeError("string error");

        expect(result.code).toBe(ApiErrorCode.INTERNAL_ERROR);
        expect(result.message).toBe("string error");
        expect(result.details).toBe("string error");
      });

      it("should handle object errors in development", () => {
        const errorObj = { code: "DB_ERR", detail: "timeout" };
        const result = sanitizeError(errorObj);

        expect(result.message).toBe(String(errorObj));
        expect(result.details).toBe(errorObj);
      });
    });

    describe("in production", () => {
      beforeEach(() => {
        vi.stubEnv("NODE_ENV", "production");
      });

      it("should hide error details in production", () => {
        const error = new Error("secret database password exposed");
        const result = sanitizeError(error);

        expect(result.code).toBe(ApiErrorCode.INTERNAL_ERROR);
        expect(result.message).toBe(
          "An unexpected error occurred. Please try again later."
        );
        expect(result.details).toBeUndefined();
      });

      it("should hide non-Error details in production", () => {
        const result = sanitizeError({ secret: "data" });

        expect(result.message).toBe(
          "An unexpected error occurred. Please try again later."
        );
        expect(result.details).toBeUndefined();
      });
    });
  });

  describe("createErrorResponse", () => {
    it("should return Response with status 500 by default", async () => {
      vi.stubEnv("NODE_ENV", "production");
      const response = createErrorResponse(new Error("fail"));
      expect(response.status).toBe(500);

      const body = await response.json();
      expect(body.success).toBe(false);
      expect(body.error.code).toBe(ApiErrorCode.INTERNAL_ERROR);
    });

    it("should use custom status code", async () => {
      vi.stubEnv("NODE_ENV", "production");
      const response = createErrorResponse(new Error("fail"), 502);
      expect(response.status).toBe(502);
    });
  });

  describe("createValidationError", () => {
    it("should return 400 status", async () => {
      const response = createValidationError("Invalid input");
      expect(response.status).toBe(400);

      const body = await response.json();
      expect(body.success).toBe(false);
      expect(body.error.code).toBe(ApiErrorCode.BAD_REQUEST);
      expect(body.error.message).toBe("Invalid input");
    });

    it("should include details in development", async () => {
      vi.stubEnv("NODE_ENV", "development");
      const details = { field: "email", issue: "invalid" };
      const response = createValidationError("Invalid input", details);

      const body = await response.json();
      expect(body.error.details).toEqual(details);
    });

    it("should exclude details in production", async () => {
      vi.stubEnv("NODE_ENV", "production");
      const details = { field: "email", issue: "invalid" };
      const response = createValidationError("Invalid input", details);

      const body = await response.json();
      expect(body.error.details).toBeUndefined();
    });
  });

  describe("createUnauthorizedError", () => {
    it("should return 401 with default message", async () => {
      const response = createUnauthorizedError();
      expect(response.status).toBe(401);

      const body = await response.json();
      expect(body.error.code).toBe(ApiErrorCode.UNAUTHORIZED);
      expect(body.error.message).toBe("Unauthorized");
    });

    it("should use custom message", async () => {
      const response = createUnauthorizedError("Token expired");
      const body = await response.json();
      expect(body.error.message).toBe("Token expired");
    });
  });

  describe("createForbiddenError", () => {
    it("should return 403 with default message", async () => {
      const response = createForbiddenError();
      expect(response.status).toBe(403);

      const body = await response.json();
      expect(body.error.code).toBe(ApiErrorCode.FORBIDDEN);
      expect(body.error.message).toBe("Forbidden");
    });
  });

  describe("createNotFoundError", () => {
    it("should return 404 with resource name", async () => {
      const response = createNotFoundError("Model");
      expect(response.status).toBe(404);

      const body = await response.json();
      expect(body.error.code).toBe(ApiErrorCode.NOT_FOUND);
      expect(body.error.message).toBe("Model not found");
    });
  });

  describe("createServiceUnavailableError", () => {
    it("should return 503 with default message", async () => {
      const response = createServiceUnavailableError();
      expect(response.status).toBe(503);

      const body = await response.json();
      expect(body.error.code).toBe("SERVICE_UNAVAILABLE");
      expect(body.error.message).toContain("Service temporarily unavailable");
    });

    it("should use custom message", async () => {
      const response = createServiceUnavailableError("Clerk is down");
      const body = await response.json();
      expect(body.error.message).toBe("Clerk is down");
    });
  });
});
