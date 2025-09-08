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
  return (
    <div className={`flex justify-center bg-background w-full ${className}`}>
      <div className="flex justify-center max-w-6xl divide-x rounded-4xl divide-text-muted text-text-main border border-text-muted">
        <Link href="/coins/gainers">
          <div
            className={`px-4 py-2 text-text-muted rounded-l-4xl transition duration-200 ${
              activeTab === "gainers" ? "bg-white" : ""
            }`}
          >
            Top Gainers
          </div>
        </Link>
        <Link href="/coins/losers">
          <div
            className={`px-4 py-2 text-text-muted transition duration-200 ${
              activeTab === "losers" ? "bg-white" : ""
            }`}
          >
            Top Losers
          </div>
        </Link>
        <Link href="/coins/losers">
          <div
            className={`px-4 py-2 text-text-muted rounded-r-4xl transition duration-200 ${
              activeTab === "trending" ? "bg-white" : ""
            }`}
          >
            Trending
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TabSelector;
