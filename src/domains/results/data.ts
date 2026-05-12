import tradesByMonth from "./data/tradesByMonth";
import { TradeData } from "./types";

export function getAvailableMonthYears(): string[] {
  return Object.keys(tradesByMonth);
}

export function getTradesForMonthYear(monthYear: string): TradeData[] | null {
  return tradesByMonth[monthYear] || null;
}
