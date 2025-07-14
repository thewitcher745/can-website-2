import React, { useState } from "react";

const tradeData = [
  {
    date: "Tuesday, April 01, 2025",
    symbol: "MKR/USDT",
    status: "Partial Targets Achieved",
    leverage: "Isolated (3.0X)",
    lev: 3,
    used_dollars: 50,
    used_percent: "5.0%",
    margin: "15%",
    type: "Short",
    last_target: 2,
    profit_percent: 35.7,
    net_profit: "1.79%",
    "1000s": 17.86,
  },
  {
    date: "Thursday, April 03, 2025",
    symbol: "QNT/USDT",
    status: "Partial Targets Achieved",
    leverage: "Isolated (3.0X)",
    lev: 3,
    used_dollars: 50,
    used_percent: "5.0%",
    margin: "15%",
    type: "Long",
    last_target: 1,
    profit_percent: 51.2,
    net_profit: "2.56%",
    "1000s": 25.59,
  },
  {
    date: "Friday, April 04, 2025",
    symbol: "BTC/USDT",
    status: "All Targets Achieved",
    leverage: "Isolated (5.0X)",
    lev: 5,
    used_dollars: 100,
    used_percent: "10.0%",
    margin: "50%",
    type: "Long",
    last_target: 3,
    profit_percent: 92.5,
    net_profit: "9.25%",
    "1000s": 92.53,
  },
  {
    date: "Sunday, April 06, 2025",
    symbol: "LINK/USDT",
    status: "Partial Targets Achieved",
    leverage: "Isolated (5.0X)",
    lev: 5,
    used_dollars: 50,
    used_percent: "5.0%",
    margin: "25%",
    type: "Long",
    last_target: 2,
    profit_percent: 148.7,
    net_profit: "7.44%",
    "1000s": 74.36,
  },
  {
    date: "Thursday, April 10, 2025",
    symbol: "ZEC/USDT",
    status: "Stopped Out",
    leverage: "Isolated (5.0X)",
    lev: 5,
    used_dollars: 100,
    used_percent: "10.0%",
    margin: "50%",
    type: "Short",
    last_target: 0,
    profit_percent: -53.6,
    net_profit: "-5.36%",
    "1000s": -53.6,
  },
  {
    date: "Thursday, April 10, 2025",
    symbol: "EOS/USDT",
    status: "Partial Targets Achieved",
    leverage: "Isolated (5.0X)",
    lev: 5,
    used_dollars: 100,
    used_percent: "10.0%",
    margin: "50%",
    type: "Long",
    last_target: 1,
    profit_percent: 54.9,
    net_profit: "5.49%",
    "1000s": 54.91,
  },
  {
    date: "Tuesday, April 15, 2025",
    symbol: "MANA/USDT",
    status: "Partial Targets Achieved",
    leverage: "Isolated (5.0X)",
    lev: 5,
    used_dollars: 50,
    used_percent: "5.0%",
    margin: "25%",
    type: "Long",
    last_target: 2,
    profit_percent: 83.1,
    net_profit: "4.16%",
    "1000s": 41.57,
  },
  {
    date: "Wednesday, April 16, 2025",
    symbol: "DUSK/USDT",
    status: "Stopped Out",
    leverage: "Isolated (5.0X)",
    lev: 5,
    used_dollars: 100,
    used_percent: "10.0%",
    margin: "50%",
    type: "Short",
    last_target: 0,
    profit_percent: -50.2,
    net_profit: "-5.02%",
    "1000s": -50.19,
  },
  {
    date: "Thursday, April 17, 2025",
    symbol: "FXS/USDT",
    status: "Stopped Out",
    leverage: "Isolated (5.0X)",
    lev: 5,
    used_dollars: 100,
    used_percent: "10.0%",
    margin: "50%",
    type: "Short",
    last_target: 0,
    profit_percent: -73.6,
    net_profit: "-7.36%",
    "1000s": -73.57,
  },
  {
    date: "Monday, April 21, 2025",
    symbol: "WOO/USDT",
    status: "Partial Targets Achieved",
    leverage: "Isolated (5.0X)",
    lev: 5,
    used_dollars: 50,
    used_percent: "5.0%",
    margin: "25%",
    type: "Long",
    last_target: 2,
    profit_percent: 71.6,
    net_profit: "3.58%",
    "1000s": 35.78,
  },
  {
    date: "Monday, April 21, 2025",
    symbol: "STG/USDT",
    status: "Partial Targets Achieved",
    leverage: "Isolated (5.0X)",
    lev: 5,
    used_dollars: 50,
    used_percent: "5.0%",
    margin: "25%",
    type: "Long",
    last_target: 1,
    profit_percent: 47.7,
    net_profit: "2.39%",
    "1000s": 23.87,
  },
  {
    date: "Monday, April 21, 2025",
    symbol: "MANTA/USDT",
    status: "Partial Targets Achieved",
    leverage: "Isolated (5.0X)",
    lev: 5,
    used_dollars: 50,
    used_percent: "5.0%",
    margin: "25%",
    type: "Long",
    last_target: 1,
    profit_percent: 55.4,
    net_profit: "2.77%",
    "1000s": 27.69,
  },
  {
    date: "Tuesday, April 22, 2025",
    symbol: "MEW/USDT",
    status: "Partial Targets Achieved",
    leverage: "Isolated (5.0X)",
    lev: 5,
    used_dollars: 50,
    used_percent: "5.0%",
    margin: "25%",
    type: "Short",
    last_target: 1,
    profit_percent: 54.1,
    net_profit: "2.70%",
    "1000s": 27.04,
  },
  {
    date: "Thursday, April 24, 2025",
    symbol: "ALPHA/USDT",
    status: "Stopped Out",
    leverage: "Isolated (5.0X)",
    lev: 5,
    used_dollars: 100,
    used_percent: "10.0%",
    margin: "50%",
    type: "Short",
    last_target: 0,
    profit_percent: -37.9,
    net_profit: "-3.79%",
    "1000s": -37.89,
  },
  {
    date: "Friday, April 25, 2025",
    symbol: "MEW/USDT",
    status: "Partial Targets Achieved",
    leverage: "Isolated (5.0X)",
    lev: 5,
    used_dollars: 50,
    used_percent: "5.0%",
    margin: "25%",
    type: "Short",
    last_target: 1,
    profit_percent: 17.6,
    net_profit: "0.88%",
    "1000s": 8.8,
  },
  {
    date: "Monday, April 28, 2025",
    symbol: "THETA/USDT",
    status: "Partial Targets Achieved",
    leverage: "Isolated (5.0X)",
    lev: 5,
    used_dollars: 50,
    used_percent: "5.0%",
    margin: "25%",
    type: "Long",
    last_target: 1,
    profit_percent: 8.6,
    net_profit: "0.43%",
    "1000s": 4.3,
  },
];

