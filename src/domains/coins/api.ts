import { apiClient } from "@src/lib/api/client";
import { TopCoinsListsWidget, WidgetTopCoin } from "./types";

/**
 * Interface used to type declare the Api response for TopCoinsListsWidget
 * which has different snake_case keys instead of camelCase
 */
interface TopCoinsListsWidgetApiResponse {
  top_gainers: WidgetTopCoin[];
  top_losers: WidgetTopCoin[];
  trending: WidgetTopCoin[];
}

export async function getTopCoinsListsWidget(): Promise<TopCoinsListsWidget> {
  const response = await apiClient.get<TopCoinsListsWidgetApiResponse>(
    "/api/coins_tables_summary",
  );

  return {
    topGainers: response.top_gainers,
    topLosers: response.top_losers,
    trending: response.trending,
  };
}
