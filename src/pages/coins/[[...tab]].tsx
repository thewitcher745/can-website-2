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
      </Head>
      <CoinsElement activeTab={currentTab?.[0] || 'gainers_losers'} />
    </>
  );
};

export default CoinsTab;
