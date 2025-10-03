import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const TabSelector = ({
  activeTab,
  className,
}: {
  activeTab: string;
  className: string;
}) => {
  const TabLink = ({
    tabId,
    tabName,
    href,
    isLast = false,
    isFirst = false,
  }: {
    tabId: string;
    tabName: string;
    href: string;
    isLast?: boolean;
    isFirst?: boolean;
  }) => {
    return (
      <Link href={href} className="w-1/4 min-w-20">
        <div
          className={`py-2 h-full flex items-center justify-center text-text-muted transition duration-200 ${
            activeTab === tabId ? "bg-white" : ""
          } $`}
        >
          <span className="text-center text-sm sm:text-md px-2">{tabName}</span>
        </div>
      </Link>
    );
  };

  return (
    <div
      className={`flex max-w-xl overflow-x-auto bg-background w-full ${className}`}
    >
      <div className="flex w-full min-w-md divide-x divide-text-muted text-text-main border border-text-muted">
        <TabLink
          tabId="overview"
          tabName="Market Overview"
          href="/coins/overview"
          isLast={true}
        />
        <TabLink tabId="trending" tabName="Trending" href="/coins/trending" />
        <TabLink
          tabId="gainers"
          tabName="Top Gainers"
          href="/coins/gainers"
          isFirst={true}
        />
        <TabLink tabId="losers" tabName="Top Losers" href="/coins/losers" />
      </div>
    </div>
  );
};

export default TabSelector;
