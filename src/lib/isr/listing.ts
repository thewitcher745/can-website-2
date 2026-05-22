import { GetStaticProps } from "next";

import { ApiResponse } from "../api/client";

/**
 * Factory to create ISR getStaticProps for article/analysis/high potential listings pages.
 *
 * @param getPostsFunction The function used to get the list of posts
 * @returns props `{ items }` with a 30-minute revalidate window.
 * @returns On fetch error, returns empty items with same revalidate.
 */
export function createListingGetStaticProps<T>(
  getPostsFunction: () => Promise<ApiResponse<T[]>>,
): GetStaticProps<{ items: T[] }> {
  return async () => {
    try {
      const res = await getPostsFunction();
      const data = res.data;

      return { props: { items: data }, revalidate: 1800 };
    } catch {
      return { props: { items: [] }, revalidate: 180 };
    }
  };
}