const ResultsTable: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const rowsToShow = showAll ? tradeData : tradeData.slice(0, 8);
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
    <div className="results-table-container">
      <table className="results-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Symbol</th>
            <th>Status</th>
            <th>Leverage</th>
            <th>Lev</th>
            <th>$ Used</th>
            <th>$ Used</th>
            <th>Margin</th>
            <th>Type</th>
            <th>Last Target</th>
            <th>Profit %</th>
            <th>Net Profit</th>
            <th>1000$</th>
          </tr>
        </thead>
        <tbody>
          {rowsToShow.map((trade, index) => (
            <tr key={index} className={getRowClass(trade.status)}>
              <td>{trade.date}</td>
              <td>{trade.symbol}</td>
              <td>{trade.status}</td>
              <td>{trade.leverage}</td>
              <td>{trade.lev}</td>
              <td>{trade.used_dollars}</td>
              <td>{trade.used_percent}</td>
              <td>{trade.margin}</td>
              <td>{trade.type}</td>
              <td>{trade.last_target}</td>
              <td>{trade.profit_percent}</td>
              <td>{trade.net_profit}</td>
              <td>
                {trade["1000s"] < 0
                  ? `($${Math.abs(trade["1000s"]).toFixed(2)})`
                  : `$ ${trade["1000s"].toFixed(2)}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {tradeData.length > 8 && (
        <div className="show-more-container">
          <button onClick={() => setShowAll(!showAll)} className="show-more-button">
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultsTable;
