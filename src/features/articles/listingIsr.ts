import { GetStaticProps } from "next";
import { buildApiUrl } from "@src/config";
import { ArticleMeta } from "@src/types";

/**
 * Factory to create ISR getStaticProps for article listings pages.
 * - Fetches `{ArticleMeta[]}` from the given API path.
 * - Returns props `{ items }` with a 3-hour revalidate window.
 * - On fetch error, returns empty items with same revalidate.
 */
export function createListingGetStaticProps(apiPath: string) {
  const getStaticProps: GetStaticProps<{ items: ArticleMeta[] }> = async () => {
    try {
      const res = await fetch(buildApiUrl(apiPath));
      if (!res.ok) {
        return { props: { items: [] }, revalidate: 10800 };
      }
      const data = (await res.json()) as unknown;
      const items = Array.isArray(data) ? (data as ArticleMeta[]) : [];
      return { props: { items }, revalidate: 10800 };
    } catch {
      return { props: { items: [] }, revalidate: 10800 };
    }
  };
  return getStaticProps;
}
