import {
  getAvailableMonthYears,
  getCategoriesForMonthYear,
  getTradesForMonthYear,
} from "./data";
import { calculateMonthSummary, calculateChartsData } from "./calculators";
import {
  TradeData,
  MonthSummaryData,
  ResultsChartsData,
  Category,
} from "./types";

export const resultsApi = {
  getCategoriesForMonthYear: async (monthYear: string): Promise<Category[]> => {
    return getCategoriesForMonthYear(monthYear);
  },

  getAvailableMonthYears: async () => {
    return getAvailableMonthYears();
  },

  getTradesForMonthYear: async (
    monthYear: string,
    category: Category,
  ): Promise<TradeData[] | null> => {
    return getTradesForMonthYear(monthYear, category);
  },

  getSummaryForMonthYear: async (
    monthYear: string,
    category: Category,
  ): Promise<MonthSummaryData | null> => {
    const trades = getTradesForMonthYear(monthYear, category);
    if (!trades) return null;
    return calculateMonthSummary(trades);
  },

  getChartsDataForMonthYear: async (
    monthYear: string,
    category: Category,
  ): Promise<ResultsChartsData | null> => {
    const trades = getTradesForMonthYear(monthYear, category);
    if (!trades) return null;
    return calculateChartsData(trades);
  },
};
