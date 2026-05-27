import { useRouter } from "next/router";
import Head from "next/head";
import React, { useEffect } from "react";

import CoinsElement from "../../features/coins/CoinsElement";
import MetaTags from "@src/shared/MetaTags";
import Script from "next/script";

const CoinsTab = () => {
  const router = useRouter();
  const currentTab = router.query.tab;

  // Determine the active tab for meta tags
  const getActiveTabName = () => {
    if (!currentTab || currentTab.length === 0) return "Gainers & Losers";
    switch (currentTab[0]) {
      case "trending":
        return "Trending Coins";
      case "overview":
        return "Market Overview";
      case "gainers_losers":
      default:
        return "Gainers & Losers";
    }
  };

  const activeTabName = getActiveTabName();

  if (!router.isReady)
    return (
      <>
        <Head>
          <title>Loading... - CAN Trading</title>
        </Head>
      </>
    );

  if (
    currentTab == null ||
    currentTab.length === 0 ||
    (currentTab[0] !== "gainers_losers" &&
      currentTab[0] !== "trending" &&
      currentTab[0] !== "overview")
  ) {
    if (router.asPath !== "/coins/gainers_losers") {
      router.replace("/coins/gainers_losers");
    }

    return <CoinsElement activeTab="gainers" />;
  }

  return (
    <>
      <MetaTags
        title="Crypto Market Overview"
        description="Real-time cryptocurrency market data: fear & greed index, top gainers & losers, volume leaders, market cap rankings, and interactive heatmaps."
        canonicalUrl="https://can-trading.com/coins"
        image="/images/showcase/can-banner.png"
        type="website"
      />
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DataCatalog",
            name: "Crypto Market Data",
            description:
              "Real-time cryptocurrency market analytics and metrics",
            url: "https://can-trading.com/markets",
          }),
        }}
      />
      <CoinsElement activeTab={currentTab?.[0] || "gainers_losers"} />
    </>
  );
};

export default CoinsTab;
