import { apiClient } from "@src/lib/api/client";
import { ListedArticle } from "./types";

export async function getRecentBlog(n: number = 5): Promise<ListedArticle[]> {
  return apiClient.get<ListedArticle[]>("/api/recent_blog", { n });
}

export async function getRecentNews(n: number = 5): Promise<ListedArticle[]> {
  return apiClient.get<ListedArticle[]>("/api/recent_news", { n });
}
