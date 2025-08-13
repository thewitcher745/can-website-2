import React, { useState, useEffect, useRef } from "react";
import { buildApiUrl } from "../../config";

interface TrendingCoin {
  change_24h: string;
  change_30d: string;
  change_7d: string;
  market_cap: string;
  name: string;
  price: string;
  symbol: string;
  volume_24h: string;
}

const TrendingCoinsTable = () => {
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(buildApiUrl(`/api/trending`));
        const data = await response.json();
        setTrendingCoins(data);
      } catch (error) {
        console.error("Error fetching trending coins:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const tableContainer = tableContainerRef.current;

    const handleScroll = () => {
      if (tableContainer) {
        setIsScrolled(tableContainer.scrollLeft > 0);
      }
    };

    if (tableContainer) {
      tableContainer.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (tableContainer) {
        tableContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const formatNumber = (num: string) => {
    // Remove any non-numeric characters except decimal point and minus sign
    const number = parseFloat(num.replace(/[^0-9.-]+/g, ""));
    if (isNaN(number)) return num;

    if (number >= 1000000000) {
      return `$${(number / 1000000000).toFixed(2)}B`;
    } else if (number >= 1000000) {
      return `$${(number / 1000000).toFixed(2)}M`;
    } else if (number >= 1000) {
      return `$${(number / 1000).toFixed(2)}K`;
    }
    return `$${number.toFixed(2)}`;
  };

  const getChangeColor = (change: string) => {
    const value = parseFloat(change);
    if (isNaN(value)) return "text-text-main";
    return value >= 0 ? "text-success" : "text-error";
  };

  const renderChangeIcon = (change: string) => {
    const value = parseFloat(change);
    if (isNaN(value)) return null;

    return value >= 0 ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    );
  };

  return (
    <section
      id="trending-coins"
      className="py-8 w-full bg-background flex justify-start sm:justify-center"
    >
      <div className="max-w-[1500px] bg-surface p-4 py-8 rounded radius-6 w-full">
        <h2 className="text-2xl font-bold mb-6 pl-4 text-text-main">
          Trending Coins
        </h2>
        <div ref={tableContainerRef} className="overflow-x-auto relative">
          <table className="text-text-main w-full table-auto">
            <thead>
              <tr>
                <th
                  className={`sticky left-0 bg-surface px-6 py-2 text-start ${
                    isScrolled ? "sticky-shadow-visible" : ""
                  }`}
                >
                  Name/Symbol
                </th>
                <th className="px-4 py-2 text-start">Price</th>
                <th className="px-4 py-2 text-start">24h</th>
                <th className="px-4 py-2 text-start">7d</th>
                <th className="px-4 py-2 text-start">30d</th>
                <th className="px-4 py-2 text-start">Market Cap</th>
                <th className="px-4 py-2 text-start">Volume (24h)</th>
              </tr>
            </thead>
            <tbody>
              {trendingCoins.map((coin, index) => (
                <tr
                  key={index}
                  className="border-b border-border hover:bg-surface-hover"
                >
                  <td
                    className={`sticky left-0 bg-surface px-6 py-4 ${
                      isScrolled ? "sticky-shadow-visible" : ""
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start">
                      <span className="text-text-main pr-2">{coin.name}</span>
                      <span className="text-secondary-light opacity-50 font-bold">
                        {coin.symbol}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">${coin.price}</td>
                  <td
                    className={`px-4 py-4 whitespace-nowrap ${getChangeColor(
                      coin.change_24h
                    )}`}
                  >
                    <div className="flex items-center gap-1">
                      {renderChangeIcon(coin.change_24h)}
                      {coin.change_24h}
                    </div>
                  </td>
                  <td
                    className={`px-4 py-4 whitespace-nowrap ${getChangeColor(
                      coin.change_7d
                    )}`}
                  >
                    <div className="flex items-center gap-1">
                      {renderChangeIcon(coin.change_7d)}
                      {coin.change_7d}
                    </div>
                  </td>
                  <td
                    className={`px-4 py-4 whitespace-nowrap ${getChangeColor(
                      coin.change_30d
                    )}`}
                  >
                    <div className="flex items-center gap-1">
                      {renderChangeIcon(coin.change_30d)}
                      {coin.change_30d}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {formatNumber(coin.market_cap)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {formatNumber(coin.volume_24h)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TrendingCoinsTable;
