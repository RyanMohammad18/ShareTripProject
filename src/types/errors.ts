export interface AppError {
  message: string;
  hint: string;
  retryable: boolean;
}

export function normalizeError(error: Error): AppError | null {
  const msg = error.message.toLowerCase();

  if (error.name === "AbortError" || msg.includes("abort")) {
    return null;
  }

  if (
    msg.includes("network") ||
    msg.includes("failed to fetch") ||
    msg.includes("overloaded")
  ) {
    return {
      message: "Unable to reach the server",
      hint: "The server appears to be overloaded. We retried 3 times with no luck.",
      retryable: true,
    };
  }

  if (msg.includes("timed out") || msg.includes("timeout")) {
    return {
      message: "Request timed out",
      hint: "The server took too long to respond. This usually resolves on its own.",
      retryable: true,
    };
  }

  if (msg.includes("empty response")) {
    return {
      message: "Server sent empty response",
      hint: "We received a response but it contained no data.",
      retryable: true,
    };
  }

  if (
    msg.includes("invalid response") ||
    msg.includes("unexpected token") ||
    msg.includes("json")
  ) {
    return {
      message: "Server sent unexpected data",
      hint: "The response format was not what we expected.",
      retryable: true,
    };
  }

  return {
    message: "Something went wrong",
    hint: "An unexpected error occurred. Please try again.",
    retryable: true,
  };
}
