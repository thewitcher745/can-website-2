import { apiClient, ApiResponse } from "@src/lib/api/client";
import { AnalysisPost, ListedAnalysis } from "./types";

type GetPostsApiResult = ApiResponse<ListedAnalysis[]>;
type GetPostApiResult = ApiResponse<AnalysisPost>;

/**
 * Gets the last ```limit``` number of analysis posts, without their content.
 * Can filter by VIP status and coin contents.
 *
 * @param limit Max number of posts to get.
 * @param coin The coin to filter analysis by
 *
 * @returns GetPostsApiResult promise containing posts' data.
 */
export async function getAnalysisPosts(
  limit: number = 5,
  isVip: boolean | null = null,
  coin: string | null = null,
): Promise<GetPostsApiResult> {
  var params: Record<string, any> = {};

  if (limit !== null) params = { limit };
  if (isVip !== null) params.vip = isVip ? "true" : "false";
  if (coin !== null) params.coin = coin;

  return apiClient.get<GetPostsApiResult>("/api/v2/posts/analysis", params);
}

/**
 * Gets the analysis post specified by the slug.
 *
 * @param slug The slug of the analysis post to get.
 *
 * @returns GetPostApiResult promise containing the analysis post's data.
 */
export async function getAnalysisPost(slug: string): Promise<GetPostApiResult> {
  return apiClient.get<GetPostApiResult>(`/api/v2/posts/analysis/${slug}`);
}
