import { apiClient, ApiResponse } from "@src/lib/api/client";
import { ArticlePost, ListedArticle } from "./types";

type GetPostsApiResult = ApiResponse<ListedArticle[]>;
type GetPostApiResult = ApiResponse<ArticlePost>;

/**
 * Gets the last ```limit``` number of blog posts, without their content.
 *
 * @param limit Max number of posts to get.
 *
 * @returns GetPostsApiResult promise containing posts' data.
 */
export async function getBlogPosts(
  limit: number | null = null,
): Promise<GetPostsApiResult> {
  var params = {};

  if (limit !== null) params = { limit };

  return apiClient.get<GetPostsApiResult>("/api/v2/posts/blog", params);
}

/**
 * Gets the last ```limit``` number of news posts, without their content.
 *
 * @param limit Max number of posts to get.
 *
 * @returns GetPostsApiResult promise containing posts' data.
 */
export async function getNewsPosts(
  limit: number | null = null,
): Promise<GetPostsApiResult> {
  var params: Record<string, any> = {};

  if (limit !== null) params = { limit };

  return apiClient.get<GetPostsApiResult>("/api/v2/posts/news", params);
}

/**
 * Gets a blog post given its slug
 *
 * @param slug Slug of the blog post to get.
 *
 * @returns GetPostApiResult promise containing the post's data.
 */
export async function getBlogPost(slug: string): Promise<GetPostApiResult> {
  return apiClient.get<GetPostApiResult>(`/api/v2/posts/blog/${slug}`);
}

/**
 * Gets a news post given its slug
 *
 * @param slug Slug of the news post to get.
 *
 * @returns GetPostApiResult promise containing the post's data.
 */
export async function getNewsPost(slug: string): Promise<GetPostApiResult> {
  return apiClient.get<GetPostApiResult>(`/api/v2/posts/news/${slug}`);
}

/**
 * Gets only the slugs of all blog posts (optimized for sitemap/paths generation)
 *
 * @returns Promise containing array of slugs
 */
export async function getBlogSlugs(): Promise<ApiResponse<string[]>> {
  return apiClient.get<ApiResponse<string[]>>("/api/v2/posts/slugs/blog");
}

/**
 * Gets only the slugs of all news posts (optimized for sitemap/paths generation)
 *
 * @returns Promise containing array of slugs
 */
export async function getNewsSlugs(): Promise<ApiResponse<string[]>> {
  return apiClient.get<ApiResponse<string[]>>("/api/v2/posts/slugs/news");
}
