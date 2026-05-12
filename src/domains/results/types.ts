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

export interface MonthYearStateData {
  allYears: string[];
  setAllYears: Dispatch<SetStateAction<string[]>>;
  selectedYear: string;
  setSelectedYear: Dispatch<SetStateAction<string>>;
  allMonths: {
    label: string;
    value: string;
  }[];
  setAllMonths: Dispatch<
    SetStateAction<
      {
        label: string;
        value: string;
      }[]
    >
  >;
  currentMonthYear: string;
  setCurrentMonthYear: Dispatch<SetStateAction<string>>;
}
