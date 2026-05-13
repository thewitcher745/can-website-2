import { Dispatch, SetStateAction } from "react";

export interface TradeData {
  date: string;
  symbol: string;
  status: string;
  leverage: string;
  usedDollars: number;
  type: "Long" | "Short";
  lastTarget: number;
  profitPercent: number;
  netProfitPercentString: string;
}

export interface MonthSummaryData {
  grossProfit: number;
  winrate: number;
  drawdown: number;
}

export interface ResultsChartsData {
  longTradesPercentage: number;
  winrate: number;
  perTargetRatio: {
    targetId: number;
    targetPercentage: number; // What ratio of all trades have this targetId as their lastTarget
  }[];
  profitPercents: number[]; // For the waterfall chart
  cumulativeProfitPercents: number[];
}

//
export interface MonthOptionData {
  label: string;
  value: string;
}

export interface MonthYearStateData {
  years: string[];
  months: MonthOptionData[];

  selectedYear: string;
  setSelectedYear: Dispatch<SetStateAction<string>>;

  currentMonthYear: string;
  setCurrentMonthYear: Dispatch<SetStateAction<string>>;
}

export type Category = "insights" | "algorithm";

export interface CategoryStateData {
  category: Category;
  setCategory: Dispatch<SetStateAction<Category>>;
}
