/**
 * Centralized HTTP client for the ASP.NET Core backend.
 * Visual components must NOT call fetch directly — go through feature api/ modules,
 * which use this client.
 */

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown,
    /** Stable business error code from the backend ProblemDetails (e.g. PLAN_LIMIT_REACHED). */
    public code?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/** Thrown when the request never reached the server (offline / DNS / abort). */
export class NetworkError extends Error {
  constructor(message = "network_unreachable") {
    super(message);
    this.name = "NetworkError";
  }
}

// Same-origin: the API routes live in this same Next.js app.
const BASE_URL = "";

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  /** Abort after N ms (default 15s). */
  timeoutMs?: number;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, timeoutMs = 15_000, headers, ...rest } = options;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch {
    throw new NetworkError();
  } finally {
    clearTimeout(timeout);
  }

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    const p = (payload ?? {}) as Record<string, unknown>;
    const code = typeof p.code === "string" ? p.code : undefined;
    const message =
      (typeof p.detail === "string" && p.detail) ||
      (typeof p.message === "string" && p.message) ||
      res.statusText ||
      "request_failed";
    throw new ApiError(res.status, message, payload, code);
  }

  return payload as T;
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "POST", body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "PUT", body }),
};
