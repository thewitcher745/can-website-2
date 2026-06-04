import { API_URL, ApiResponse } from "@src/lib/api/client";
import { Listed, PostType } from "@src/shared/types/posts";
import { Admin } from "./types";
import { getAdminToken } from "./utils";

type AdminGetPostsApiResult<T> = ApiResponse<Admin<Listed<T>>[]>;

type AdminGetPostApiResult<T> = ApiResponse<Admin<T>>;

class AdminApiClient {
  private getHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAdminToken()}`,
    };
  }

  async get<T>(
    path: string,
    params?: Record<string, string | number>,
  ): Promise<T> {
    const url = new URL(path, API_URL);
    if (params) {
      Object.entries(params).forEach(([k, v]) =>
        url.searchParams.append(k, String(v)),
      );
    }
    const res = await fetch(url.toString(), {
      method: "GET",
      headers: this.getHeaders(),
    });

    if (!res.ok) throw new Error(`Admin API error: ${res.status}`);

    return res.json();
  }

  async post<T>(path: string, body?: unknown): Promise<T> {
    const url = new URL(path, API_URL);
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(JSON.stringify(errorData)); // Or throw structured error
    }

    return res.json();
  }

  async delete<T>(path: string, body?: unknown): Promise<T> {
    const url = new URL(path, API_URL);
    const res = await fetch(url.toString(), {
      method: "DELETE",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(JSON.stringify(errorData)); // Or throw structured error
    }
    return res.json();
  }

  async put<T>(path: string, body?: unknown): Promise<T> {
    const url = new URL(path, API_URL);
    const res = await fetch(url.toString(), {
      method: "PUT", // Fix this first
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(JSON.stringify(errorData)); // Or throw structured error
    }

    return res.json();
  }
}

export const adminApi = new AdminApiClient();

/**
 * Verifies if the current admin token is valid
 *
 * @returns Promise<boolean> True if token is valid, false otherwise
 */
export const verifyAdminToken = async (): Promise<boolean> => {
  const token = getAdminToken();

  if (!token) return false;

  try {
    await adminApi.get<{ username: string }>("/api/v2/auth/me");
    return true;
  } catch {
    return false;
  }
};
/**
 * Verifies an admin token on the server-side, doesn't use local storage.
 *
 * @param token The admin token to verify
 */
export const serverSideVerifyAdminToken = async (
  token: string,
): Promise<boolean> => {
  const url = new URL("/api/v2/auth/me", API_URL);
  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error(`Admin API error: ${res.status}`);
    return true;
  } catch {
    return false;
  }
};

/**
 * Gets posts for display in the dashboard
 *
 * @param postType Type of posts to list. Typically set to null to return all posts.
 *
 * @returns AdminGetPostsApiResult promise containing the listed posts' data under "data"
 */
export const getPostsAdmin = <T>(
  postType?: PostType,
): Promise<AdminGetPostsApiResult<T>> => {
  const path = postType
    ? `/api/v2/admin/posts?type=${postType}`
    : "/api/v2/admin/posts";
  return adminApi.get<AdminGetPostsApiResult<T>>(path);
};

/**
 * Gets a post for display in the editor
 *
 * @param postType Type of posts to get.
 * @param slug The slug of the post to get.
 *
 * @returns AdminGetPostApiResult promise containing the post data under "data"
 */
export const getPostAdmin = <T>(
  postType: PostType,
  slug: string,
): Promise<AdminGetPostApiResult<T>> => {
  return adminApi.get<AdminGetPostApiResult<T>>(
    `/api/v2/admin/posts/${postType}/${slug}`,
  );
};

/**
 * Creates a post with given type, slug and body information.
 *
 * @param postType Type of the post to create
 * @param slug Slug of the post to create
 * @param postBody JSON post data to set as the post body
 */
export const createPost = (
  postType: PostType,
  slug: string,
  postBody: unknown,
) => {
  const response = adminApi.post(`/api/v2/admin/posts/${postType}`, postBody);

  return response;
};

/**
 * Updates a post with given type, slug and body information.
 *
 * @param postType Type of the post to update
 * @param slug Slug of the post to update
 * @param postBody JSON post data to set as the post body
 */
export const updatePost = (
  postType: PostType,
  slug: string,
  postBody: unknown,
) => {
  const response = adminApi.put(
    `/api/v2/admin/posts/${postType}/${slug}`,
    postBody,
  );

  return response;
};

/**
 * Deletes a post with the given type and slug
 *
 * @param postType The type of the post to delete, aka "analysis", "blog", "news" or "high-potential"
 * @param slug The slug of the post to delete
 */
export const deletePost = (postType: PostType, slug: string) => {
  const response = adminApi.delete(`/api/v2/admin/posts/${postType}/${slug}`);

  return response;
};
