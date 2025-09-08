import { useRouter } from "next/router";
import React from "react";

import CoinsTable from "./CoinsTable";

const CoinsTab = () => {
  const currentTab = useRouter().query.tab;

  if (currentTab?.length === 0 || currentTab == null) {
    return <CoinsTable activeTab="gainers" />;
  }

  return <CoinsTable activeTab={currentTab[0]} />;
};

export default CoinsTab;
