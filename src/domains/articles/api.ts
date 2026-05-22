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
  limit: number = 5,
): Promise<GetPostsApiResult> {
  return apiClient.get<GetPostsApiResult>("/api/v2/posts/blog", { limit });
}

/**
 * Gets the last ```limit``` number of news posts, without their content.
 *
 * @param limit Max number of posts to get.
 *
 * @returns GetPostsApiResult promise containing posts' data.
 */
export async function getNewsPosts(
  limit: number = 5,
): Promise<GetPostsApiResult> {
  return apiClient.get<GetPostsApiResult>("/api/v2/posts/news", { limit });
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
