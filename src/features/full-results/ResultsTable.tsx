import React, { useState } from "react";
import { tradeDataByMonth } from "./resultsTableData";
import { ResultsMonthData } from "@src/types";

type ResultsTableProps = {
  selectedMonth: string;
};

const ResultsTable = ({ selectedMonth }: ResultsTableProps) => {
  const [showAll, setShowAll] = useState(false);
  // Check if selectedMonth exists in tradeDataByMonth
  const monthData: ResultsMonthData[] =
    tradeDataByMonth[selectedMonth as keyof typeof tradeDataByMonth] ?? [];

  const rowsToShow = showAll ? monthData : monthData.slice(0, 8);
  const getRowClass = (status: string) => {
    if (status === "Stopped Out") {
      return "stopped-out";
    }
    if (
      status === "Partial Targets Achieved" ||
      status === "All Targets Achieved"
    ) {
      return "targets-achieved";
    }
    return "";
  };

  return (
    <>
      <div className="results-table-container">
        <table className="results-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Symbol</th>
              <th>Status</th>
              <th>Leverage</th>
              <th>$ Used</th>
              <th>Type</th>
              <th>Last Target</th>
              <th>Profit %</th>
              <th>Net Profit</th>
            </tr>
          </thead>
          <tbody>
            {rowsToShow.map((trade, index) => (
              <tr key={index} className={getRowClass(trade.status)}>
                <td>{trade.date}</td>
                <td>{trade.symbol}</td>
                <td>{trade.status}</td>
                <td>{trade.leverage}</td>
                <td>{trade.used_dollars}</td>
                <td>{trade.type}</td>
                <td>{trade.last_target}</td>
                <td>{trade.profit_percent}</td>
                <td>{trade.net_profit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {tradeDataByMonth[selectedMonth as keyof typeof tradeDataByMonth]
        ?.length >= 8 && (
        <div className="show-more-container">
          <button
            onClick={() => setShowAll(!showAll)}
            className="show-more-button"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </>
  );
};

export default ResultsTable;
