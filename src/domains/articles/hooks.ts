import useQuery from "@src/lib/hooks/useQuery";
import { getBlogPosts, getNewsPosts } from "./api";
import { ListedArticle } from "./types";

type UseRecentArticlesWidgetResult = {
  data: {
    blog: ListedArticle[] | null;
    news: ListedArticle[] | null;
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
    data: blogResponse,
    loading: blogLoading,
    error: blogError,
    // refetch: blogRefetch,
  } = useQuery(getBlogPosts, []);
  const {
    data: newsResponse,
    loading: newsLoading,
    error: newsError,
    // refetch: newsRefetch,
  } = useQuery(getNewsPosts, []);

  let loading = blogLoading || newsLoading;

  let error = blogError ?? newsError;

  return {
    data: {
      blog: blogResponse?.data || [],
      news: newsResponse?.data || [],
    },
    loading,
    error,
  };
}