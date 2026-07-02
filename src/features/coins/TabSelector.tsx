import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const TabSelector = ({
  activeTab,
  className,
}: {
  activeTab: string;
  className?: string;
}) => {
  const TabLink = ({
    tabId,
    tabName,
    href,
  }: {
    tabId: string;
    tabName: string;
    href: string;
  }) => {
    return (
      <Link href={href} className="flex-1 min-w-0">
        <div
          className={`py-2 h-full flex items-center justify-center text-text-muted transition duration-200 ${
            activeTab === tabId ? "bg-white" : ""
          }`}
        >
          <span className="text-center text-xs sm:text-sm md:text-base px-1 sm:px-2 whitespace-nowrap">
            {tabName}
          </span>
        </div>
      </Link>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex max-w-xl mx-auto bg-background w-full">
        <div className="flex w-full divide-x divide-text-muted text-text-main border border-text-muted">
          <TabLink tabId="overview" tabName="Overview" href="/coins/overview" />
          <TabLink tabId="trending" tabName="Trending" href="/coins/trending" />
          <TabLink
            tabId="gainers_losers"
            tabName="Gainers/Losers"
            href="/coins/gainers_losers"
          />
        </div>
      </div>
    </div>
  );
};

export default TabSelector;
