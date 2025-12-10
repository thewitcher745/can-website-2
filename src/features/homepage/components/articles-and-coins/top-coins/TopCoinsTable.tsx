import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { buildApiUrl } from "@src/config";
import { TopCoin, TopCoinLists } from "@src/types";
import TableRow from "./TableRow";

const TopCoinsTable = ({ className }: { className?: string }) => {
  const [data, setData] = useState<TopCoinLists | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(buildApiUrl(`/api/coins_tables_summary`));
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result: TopCoinLists = await response.json();

        // The API provides top_losers change as a positive number, convert it to negative
        result.top_losers = result.top_losers.map((coin) => ({
          ...coin,
          change: -Math.abs(coin.change),
        }));

        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const tables = [
    {
      title: "Top Gainers",
      data: data?.top_gainers || [],
      slug: "coins/gainers_losers",
    },
    {
      title: "Top Losers",
      data: data?.top_losers || [],
      slug: "coins/gainers_losers",
    },
    { title: "Trending", data: data?.trending || [], slug: "coins/trending" },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tables.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? tables.length - 1 : prevIndex - 1
    );
  };

  const NavigationButtons = ({ className }: { className?: string }) => {
    return (
      <div className={`flex-nowrap ${className}`}>
        <button
          onClick={prevSlide}
          className="p-3 rounded-full hover:bg-surface-hover cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5 text-text-main" />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 rounded-full hover:bg-surface-hover cursor-pointer"
        >
          <ChevronRight className="h-5 w-5 text-text-main" />
        </button>
      </div>
    );
  };

  const renderTableRows = (coins: TopCoin[]) => {
    const rows = [];
    for (let i = 0; i < 5; i++) {
      const coin = coins[i];

      rows.push(<TableRow coin={coin} />);
    }
    return rows;
  };

  return (
    <div className={`px-3 rounded-md flex flex-col ${className}`}>
      <div className="flex justify-between flex-col-reverse sm:flex-row items-center mb-4">
        <Link href={`/${tables[currentIndex].slug}`}>
          <div className="flex">
            <h3 className="text-lg font-bold underline text-text-main title-hover">
              {tables[currentIndex].title}
            </h3>
            <ChevronRight className="h-8 w-8 text-text-muted self-end" />
          </div>
        </Link>
        <NavigationButtons className="hidden sm:block" />
      </div>
      <div className="overflow-hidden h-full">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="w-full h-full text-error text-center p-4">
            Error: {error}
          </div>
        ) : (
          <div
            className="h-full flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {tables.map((table, index) => (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 overflow-x-hidden"
              >
                <table className="h-full w-full text-left text-text-main table-fixed">
                  <tbody>{renderTableRows(table.data)}</tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>
      <NavigationButtons className="block sm:hidden self-center" />
    </div>
  );
};

export default TopCoinsTable;
