import { tradeDataByMonth } from "@src/features/full-results/resultsTableData";

export interface Trade {
  date: string;
  symbol: string;
  profit_percent: number;
}

export interface WaterfallPoint {
  bottomPadding: number;
  idx: number;
  date: string;
  base: number;
  inc: number;
  dec: number;
  total: number;
}

export default function getTrades(monthName: string): Trade[] {
  if (monthName in tradeDataByMonth) {
    const key = monthName as keyof typeof tradeDataByMonth;
    const entries = tradeDataByMonth[key] ?? [];
    return entries.map((e) => ({
      date: e.date,
      symbol: e.symbol,
      profit_percent: e.profit_percent,
    }));
  }
  return [];
}

// Find the lowest value of an array's cumulative total
export function getLowestPoint(trades: Trade[]): any {
  let cumulative = 0;
  const cumTotal = trades.map((t) => {
    cumulative += t.profit_percent;
    return cumulative;
  });
  return Math.min(...cumTotal);
}

export function toWaterfallDataset(monthName: string): WaterfallPoint[] {
  const trades = getTrades(monthName);
  const lowestPoint = getLowestPoint(trades);
  const bottomPadding =
    lowestPoint < 0 ? Math.round(lowestPoint / 100) * 100 : 0;
  let cumulative = Math.abs(bottomPadding);

  return trades.map((t, i) => {
    const delta = t.profit_percent;
    // For positive delta: base is current cumulative and inc is delta
    // For negative delta: shift base down to cumulative + delta and make dec a positive height
    const isPos = delta >= 0;
    const base = isPos ? cumulative : cumulative + delta;
    const inc = isPos ? delta : 0;
    const dec = isPos ? 0 : -delta; // positive height for the negative bar
    cumulative += delta;
    return {
      bottomPadding,
      idx: i + 1,
      date: t.date,
      base,
      inc,
      dec,
      total: cumulative,
    };
  });
}
