import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { buildApiUrl } from "../../../config";

interface Coin {
  change: number;
  name: string;
  price: number;
  symbol: string;
  volume: number;
}

interface ApiData {
  top_gainers: Coin[];
  top_losers: Coin[];
  trending: Coin[];
}

const TopCoinsTable = () => {
  const [data, setData] = useState<ApiData | null>(null);
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
        const result: ApiData = await response.json();

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
    { title: "Top Gainers", data: data?.top_gainers || [], slug: "coins/top-gainers" },
    { title: "Top Losers", data: data?.top_losers || [], slug: "coins/top-losers" },
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

  const renderCaret = (change: number) => {
    const isPositive = change >= 0;
    const colorClass = isPositive ? "text-success" : "text-danger";
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-4 w-4 ${colorClass}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        {isPositive ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 15l7-7 7 7"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        )}
      </svg>
    );
  };

  const CoinLogo = ({ symbol }: { symbol: string }) => {
    // const [logoUrl, setLogoUrl] = useState<string | null>(null);

    // useEffect(() => {
    //   const fetchLogo = async () => {
    //     const data = await getCoinLogoLink("btc");
    //     // Assuming the API returns an object with a 'logo' property
    //     if (data) {
    //       setLogoUrl(data);
    //     }
    //   };

    //   fetchLogo();
    // }, [symbol]);

    // if (!logoUrl) {
    return (
      <div className="w-6 h-6 bg-gray-700 rounded-full animate-pulse"></div>
    );
    // }

    // return (
    //   <img
    //     src={logoUrl}
    //     alt={`${symbol} logo`}
    //     className="w-6 h-6 rounded-full"
    //   />
    // );
  };

  const renderTableRows = (coins: Coin[]) => {
    const rows = [];
    for (let i = 0; i < 5; i++) {
      const coin = coins[i];
      rows.push(
        <tr key={i} className="border-b border-border h-12">
          {coin ? (
            <>
              <td className="px-4 py-2 font-bold w-1/2">
                <div className="flex items-center gap-3">
                  <CoinLogo symbol={coin.symbol} />
                  <span>{coin.name}</span>
                </div>
              </td>
              <td className="px-4 py-2 w-1/4">${coin.price}</td>
              <td
                className={`px-4 py-2 font-bold w-1/4 ${
                  coin.change >= 0 ? "text-success" : "text-error"
                }`}
              >
                <div className="flex items-center justify-end gap-1">
                  {renderCaret(coin.change)}
                  {Math.abs(coin.change).toFixed(2)}%
                </div>
              </td>
            </>
          ) : (
            <>
              <td className="px-4 py-2 w-1/2">&nbsp;</td>
              <td className="px-4 py-2 w-1/4">&nbsp;</td>
              <td className="px-4 py-2 w-1/4">&nbsp;</td>
            </>
          )}
        </tr>
      );
    }
    return rows;
  };

  return (
    <section
      id="top-coins"
      className="py-8 px-4 w-full bg-background flex justify-start sm:justify-center"
    >
      <div className="bg-surface p-4 rounded-lg w-full max-w-md mx-auto flex flex-col">
        <div className="flex justify-between flex-col-reverse sm:flex-row items-center mb-4">
          <Link href={`/${tables[currentIndex].slug}`}>
            <div className="flex">
              <h3 className="text-xl underline font-bold text-text-main">
                {tables[currentIndex].title}
              </h3>
              <ChevronRight className="h-8 w-8 text-text-muted self-end" />
            </div>
          </Link>
          <NavigationButtons className="hidden sm:block" />
        </div>
        <div className="overflow-hidden">
          {loading ? (
            <div className="w-full h-72 flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-error text-center p-4">Error: {error}</div>
          ) : (
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {tables.map((table, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <table className="w-full text-left text-text-main table-fixed">
                    <tbody>{renderTableRows(table.data)}</tbody>
                  </table>
                </div>
              ))}
            </div>
          )}
        </div>
        <NavigationButtons className="block sm:hidden self-center" />
      </div>
    </section>
  );
};

export default TopCoinsTable;
