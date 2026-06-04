import { GetStaticProps } from "next";

import { ApiResponse } from "../api/client";

/**
 * Factory to create ISR getStaticProps for all listing elements.
 *
 * @param getItemsFunction The function used to get the list of items
 * @returns props `{ items }` with a 30-minute revalidate window.
 * @returns On fetch error, returns empty items with same revalidate.
 */
export function createListingGetStaticProps<T>(
  getItemsFunction: () => Promise<ApiResponse<T[]>>,
  ttl: number = 1800,
  fallbackTtl: number = 180,
): GetStaticProps<{ items: T[] }> {
  return async () => {
    try {
      const res = await getItemsFunction();
      const data = res.data;

      return { props: { items: data }, revalidate: ttl };
    } catch {
      return { props: { items: [] }, revalidate: fallbackTtl };
    }
  };
}
