import { useEffect, useState } from "react";

import ChartItem from "./ChartItem";
import { buildApiUrl } from "@src/config";
import { ChartItemProps } from "@src/types";

// A set of 10 colorful barColors to use for each chartItem
const barColors = [
  "#f9a641",
  "#b774e7",
  "#33a8a8",
  "#7a7a7b",
  "#f3c840",
  "#dc1fff",
  "#5693d4",
  "#ccb875",
  "#fc2030",
  "#2e56b8",
];

const TopMarketCapChart = () => {
  const [items, setItems] = useState<ChartItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const highestMarketCap = items.slice(1, 10).reduce((max, item) => {
    return Math.max(max, item.market_cap);
  }, -Infinity);

  const scalingPercentage = 65;
  const flatPercentage = 10;

  const calcWidthPercentage = (marketCap: number) => {
    return (marketCap / highestMarketCap) * scalingPercentage + flatPercentage;
  };

  useEffect(() => {
    fetch(buildApiUrl(`/api/top_market_cap_coins`))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch top coins.");
        return res.json();
      })
      .then((response) => {
        setItems(response);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {items.length > 0 ? (
        <ul className="flex flex-col items-center sm:block py-6">
          <ChartItem
            key={"BTC"}
            chartItem={items[0]}
            barColor={barColors[0]}
            widthPercentage={100}
          />
          {items.slice(1, 10).map((item, index) => (
            <ChartItem
              key={item.symbol}
              chartItem={item}
              barColor={barColors[(index + 1) % barColors.length]}
              widthPercentage={calcWidthPercentage(item.market_cap)}
            />
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </>
  );
};

export default TopMarketCapChart;
