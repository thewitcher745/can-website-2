import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { TopCoinsListsWidget, WidgetTopCoin } from "@src/domains/coins/types";
import TableRow from "./TableRow";
import { useTopCoinsListsWidget } from "@src/domains/coins/hooks";
import { GenericLoader } from "@src/shared/ui/loaders";
import GenericError from "@src/shared/ui/GenericError";

const N_COINS = 5;
const N_TABLES = 3;

const TopCoinsWidget = ({ className }: { className?: string }) => {
  const { data, loading, error } = useTopCoinsListsWidget();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % N_TABLES);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? N_TABLES - 1 : prevIndex - 1,
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

  const renderTableRows = (coins: WidgetTopCoin[]) => {
    const rows = [] as React.ReactNode[];
    if (loading || error || !coins) {
      for (let i = 0; i < N_COINS; i++) {
        rows.push(<TableRow placeholder i={i} />);
      }
    } else {
      for (let i = 0; i < N_COINS; i++) {
        const coin = coins[i];

        rows.push(<TableRow coin={coin} i={i} />);
      }
    }
    return rows;
  };

  const renderContent = (data: TopCoinsListsWidget) => {
    const tables = [
      {
        title: "Top Gainers",
        data: data?.topGainers || [],
        slug: "coins/gainers_losers",
      },
      {
        title: "Top Losers",
        data:
          data?.topLosers?.map((item) => ({
            ...item,
            change: -Math.abs(item.change),
          })) || [], // Make sure the topLosers have negative change values
        slug: "coins/gainers_losers",
      },
      { title: "Trending", data: data?.trending || [], slug: "coins/trending" },
    ];

    return (
      <div className={`px-3 rounded-md flex flex-col h-full ${className}`}>
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
        </div>
        <NavigationButtons className="block sm:hidden self-center" />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="relative">
        {/* Blurred skeleton */}
        <div className="blur-sm pointer-events-none h-full animate-pulse">
          {renderContent({
            topGainers: [],
            topLosers: [],
            trending: [],
          })}
        </div>

        {/* Loader overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <GenericLoader />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="relative">
        {/* Blurred skeleton */}
        <div className="blur-sm pointer-events-none h-full">
          {renderContent({
            topGainers: [],
            topLosers: [],
            trending: [],
          })}
        </div>

        {/* Loader overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <GenericError message="Couldn't get top coins. Try again later!" />
        </div>
      </div>
    );
  }

  return renderContent(data);
};

export default TopCoinsWidget;
