import React, { useState, useEffect, useRef } from "react";
import { buildApiUrl } from "../../config";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface TrendingCoin {
  change_24h: number;
  change_30d: number;
  change_7d: number;
  market_cap: number;
  name: string;
  price: number;
  symbol: string;
  volume_24h: number;
}

const TrendingCoinsTable = () => {
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Calculate current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = trendingCoins.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(trendingCoins.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Go to first page
  const firstPage = () => {
    setCurrentPage(1);
  };

  // Go to last page
  const lastPage = () => {
    setCurrentPage(totalPages);
  };

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

  const getChangeColor = (change: number) => {
    return change >= 0 ? "text-success" : "text-error";
  };

  const renderChangeIcon = (change: number) => {
    return change >= 0 ? (
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
              {currentItems.map((coin, index) => (
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
                      {coin.change_24h}%
                    </div>
                  </td>
                  <td
                    className={`px-4 py-4 whitespace-nowrap ${getChangeColor(
                      coin.change_7d
                    )}`}
                  >
                    <div className="flex items-center gap-1">
                      {renderChangeIcon(coin.change_7d)}
                      {coin.change_7d}%
                    </div>
                  </td>
                  <td
                    className={`px-4 py-4 whitespace-nowrap ${getChangeColor(
                      coin.change_30d
                    )}`}
                  >
                    <div className="flex items-center gap-1">
                      {renderChangeIcon(coin.change_30d)}
                      {coin.change_30d}%
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4 px-4 flex-col sm:flex-row">
            <div className="text-sm text-text-main my-2">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, trendingCoins.length)} of{" "}
              {trendingCoins.length} entries
            </div>
            <div className="flex items-center justify-center sm:justify-end flex-wrap gap-2">
              <button
                onClick={firstPage}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-hover"
                aria-label="First page"
              >
                <ChevronsLeft className="h-4 w-4 text-text-main" />
              </button>
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-hover"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4 text-text-main" />
              </button>

              {/* Page numbers */}
              <div className="flex gap-1">
                {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => paginate(pageNum)}
                      className={`w-8 h-8 rounded-md flex items-center text-text-main justify-center ${
                        currentPage === pageNum
                          ? "bg-primary text-white"
                          : "border border-border hover:bg-surface-hover"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <span className="px-2 text-text-main flex items-center">
                    ...
                  </span>
                )}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <button
                    onClick={() => paginate(totalPages)}
                    className={`w-8 h-8 rounded-md text-text-main flex items-center justify-center ${
                      currentPage === totalPages
                        ? "bg-primary text-white"
                        : "border border-border hover:bg-surface-hover"
                    }`}
                  >
                    {totalPages}
                  </button>
                )}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-hover"
                aria-label="Next page"
              >
                <ChevronRight className="text-text-main h-4 w-4" />
              </button>
              <button
                onClick={lastPage}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-hover"
                aria-label="Last page"
              >
                <ChevronsRight className="text-text-main h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingCoinsTable;
