export const API_URL = "http://127.0.0.1:5000";

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public cause?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * API response data type which nests the response in a "data" key within.
 */
export type ApiResponse<T> = {
  data: T;
};

/**
 * Builds the full URL for an API request to the backend.
 *
 * @param path - The base API path.
 * @param params - The query params object. Keys must be strings; values
 * may be a string or number. Optional.
 * @returns The final URL string.
 */
function buildUrl(
  path: string,
  params?: Record<string, string | number>,
): string {
  const url = `${API_URL}${path.startsWith("/") ? "" : "/"}${path}`;

  if (!params) return url;

  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    searchParams.append(key, String(value));
  }

  return `${url}?${searchParams.toString()}`;
}

async function request<T>(
  method: string,
  path: string,
  params?: Record<string, string | number>,
  body?: unknown,
): Promise<T> {
  const url = buildUrl(path, params);

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body !== undefined) options.body = JSON.stringify(body);

  let res: Response;

  try {
    res = await fetch(url, options);
  } catch (err) {
    throw new ApiError(
      `Network error during ${method.toUpperCase()} request.`,
      0,
      err,
    );
  }

  if (!res.ok)
    throw new ApiError(
      `${method} ${path} failed with status ${res.status}`,
      res.status,
    );

  return res.json() as Promise<T>;
}

class ApiClient {
  /**
   * Performs a GET request on the provided path and returns a promise returned by
   * the request parsed to JSON.
   *
   * @param path - The base API path.
   * @param params - The query params object. Keys must be strings; values
   * may be a string or number. Optional.
   * @returns A promise resolving to the parsed JSON response.
   */
  get<T>(path: string, params?: Record<string, string | number>): Promise<T> {
    return request<T>("GET", path, params);
  }

  /**
   * Performs a POST request on the provided path and returns a promise returned by
   * the request parsed to JSON.
   *
   * @param path - The base API path.
   * @param body - The body of the request.
   * @param params - The query params object. Keys must be strings; values
   * may be a string or number. Optional.
   * @returns A promise resolving to the parsed JSON response.
   */
  post<T>(
    path: string,
    body?: unknown,
    params?: Record<string, string | number>,
  ): Promise<T> {
    return request<T>("POST", path, params, body);
  }

  /**
   * Performs a PUT request on the provided path and returns a promise returned by
   * the request parsed to JSON.
   *
   * @param path - The base API path.
   * @param body - The body of the request.
   * @param params - The query params object. Keys must be strings; values
   * may be a string or number. Optional.
   * @returns A promise resolving to the parsed JSON response.
   */
  put<T>(
    path: string,
    body?: unknown,
    params?: Record<string, string | number>,
  ): Promise<T> {
    return request<T>("PUT", path, params, body);
  }

  /**
   * Performs a DELETE request on the provided path and returns a promise returned by
   * the request parsed to JSON.
   *
   * @param path - The base API path.
   * @param params - The query params object. Keys must be strings; values
   * may be a string or number. Optional.
   * @returns A promise resolving to the parsed JSON response.
   */
  delete<T>(
    path: string,
    params?: Record<string, string | number>,
  ): Promise<T> {
    return request<T>("DELETE", path, params);
  }
}

export const apiClient = new ApiClient();
