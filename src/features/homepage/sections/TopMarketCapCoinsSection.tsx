import React, { useState, useEffect, useRef, useMemo } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

import { buildApiUrl } from "@src/config";
import { getCoinLogoLink, reduceNumber, formatPrice } from "@src/utils";
import { HomepageTopCoinsTableRowPlaceholder } from "@src/shared/ui/loaders";
import { TopMarketCapCoin } from "@src/types";
import Logo from "@src/shared/ui/Logo";

const TopMarketCapCoinsSection = () => {
  const [topCoins, setTopCoins] = useState<TopMarketCapCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [sortBy, setSortBy] = useState<keyof TopMarketCapCoin>("market_cap");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const handleHeaderClick = (column: keyof TopMarketCapCoin) => {
    if (sortBy === column) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortDir("desc");
    }
  };

  // Fetch top coins data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(buildApiUrl(`/api/top_market_cap_coins`));
        const data = await response.json();
        setTopCoins(data);
      } catch (error) {
        console.error("Error fetching top coins:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sortedCoins = useMemo(() => {
    const coins = [...topCoins];
    if (coins.length === 0) return coins;
    coins.sort((a, b) => {
      const aVal = a[sortBy] as string | number;
      const bVal = b[sortBy] as string | number;
      let cmp = 0;
      if (typeof aVal === "string" && typeof bVal === "string") {
        cmp = aVal.localeCompare(bVal);
      } else {
        const aNum = Number(aVal);
        const bNum = Number(bVal);
        cmp = aNum === bNum ? 0 : aNum < bNum ? -1 : 1;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return coins;
  }, [topCoins, sortBy, sortDir]);

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

  return (
    <section
      id="trending"
      className="w-full bg-background flex justify-start sm:justify-center"
    >
      <div className="max-w-custom p-4 py-8 rounded radius-6 w-full">
        <div ref={tableContainerRef} className="overflow-x-auto relative">
          <table className="text-text-main w-full min-w-lg table-fixed">
            <thead>
              <tr>
                <th
                  className={`sticky bg-background left-0 px-6 py-2 text-start w-[20%] ${
                    isScrolled ? "sticky-shadow-visible" : ""
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <span
                      className="text-text-main py-2 pl-2 cursor-pointer"
                      onClick={() => handleHeaderClick("name")}
                    >
                      Name/Symbol
                    </span>
                    {sortBy === "name" && sortDir === "asc" ? (
                      <ChevronUp />
                    ) : sortBy === "name" && sortDir === "desc" ? (
                      <ChevronDown />
                    ) : (
                      <></>
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-start w-[20%] min-w-sm">
                  <div className="flex items-center gap-1">
                    <span
                      className="text-text-main py-2 pl-2 cursor-pointer"
                      onClick={() => handleHeaderClick("price")}
                    >
                      Price
                    </span>
                    {sortBy === "price" && sortDir === "asc" ? (
                      <ChevronUp />
                    ) : sortBy === "price" && sortDir === "desc" ? (
                      <ChevronDown />
                    ) : (
                      <></>
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-start w-[20%] min-w-sm hidden md:table-cell">
                  <div className="flex items-center gap-1">
                    <span
                      className="text-text-main py-2 pl-2 cursor-pointer"
                      onClick={() => handleHeaderClick("market_cap")}
                    >
                      Market Cap
                    </span>
                    {sortBy === "market_cap" && sortDir === "asc" ? (
                      <ChevronUp />
                    ) : sortBy === "market_cap" && sortDir === "desc" ? (
                      <ChevronDown />
                    ) : (
                      <></>
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-start w-[30%] min-w-sm">
                  <div className="flex items-center gap-1">
                    <span
                      className="text-text-main py-2 pl-2 cursor-pointer"
                      onClick={() => handleHeaderClick("change_24h")}
                    >
                      24h Change%
                    </span>
                    {sortBy === "change_24h" && sortDir === "asc" ? (
                      <ChevronUp />
                    ) : sortBy === "change_24h" && sortDir === "desc" ? (
                      <ChevronDown />
                    ) : (
                      <></>
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-start w-[30%] min-w-sm hidden md:table-cell">
                  <div className="flex items-center gap-1">
                    <span
                      className="text-text-main py-2 pl-2 cursor-pointer"
                      onClick={() => handleHeaderClick("change_7d")}
                    >
                      7d Change%
                    </span>
                    {sortBy === "change_7d" && sortDir === "asc" ? (
                      <ChevronUp />
                    ) : sortBy === "change_7d" && sortDir === "desc" ? (
                      <ChevronDown />
                    ) : (
                      <></>
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-start w-[20%] min-w-sm hidden sm:table-cell">
                  <div className="flex items-center gap-1">
                    <span
                      className="text-text-main py-2 pl-2 cursor-pointer"
                      onClick={() => handleHeaderClick("volume_24h")}
                    >
                      Volume
                    </span>
                    {sortBy === "volume_24h" && sortDir === "asc" ? (
                      <ChevronUp />
                    ) : sortBy === "volume_24h" && sortDir === "desc" ? (
                      <ChevronDown />
                    ) : (
                      <></>
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <HomepageTopCoinsTableRowPlaceholder key={i} />
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
                sortedCoins.map((coin, index) => (
                  <tr key={index} className="border-b border-border">
                    <td
                      className={`sticky bg-background left-0 w-150 pl-4 py-4 ${
                        isScrolled ? "sticky-shadow-visible" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Logo symbol={coin.symbol} size="12" padding="1" />
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
                    <td className="px-6 py-4 hidden md:table-cell">
                      {reduceNumber(coin.market_cap)}
                    </td>
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
                      {reduceNumber(coin.volume_24h)}
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
