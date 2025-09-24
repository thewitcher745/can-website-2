import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { buildApiUrl } from "../../../config";
import { getCoinLogoLink } from "../../../utils";

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

const TopCoinsTable = ({ className }: { className?: string }) => {
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
    {
      title: "Top Gainers",
      data: data?.top_gainers || [],
      slug: "coins/gainers",
    },
    {
      title: "Top Losers",
      data: data?.top_losers || [],
      slug: "coins/losers",
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

  const renderCaret = (change: number) => {
    const isPositive = change >= 0;
    const colorClass = isPositive ? "text-success" : "text-error";
    return (
      <div className={`h-4 w-4 ${colorClass} pr-3`}>
        {isPositive ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </div>
    );
  };

  const CoinLogo = ({ symbol }: { symbol: string }) => {
    const [logoUrl, setLogoUrl] = useState<string | null>(null);

    useEffect(() => {
      const fetchLogo = async () => {
        const data = await getCoinLogoLink(symbol);
        // Assuming the API returns an object with a 'logo' property
        if (data) {
          setLogoUrl(data);
        }
      };

      fetchLogo();
    }, [symbol]);

    if (!logoUrl) {
      return (
        <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
      );
    }

    return (
      <Image
        src={logoUrl}
        alt={`${symbol} logo`}
        width={32}
        height={32}
        className="w-8 h-8 rounded-full"
      />
    );
  };

  const renderTableRows = (coins: Coin[]) => {
    const rows = [];
    for (let i = 0; i < 5; i++) {
      const coin = coins[i];
      // Number of decimal places that the number has
      const decimalPlaces = coin.price.toString().split(".")[1]?.length || 0;

      rows.push(
        <tr key={i} className="border-b border-border h-1/5">
          {coin ? (
            <>
              <td className="px-2 py-2 w-1/2">
                <div className="flex items-center gap-3">
                  <CoinLogo symbol={coin.symbol} />
                  <div className="flex flex-col truncate">
                    <span className="truncate font-semibold text-sm">
                      {coin.name}
                    </span>
                    <span className="text-xs font-medium text-text-muted">
                      {coin.symbol}USDT
                    </span>
                  </div>
                </div>
              </td>
              <td className="opacity-80 text-md font-light px-4 py-2 w-1/4">
                {decimalPlaces > 6 ? coin.price.toFixed(6) : coin.price}
              </td>
              <td
                className={`px-4 py-2 font-bold w-1/4 ${
                  coin.change >= 0 ? "text-success" : "text-error"
                }`}
              >
                <div className="flex items-center gap-1">
                  {renderCaret(coin.change)}
                  <span className="text-sm font-semibold text-nowrap">
                    {Math.abs(coin.change).toFixed(2)} %
                  </span>
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
    <div className={`p-3 rounded-md flex flex-col ${className}`}>
      <div className="flex justify-between flex-col-reverse sm:flex-row items-center mb-4">
        <Link href={`/${tables[currentIndex].slug}`}>
          <div className="flex">
            <h3 className="text-lg font-bold underline text-text-main">
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
