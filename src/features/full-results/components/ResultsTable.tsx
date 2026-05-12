import { useState } from "react";

import { useMonthYear } from "@src/domains/results/context";
import { useTradesForMonthYear } from "@src/domains/results/hooks";
import GlassCard from "@src/shared/ui/GlassCard";
import Logo from "@src/shared/ui/Logo";

const ResultsTable = () => {
  const { currentMonthYear: monthYear } = useMonthYear();

  const [showAll, setShowAll] = useState(false);

  const { data, loading, error } = useTradesForMonthYear(monthYear);

  const trades = data || [];
  const rowsToShow = showAll ? trades : trades.slice(0, 8);

  const getStatusStyles = (status: string) => {
    if (status === "Stopped Out") {
      return "bg-red-500/60";
    }
    if (
      status === "Partial Targets Achieved" ||
      status === "All Targets Achieved"
    ) {
      return "bg-green-500/60";
    }
    return "bg-gray-500/60";
  };

  const getProfitColor = (value: number) => {
    return value > 0 ? "text-green-500" : "text-gray-400";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <p className="text-red-400">Error loading trades</p>
      </div>
    );
  }

  return (
    <>
      <GlassCard className="overflow-x-auto my-8 rounded-lg">
        <table className="w-full border-collapse min-w-[1200px] text-white">
          <thead>
            <tr className="bg-[#1a1a1a]">
              <th className="px-4 py-3 text-center font-bold text-gray-50 border-b border-gray-700">
                Date
              </th>
              <th className="px-4 py-3 text-center font-bold text-gray-50 border-b border-gray-700">
                Symbol
              </th>
              <th className="px-4 py-3 text-center font-bold text-gray-50 border-b border-gray-700">
                Status
              </th>
              <th className="px-4 py-3 text-center font-bold text-gray-50 border-b border-gray-700">
                Leverage
              </th>
              <th className="px-4 py-3 text-center font-bold text-gray-50 border-b border-gray-700">
                $ Used
              </th>
              <th className="px-4 py-3 text-center font-bold text-gray-50 border-b border-gray-700">
                Type
              </th>
              <th className="px-4 py-3 text-center font-bold text-gray-50 border-b border-gray-700">
                Last Target
              </th>
              <th className="px-4 py-3 text-center font-bold text-gray-50 border-b border-gray-700">
                Profit %
              </th>
              <th className="px-4 py-3 text-center font-bold text-gray-50 border-b border-gray-700">
                Net Profit
              </th>
            </tr>
          </thead>
          <tbody>
            {rowsToShow.map((trade, index) => (
              <tr key={index} className="hover:bg-[#3a3a3a] transition-colors">
                <td className="px-4 py-3 text-center border-b border-gray-700">
                  {trade.date}
                </td>
                <td className="px-4 py-3 border-b border-gray-700">
                  <div className="flex gap-2 items-center justify-center">
                    <Logo
                      symbol={trade.symbol}
                      fixedLogoUrl="/images/logos/default.png"
                    />
                    {trade.symbol}/USDT
                  </div>
                </td>
                <td className="px-4 py-3 border-b border-gray-700">
                  <div className="w-full flex justify-center">
                    <span
                      className={`inline-block text-nowrap rounded-full py-1 px-3 text-xs font-medium text-text-main ${getStatusStyles(
                        trade.status,
                      )}`}
                    >
                      {trade.status}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 border-b border-gray-700">
                  <div className="w-full flex justify-center">
                    <span className="inline-block text-nowrap rounded-full py-1 px-3 text-sm font-medium text-text-main">
                      {trade.leverage}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center border-b border-gray-700">
                  {trade.usedDollars}
                </td>
                <td className="px-4 py-3 text-center border-b border-gray-700">
                  {trade.type}
                </td>
                <td className="px-4 py-3 text-center border-b border-gray-700">
                  {trade.lastTarget}
                </td>
                <td className="px-4 py-3 text-center border-b text-lg font-bold border-gray-700">
                  <span className={getProfitColor(trade.profitPercent)}>
                    {trade.profitPercent}%
                  </span>
                </td>
                <td className="px-4 py-3 text-center border-b border-gray-700">
                  <span
                    className={getProfitColor(
                      parseFloat(trade.netProfitPercentString),
                    )}
                  >
                    {trade.netProfitPercentString}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>

      {trades.length > 8 && (
        <div className="text-center mt-5">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-primary hover:bg-primary-hover text-white border-none px-5 py-2.5 text-base rounded-md cursor-pointer transition-colors duration-300"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </>
  );
};

export default ResultsTable;
