import { useRouter } from "next/router";
import React, { useEffect } from "react";

import CoinsElement from "../../features/coins/CoinsElement";

const CoinsTab = () => {
  const router = useRouter();
  const currentTab = router.query.tab;

  if (!router.isReady) return;

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

  return <CoinsElement activeTab={currentTab[0]} />;
};

export default CoinsTab;
