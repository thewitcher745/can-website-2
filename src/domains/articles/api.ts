import { apiClient } from "@src/lib/api/client";
import { ListedArticleMeta } from "./types";

export async function getRecentBlog(
  n: number = 5,
): Promise<ListedArticleMeta[]> {
  return apiClient.get<ListedArticleMeta[]>("/api/recent_blog", { n });
}

export async function getRecentNews(
  n: number = 5,
): Promise<ListedArticleMeta[]> {
  return apiClient.get<ListedArticleMeta[]>("/api/recent_news", { n });
}
