import { getTradesForMonthYear } from "./data";
import { calculateMonthSummary, calculateChartsData } from "./calculators";
import { TradeData, MonthSummaryData, ResultsChartsData } from "./types";

export const resultsApi = {
  getTradesForMonthYear: async (monthYear: string): Promise<TradeData[] | null> => {
    return getTradesForMonthYear(monthYear);
  },

  getSummaryForMonthYear: async (monthYear: string): Promise<MonthSummaryData | null> => {
    const trades = getTradesForMonthYear(monthYear);
    if (!trades) return null;
    return calculateMonthSummary(trades);
  },

  getChartsDataForMonthYear: async (
    monthYear: string,
  ): Promise<ResultsChartsData | null> => {
    const trades = getTradesForMonthYear(monthYear);
    if (!trades) return null;
    return calculateChartsData(trades);
  },
};
