import { useRouter } from "next/router";
import React, { useEffect } from "react";

import CoinsElement from "./CoinsElement";

const CoinsTab = () => {
  const router = useRouter();
  const currentTab = router.query.tab;

  if (!router.isReady) return;

  if (
    currentTab == null ||
    currentTab.length === 0 ||
    (currentTab[0] !== "gainers" &&
      currentTab[0] !== "losers" &&
      currentTab[0] !== "trending" &&
      currentTab[0] !== "overview")
  ) {
    if (router.asPath !== "/coins/gainers") {
      router.replace("/coins/gainers");
    }

    return <CoinsElement activeTab="gainers" />;
  }

  return <CoinsElement activeTab={currentTab[0]} />;
};

export default CoinsTab;
