import { useRouter } from "next/router";
import React, { useEffect } from "react";

import CoinsTable from "./CoinsTable";

const CoinsTab = () => {
  const router = useRouter();
  const currentTab = router.query.tab;

  if (!router.isReady) return;

  if (
    currentTab == null ||
    currentTab.length === 0 ||
    (currentTab[0] !== "gainers" &&
      currentTab[0] !== "losers" &&
      currentTab[0] !== "trending")
  ) {
    if (router.asPath !== "/coins/gainers") {
      router.replace("/coins/gainers");
    }

    return <CoinsTable activeTab="gainers" />;
  }

  return <CoinsTable activeTab={currentTab[0]} />;
};

export default CoinsTab;
