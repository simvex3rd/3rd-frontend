/**
 * XSS sanitization utilities
 *
 * Uses DOMPurify to sanitize user-generated content (HTML, markdown).
 */

import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitize HTML content to prevent XSS attacks
 *
 * Removes potentially dangerous HTML/JavaScript while preserving safe formatting.
 * Use this for any user-generated content before rendering.
 *
 * @param dirty - Untrusted HTML/text content
 * @returns Sanitized safe HTML
 *
 * @example
 * ```tsx
 * const userComment = '<script>alert("XSS")</script>Hello';
 * const safe = sanitizeHtml(userComment);
 * // safe = "Hello" (script removed)
 * ```
 */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "s",
      "a",
      "ul",
      "ol",
      "li",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "blockquote",
      "code",
      "pre",
    ],
    ALLOWED_ATTR: ["href", "target", "rel"],
  });
}

/**
 * Sanitize markdown content
 *
 * More permissive than HTML sanitization, allows common markdown formatting.
 * Still prevents XSS by removing scripts and dangerous attributes.
 *
 * @param markdown - Untrusted markdown content
 * @returns Sanitized markdown
 *
 * @example
 * ```tsx
 * const userNote = '# Title\n<script>alert("XSS")</script>';
 * const safe = sanitizeMarkdown(userNote);
 * // safe = "# Title\n" (script removed)
 * ```
 */
export function sanitizeMarkdown(markdown: string): string {
  return DOMPurify.sanitize(markdown, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "s",
      "a",
      "ul",
      "ol",
      "li",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "blockquote",
      "code",
      "pre",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "img",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "title"],
    ALLOW_DATA_ATTR: false,
  });
}

/**
 * Strip all HTML tags and return plain text
 *
 * Use when you need to display user content as plain text only.
 *
 * @param html - HTML content
 * @returns Plain text with all tags removed
 *
 * @example
 * ```tsx
 * const html = '<p>Hello <strong>world</strong></p>';
 * const plain = stripHtml(html);
 * // plain = "Hello world"
 * ```
 */
export function stripHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
}

/**
 * Sanitize URL to prevent javascript: and data: schemes
 *
 * Only allows http:, https:, and mailto: protocols.
 *
 * @param url - Untrusted URL
 * @returns Sanitized URL or empty string if unsafe
 *
 * @example
 * ```tsx
 * sanitizeUrl('javascript:alert("XSS")'); // returns ""
 * sanitizeUrl('https://example.com');    // returns "https://example.com"
 * ```
 */
export function sanitizeUrl(url: string): string {
  const trimmed = url.trim();

  // Allow only safe protocols
  const safeProtocols = /^(https?|mailto):/i;

  if (safeProtocols.test(trimmed)) {
    return trimmed;
  }

  // If no protocol, assume relative URL (safe)
  if (!trimmed.includes(":")) {
    return trimmed;
  }

  // Reject dangerous protocols
  return "";
}
