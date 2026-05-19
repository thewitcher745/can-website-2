import useQuery from "@src/lib/hooks/useQuery";
import { TopCoinsListsWidget } from "./types";
import { getTopCoinsListsWidget } from "./api";

type UseTopCoinsListsWidgetResult = {
  data: TopCoinsListsWidget | null;
  loading: boolean;
  error: string | null;
};

/**
 * Fetches data needed for the top coins widget on the homepage.
 *
 * @returns The widget data, loading state and
 * error state.
 */
export function useTopCoinsListsWidget(): UseTopCoinsListsWidgetResult {
  const { data, loading, error } = useQuery(getTopCoinsListsWidget, []);

  return { data, loading, error};
}
