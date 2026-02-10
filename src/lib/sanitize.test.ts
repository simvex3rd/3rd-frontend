import { describe, it, expect } from "vitest";
import { sanitizeUrl } from "./sanitize";

// Note: sanitizeHtml, sanitizeMarkdown, stripHtml depend on DOMPurify
// which is lazy-loaded on client only. In jsdom, `window` exists so
// DOMPurify will try to load via require("dompurify").
// We test sanitizeUrl fully since it has no DOMPurify dependency.

describe("sanitizeUrl", () => {
  it("should allow https URLs", () => {
    expect(sanitizeUrl("https://example.com")).toBe("https://example.com");
  });

  it("should allow http URLs", () => {
    expect(sanitizeUrl("http://example.com")).toBe("http://example.com");
  });

  it("should allow mailto URLs", () => {
    expect(sanitizeUrl("mailto:user@example.com")).toBe(
      "mailto:user@example.com"
    );
  });

  it("should reject javascript: protocol", () => {
    expect(sanitizeUrl('javascript:alert("XSS")')).toBe("");
  });

  it("should reject data: protocol", () => {
    expect(sanitizeUrl("data:text/html,<script>alert(1)</script>")).toBe("");
  });

  it("should reject vbscript: protocol", () => {
    expect(sanitizeUrl("vbscript:MsgBox('XSS')")).toBe("");
  });

  it("should allow relative URLs (no protocol)", () => {
    expect(sanitizeUrl("/path/to/page")).toBe("/path/to/page");
    expect(sanitizeUrl("page.html")).toBe("page.html");
  });

  it("should trim whitespace", () => {
    expect(sanitizeUrl("  https://example.com  ")).toBe("https://example.com");
  });

  it("should handle empty string", () => {
    expect(sanitizeUrl("")).toBe("");
  });

  it("should allow URLs with query params", () => {
    expect(sanitizeUrl("https://example.com?q=test&page=1")).toBe(
      "https://example.com?q=test&page=1"
    );
  });

  it("should allow URLs with fragments", () => {
    expect(sanitizeUrl("https://example.com#section")).toBe(
      "https://example.com#section"
    );
  });

  it("should handle case-insensitive protocols", () => {
    expect(sanitizeUrl("HTTPS://example.com")).toBe("HTTPS://example.com");
    expect(sanitizeUrl("HTTP://example.com")).toBe("HTTP://example.com");
  });
});

// Test DOMPurify-based functions if available in jsdom
describe("sanitizeHtml", () => {
  it("should load and sanitize HTML (DOMPurify in jsdom)", async () => {
    // Dynamic import to match the lazy-load pattern
    const { sanitizeHtml } = await import("./sanitize");

    const result = sanitizeHtml('<p>Hello</p><script>alert("XSS")</script>');
    // DOMPurify should strip the script tag
    expect(result).not.toContain("<script>");
    expect(result).toContain("Hello");
  });

  it("should allow safe HTML tags", async () => {
    const { sanitizeHtml } = await import("./sanitize");

    const result = sanitizeHtml(
      "<p><strong>Bold</strong> and <em>italic</em></p>"
    );
    expect(result).toContain("<strong>");
    expect(result).toContain("<em>");
  });

  it("should strip disallowed tags", async () => {
    const { sanitizeHtml } = await import("./sanitize");

    const result = sanitizeHtml('<div><iframe src="evil.com"></iframe></div>');
    expect(result).not.toContain("<iframe>");
    expect(result).not.toContain("<div>");
  });

  it("should strip disallowed attributes", async () => {
    const { sanitizeHtml } = await import("./sanitize");

    const result = sanitizeHtml('<p onclick="alert(1)">Click</p>');
    expect(result).not.toContain("onclick");
    expect(result).toContain("Click");
  });
});

describe("sanitizeMarkdown", () => {
  it("should allow table tags", async () => {
    const { sanitizeMarkdown } = await import("./sanitize");

    const result = sanitizeMarkdown(
      "<table><thead><tr><th>Header</th></tr></thead></table>"
    );
    expect(result).toContain("<table>");
    expect(result).toContain("<th>");
  });

  it("should allow img tags with src and alt", async () => {
    const { sanitizeMarkdown } = await import("./sanitize");

    const result = sanitizeMarkdown(
      '<img src="https://example.com/img.png" alt="test">'
    );
    expect(result).toContain("<img");
    expect(result).toContain("src=");
    expect(result).toContain("alt=");
  });
});

describe("stripHtml", () => {
  it("should remove all HTML tags", async () => {
    const { stripHtml } = await import("./sanitize");

    const result = stripHtml("<p>Hello <strong>world</strong></p>");
    expect(result).not.toContain("<");
    expect(result).toContain("Hello");
    expect(result).toContain("world");
  });
});
