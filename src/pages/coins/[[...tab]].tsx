import { useRouter } from "next/router";
import Head from "next/head";
import React, { useEffect } from "react";

import CoinsElement from "../../features/coins/CoinsElement";

const CoinsTab = () => {
  const router = useRouter();
  const currentTab = router.query.tab;
  
  // Determine the active tab for meta tags
  const getActiveTabName = () => {
    if (!currentTab || currentTab.length === 0) return 'gainers & losers';
    switch(currentTab[0]) {
      case 'trending': return 'trending coins';
      case 'overview': return 'market overview';
      case 'gainers_losers':
      default:
        return 'Gainers & Losers';
    }
  };
  
  const activeTabName = getActiveTabName();

  if (!router.isReady) return (
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
      <Head>
        <title>{`${activeTabName} - Cryptocurrency Market - CAN Trading`}</title>
        <meta name="description" content={`View the latest ${activeTabName.toLowerCase()} in crypto. Track price movements, market caps, and trading volumes.`} />
        <meta property="og:title" content={`${activeTabName} - CAN Trading`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={`View the latest ${activeTabName.toLowerCase()} in crypto. Track price movements, market caps, and trading volumes.`} />
        <meta property="og:url" content={`https://can-trading.com/coins/${currentTab?.[0] || 'gainers_losers'}`} />
        <meta property="og:site_name" content="CAN Trading" />
        <meta property="og:image" content="/images/showcase/can-banner.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${activeTabName} - CAN Trading`} />
        <meta name="twitter:description" content={`View the latest ${activeTabName.toLowerCase()} in the cryptocurrency market. Track price movements, market caps, and trading volumes.`} />
        <meta name="twitter:image" content="/images/showcase/can-banner.png" />
      </Head>
      <CoinsElement activeTab={currentTab?.[0] || 'gainers_losers'} />
    </>
  );
};

export default CoinsTab;
