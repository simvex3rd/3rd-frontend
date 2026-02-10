/**
 * Retry wrapper for async operations with exponential backoff
 *
 * Retries on: network errors (no status), timeouts, 503 Service Unavailable
 * Does NOT retry: 400, 401, 404, 422 (client errors / auth issues)
 */

interface RetryOptions {
  maxRetries?: number;
  delayMs?: number;
}

function isRetryable(err: unknown): boolean {
  if (err instanceof Response) {
    return err.status === 503;
  }

  if (err && typeof err === "object" && "status" in err) {
    const status = (err as { status: number }).status;
    return status === 503;
  }

  // Network errors (fetch failure) are retryable
  if (err instanceof TypeError) return true;

  // Abort errors are NOT retryable
  if (err instanceof DOMException && err.name === "AbortError") return false;

  return true;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  options?: RetryOptions
): Promise<T> {
  const maxRetries = options?.maxRetries ?? 2;
  const delayMs = options?.delayMs ?? 1000;

  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;

      if (attempt >= maxRetries || !isRetryable(err)) {
        throw err;
      }

      // Exponential backoff: delay * (attempt + 1)
      await new Promise((resolve) =>
        setTimeout(resolve, delayMs * (attempt + 1))
      );
    }
  }

  throw lastError;
}
