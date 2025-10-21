import tradeDataByMonthRaw from "@features/full-results/resultsTableData.json";

export interface Trade {
  date: string;
  symbol: string;
  profit_percent: number;
}

export interface WaterfallPoint {
  idx: number;
  date: string;
  base: number;
  inc: number;
  dec: number;
  total: number;
}

// Type the JSON import to allow string indexing
const tradeDataByMonth = tradeDataByMonthRaw as unknown as Record<
  string,
  Trade[]
>;

export default function getTrades(monthName: string): Trade[] {
  return tradeDataByMonth[monthName] ?? [];
}

export function toWaterfallDataset(monthName: string): WaterfallPoint[] {
  const trades = getTrades(monthName);
  let cumulative = 0;
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
      idx: i + 1,
      date: t.date,
      base,
      inc,
      dec,
      total: cumulative,
    };
  });
}
