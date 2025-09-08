import { useRouter } from "next/router";
import React, { useEffect } from "react";

import CoinsTable from "./CoinsTable";

const CoinsTab = () => {
  const router = useRouter();
  const currentTab = router.query.tab;

  useEffect(() => {
    router.replace("/coins/gainers");
  }, []);

  if (
    currentTab?.length === 0 ||
    currentTab == null ||
    (currentTab[0] !== "gainers" &&
      currentTab[0] !== "losers" &&
      currentTab[0] !== "trending")
  ) {
    return <CoinsTable activeTab="gainers" />;
  }

  return <CoinsTable activeTab={currentTab[0]} />;
};

export default CoinsTab;
