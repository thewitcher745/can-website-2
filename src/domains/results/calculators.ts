import { TradeData, MonthSummaryData, ResultsChartsData } from "./types";

/**
 * Calculates high‑level performance metrics for a set of trades within a month.
 *
 * Metrics produced:
 * - **grossProfit**: Sum of `profitPercent` across all trades.
 * - **winrate**: Percentage of trades that closed with positive profit.
 * - **drawdown**: Maximum peak‑to‑trough decline in the cumulative profit curve.
 *
 * Drawdown is computed by tracking the running cumulative profit, recording
 * the highest peak reached, and measuring the largest drop from that peak.
 *
 * @param trades - List of trade records for the month.
 *
 * @returns An object containing:
 * - `grossProfit`: Total profit percentage across all trades.
 * - `winrate`: Percentage of profitable trades (0–100).
 * - `drawdown`: Maximum drawdown in profit percentage terms.
 *
 */
export function calculateMonthSummary(trades: TradeData[]): MonthSummaryData {
  if (!trades.length) {
    return { grossProfit: 0, winrate: 0, drawdown: 0 };
  }

  const grossProfit = trades.reduce((sum, t) => sum + t.profitPercent, 0);

  const wins = trades.filter((t) => t.profitPercent > 0).length;
  const winrate = (wins / trades.length) * 100;

  let cumulative = 0;
  let peak = 0;
  let maxDrawdown = 0;

  for (const trade of trades) {
    cumulative += trade.profitPercent;

    if (cumulative > peak) {
      peak = cumulative;
    }

    const drawdown = peak - cumulative;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  }

  return {
    grossProfit,
    winrate,
    drawdown: maxDrawdown,
  };
}

/**
 * Computes datasets used for visualizing trading performance charts.
 *
 * Metrics produced:
 * - **longTradesRatio**: Percentage of trades that are `Long`.
 * - **winrate**: Percentage of profitable trades.
 * - **perTargetRatio**: Distribution of the `lastTarget` reached across trades.
 * - **profitPercents**: Raw list of trade profit percentages (for waterfall charts).
 * - **cumulativeProfitPercents**: Running cumulative profit series used for
 *   equity curve / cumulative performance charts.
 *
 * `perTargetRatio` measures how frequently each target level appears as the
 * final achieved target in the trade dataset.
 *
 * @param trades - List of trade records used to generate chart datasets.
 *
 * @returns Chart‑ready statistics including trade direction ratios, winrate,
 * target distribution, individual trade profits, and cumulative profit curve.
 *
 */
export function calculateChartsData(trades: TradeData[]): ResultsChartsData {
  if (!trades.length) {
    return {
      longTradesPercentage: 0,
      winrate: 0,
      perTargetRatio: [],
      profitPercents: [],
      cumulativeProfitPercents: [],
    };
  }

  const nTotalTrades = trades.length;

  const stats = trades.reduce<{
    wins: number;
    longTrades: TradeData[];
    profitPercents: number[];
    lastCumulativeProfitValue: number;
    cumulativeProfitPercents: number[];
    targetCounts: Map<number, number>;
  }>(
    (acc, trade) => {
      if (trade.profitPercent > 0) acc.wins++;
      if (trade.type === "Long") acc.longTrades.push(trade);
      acc.profitPercents.push(trade.profitPercent);

      acc.lastCumulativeProfitValue += trade.profitPercent;
      acc.cumulativeProfitPercents.push(acc.lastCumulativeProfitValue);

      const target = trade.lastTarget;
      acc.targetCounts.set(target, (acc.targetCounts.get(target) ?? 0) + 1);

      return acc;
    },
    {
      wins: 0,
      longTrades: [],
      profitPercents: [],
      lastCumulativeProfitValue: 0,
      cumulativeProfitPercents: [],
      targetCounts: new Map(),
    },
  );

  const nLongTrades = stats.longTrades.length;
  const longTradesPercentage = (nLongTrades / nTotalTrades) * 100;

  const winrate = (stats.wins / nTotalTrades) * 100;

  const targetCounts = stats.targetCounts;

  const perTargetRatio = Array.from(targetCounts.entries()).map(
    ([targetId, count]) => ({
      targetId,
      targetPercentage: (count / nTotalTrades) * 100,
    }),
  );

  const profitPercents = stats.profitPercents;

  const cumulativeProfitPercents = stats.cumulativeProfitPercents;

  return {
    longTradesPercentage,
    winrate,
    perTargetRatio,
    profitPercents,
    cumulativeProfitPercents,
  };
}
