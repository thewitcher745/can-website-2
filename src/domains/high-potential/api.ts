import { apiClient, ApiResponse } from "@src/lib/api/client";
import { HighPotentialPost, ListedHighPotential } from "./types";

type GetPostsApiResult = ApiResponse<ListedHighPotential[]>;
type GetPostApiResult = ApiResponse<HighPotentialPost>;

/**
 * Gets the last ```limit``` number of high potential posts, without their content.
 *
 * @param limit Max number of posts to get.
 *
 * @returns GetPostsApiResult promise containing posts' data.
 */
export async function getHighPotentialPosts(
  limit: number = 5,
): Promise<GetPostsApiResult> {
  return apiClient.get<GetPostsApiResult>("/api/v2/posts/high-potential", {
    limit,
  });
}

/**
 * Gets a high potential post given its slug
 *
 * @param slug Slug of the high potential post to get.
 *
 * @returns GetPostApiResult promise containing the post's data.
 */
export async function getHighPotentialPost(
  slug: string,
): Promise<GetPostApiResult> {
  return apiClient.get<GetPostApiResult>(
    `/api/v2/posts/high-potential/${slug}`,
  );
}
