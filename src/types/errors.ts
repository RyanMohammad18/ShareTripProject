// types/errors.ts

export interface AppError {
    message: string;
    hint: string;
    retryable: boolean;
  }
  
  /**
   * Maps every error from resilientClient to a user-friendly message.
   *
   * Error 1 — Network failure     → "Unable to reach the server"
   * Error 2 — User cancelled      → null (show nothing)
   * Error 3 — Timeout             → "Request timed out"
   * Error 4 — Empty response      → "Server sent empty response"
   * Error 5 — Malformed response  → "Server sent unexpected data"
   * Error 6 — Unknown             → "Something went wrong"
   */
  export function normalizeError(error: Error): AppError | null {
    const msg = error.message.toLowerCase();
  
    // Error 2: User cancelled — not a real failure, show nothing
    if (error.name === 'AbortError' || msg.includes('abort')) {
      return null;
    }
  
    // Error 1: Network failure — the 20% flaky API error
    if (msg.includes('network') || msg.includes('failed to fetch') || msg.includes('overloaded')) {
      return {
        message: 'Unable to reach the server',
        hint: 'The server appears to be overloaded. We retried 3 times with no luck.',
        retryable: true,
      };
    }
  
    // Error 3: Timeout — request exceeded 10 seconds
    if (msg.includes('timed out') || msg.includes('timeout')) {
      return {
        message: 'Request timed out',
        hint: 'The server took too long to respond. This usually resolves on its own.',
        retryable: true,
      };
    }
  
    // Error 4: Empty response — server returned null/undefined
    if (msg.includes('empty response')) {
      return {
        message: 'Server sent empty response',
        hint: 'We received a response but it contained no data.',
        retryable: true,
      };
    }
  
    // Error 5: Malformed response — data shape is wrong
    if (msg.includes('invalid response') || msg.includes('unexpected token') || msg.includes('json')) {
      return {
        message: 'Server sent unexpected data',
        hint: 'The response format was not what we expected.',
        retryable: true,
      };
    }
  
    // Error 6: Unknown — catch-all for anything unexpected
    return {
      message: 'Something went wrong',
      hint: 'An unexpected error occurred. Please try again.',
      retryable: true,
    };
  }
 