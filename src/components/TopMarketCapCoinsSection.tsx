import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

import { buildApiUrl } from "../config";
import { getCoinLogoLink } from "../utils";
import Sparkline from "./technicals/subcomponents/Sparkline";
import { HomepageTopCoinsTableRowPlaceholer } from "./technicals/subcomponents/loaders";

interface TopCoin {
  change_24h: number;
  change_7d: number;
  name: string;
  price: number;
  symbol: string;
  volume_24h: number;
  market_cap: number;
}

const TopMarketCapCoinsSection = () => {
  const [topCoins, setTopCoins] = useState<TopCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Fetch top coins data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(buildApiUrl(`/api/top_market_cap_coins`));
        const data = await response.json();
        setTopCoins(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top coins:", error);
      }
    };
    fetchData();
  }, []);

  // Handle horizontal scroll shadow
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

  const formatPrice = (num: number) => {
    // Converts the number to a string and separates the integer part every 3 digits from the right.
    const integerPart = String(num).split(".")[0];
    const decimalPart = String(num).split(".")[1];
    return `$${integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${
      decimalPart || "00"
    }`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`;
    } else if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(2)}K`;
    }
    return `$${num.toFixed(2)}`;
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

  const renderCaret = (change: number) => {
    const isPositive = change >= 0;
    const colorClass = isPositive ? "text-success" : "text-danger";
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

  return (
    <section
      id="trending"
      className="w-full bg-background flex justify-start sm:justify-center"
    >
      <div className="2xl:max-w-[100rem] xl:max-w-7xl max-w-6xl p-4 py-8 rounded radius-6 w-full">
        <div ref={tableContainerRef} className="overflow-x-auto relative">
          <table className="text-text-main w-full min-w-lg table-fixed">
            <thead>
              <tr>
                <th
                  className={`sticky bg-background left-0 px-6 py-2 text-start w-[20%] ${
                    isScrolled ? "sticky-shadow-visible" : ""
                  }`}
                >
                  Name/Symbol
                </th>
                <th className="px-6 py-4 text-start w-[20%] min-w-sm">Price</th>
                <th className="px-6 py-4 text-start w-[30%] min-w-sm">
                  24h Change%
                </th>
                <th className="px-6 py-4 text-start w-[30%] min-w-sm hidden md:table-cell">
                  7d Change%
                </th>
                <th className="px-6 py-4 text-start w-[20%] min-w-sm hidden sm:table-cell">
                  Volume
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <HomepageTopCoinsTableRowPlaceholer key={i} />
                ))
              ) : topCoins.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <div className="text-center py-8 text-text-muted">
                      No coins found.
                    </div>
                  </td>
                </tr>
              ) : (
                topCoins.map((coin, index) => (
                  <tr key={index} className="border-b border-border">
                    <td
                      className={`sticky bg-background left-0 w-150 pl-4 py-4 ${
                        isScrolled ? "sticky-shadow-visible" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CoinLogo symbol={coin.symbol} />
                        <div className="flex flex-col truncate">
                          <span className="truncate font-semibold text-sm">
                            {coin.name}
                          </span>
                          <span className="text-xs font-medium text-text-muted">
                            {coin.symbol.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{formatPrice(coin.price)}</td>
                    <td
                      className={`px-6 py-4 h-full flex-col gap-2 ${
                        coin.change_24h >= 0 ? "text-success" : "text-error"
                      } font-bold`}
                    >
                      <div className="flex items-center gap-1">
                        {renderCaret(coin.change_24h)}
                        {coin.change_24h.toFixed(2)}%
                      </div>
                    </td>
                    <td
                      className={`px-6 py-4 h-full flex-col gap-2 ${
                        coin.change_7d >= 0 ? "text-success" : "text-error"
                      } font-bold hidden md:table-cell`}
                    >
                      <div className="flex items-center gap-1">
                        {renderCaret(coin.change_7d)}
                        {coin.change_7d.toFixed(2)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 h-full hidden sm:table-cell">
                      {formatNumber(coin.volume_24h)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TopMarketCapCoinsSection;
