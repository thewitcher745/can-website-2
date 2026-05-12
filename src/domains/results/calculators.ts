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

  const total = trades.length;

  const longTrades = trades.filter((t) => t.type === "Long").length;
  const longTradesPercentage = (longTrades / total) * 100;

  const wins = trades.filter((t) => t.profitPercent > 0).length;
  const winrate = (wins / total) * 100;

  const targetCounts = new Map<number, number>();

  for (const trade of trades) {
    const target = trade.lastTarget;
    targetCounts.set(target, (targetCounts.get(target) ?? 0) + 1);
  }

  const perTargetRatio = Array.from(targetCounts.entries()).map(
    ([targetId, count]) => ({
      targetId,
      targetPercentage: (count / total) * 100,
    }),
  );

  const profitPercents = trades.map((t) => t.profitPercent);

  const cumulativeProfitPercents: number[] = [];
  let cumulative = 0;

  for (const p of profitPercents) {
    cumulative += p;
    cumulativeProfitPercents.push(cumulative);
  }

  return {
    longTradesPercentage,
    winrate,
    perTargetRatio,
    profitPercents,
    cumulativeProfitPercents,
  };
}
