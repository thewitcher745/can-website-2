import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Image from "next/image";

import { buildApiUrl } from "../../config";
import { TopCoinsTableRowPlaceholer } from "./subcomponents/loaders";
import { getCoinLogoLink } from "../../utils";

interface Loser {
  change: number;
  name: string;
  price: number;
  symbol: string;
  volume: number;
}

const TopLosersTable = ({ maxRows = 10 }: { maxRows: number }) => {
  const [losers, setLosers] = useState<Loser[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(maxRows);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = losers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(losers.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  const firstPage = () => setCurrentPage(1);
  const lastPage = () => setCurrentPage(totalPages);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(buildApiUrl(`/api/top_losers`));
        const data = await response.json();

        setLosers(data);
      } catch (error) {
        console.error("Error fetching top losers:", error);
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
      // Initial check in case the table is already scrolled on load
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

  return (
    <section
      id="top-gainers"
      className="w-full bg-background flex justify-start sm:justify-center"
    >
      <div className="max-w-6xl p-4 py-8 rounded radius-6 w-full">
        <h2 className="text-2xl font-bold mb-6 pl-4 text-text-main">
          Top Losers
        </h2>
        <div ref={tableContainerRef} className="overflow-x-auto relative">
          <table className="text-text-main w-full min-w-lg table-fixed">
            <thead>
              <tr>
                <th
                  className={`sticky bg-background left-0 px-6 py-2 text-start w-[40%] ${
                    isScrolled ? "sticky-shadow-visible" : ""
                  }`}
                >
                  Name/Symbol
                </th>
                <th className="px-6 py-4 text-start w-[20%] min-w-sm">Price</th>
                <th className="px-6 py-4 text-start w-[30%] min-w-sm">
                  Change
                </th>
                <th className="px-6 py-4 text-start w-[20%] min-w-sm">
                  Volume
                </th>
              </tr>
            </thead>
            <tbody>
              {losers.length === 0
                ? [...Array(maxRows)].map((_, i) => (
                    <TopCoinsTableRowPlaceholer key={i} />
                  ))
                : currentItems.map((coin, index) => (
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
                              {coin.symbol}USDT
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">${coin.price}</td>
                      <td className="px-6 py-4 h-full flex-col gap-2 text-error font-bold">
                        <div className="flex items-center gap-1">
                          <ChevronDown className="h-4 w-4" />
                          {coin.change}%
                        </div>
                      </td>
                      <td className="px-6 py-4 h-full">
                        {formatNumber(coin.volume)}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4 px-4 flex-col sm:flex-row">
            <div className="text-sm text-text-main my-4">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, losers.length)} of {losers.length}
              entries
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
                <ChevronRight className="h-4 w-4 text-text-main" />
              </button>
              <button
                onClick={lastPage}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-hover"
                aria-label="Last page"
              >
                <ChevronsRight className="h-4 w-4 text-text-main" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopLosersTable;
