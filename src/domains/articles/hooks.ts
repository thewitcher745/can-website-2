import useQuery from "@src/lib/hooks/useQuery";
import { getRecentBlog, getRecentNews } from "./api";
import { ListedArticleMeta } from "./types";

type UseRecentArticlesWidgetResult = {
  data: {
    blog: ListedArticleMeta[] | null;
    news: ListedArticleMeta[] | null;
  };
  loading: boolean;
  error: string | null;
};

/**
 * Fetches recent blog posts and news articles for the homepage widget.
 *
 * Combines the loading and error states from both API requests into a
 * single unified result for easier UI handling.
 *
 * @returns The combined widget state,
 * including blog data, news data, loading status, and possible errors.
 */
export function useRecentArticlesWidget(): UseRecentArticlesWidgetResult {
  const {
    data: blogData,
    loading: blogLoading,
    error: blogError,
    // refetch: blogRefetch,
  } = useQuery(getRecentBlog, []);
  const {
    data: newsData,
    loading: newsLoading,
    error: newsError,
    // refetch: newsRefetch,
  } = useQuery(getRecentNews, []);

  let loading = blogLoading || newsLoading;

  let error = blogError ?? newsError;

  return {
    data: {
      blog: blogData,
      news: newsData,
    },
    loading,
    error,
  };
}
