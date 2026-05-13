import tradesByMonth from "./data/tradesByMonth";
import { Category, TradeData } from "./types";

export function getCategoriesForMonthYear(monthYear: string): Category[] {
  return Object.keys(tradesByMonth[monthYear]) as Category[];
}

export function getAvailableMonthYears(): string[] {
  return Object.keys(tradesByMonth);
}

export function getTradesForMonthYear(
  monthYear: string,
  category: Category,
): TradeData[] | null {
  return tradesByMonth[monthYear][category] || null;
}
