import LongShortRatioSection from "./overview/sections/LongShortRatioSection";
import SmallTablesSection from "./overview/sections/SmallTablesSection";
import GlobalMarketDataSection from "./overview/sections/GlobalMarketDataSection";
import CryptoHeatmapSection from "./overview/sections/CryptoHeatmapSection";
import HistoricalFearAndGreedSection from "./overview/HistoricalFearAndGreed";

const MarketOverview = () => {
  return (
    <>
      <SmallTablesSection />
      <GlobalMarketDataSection />
      <LongShortRatioSection />
      <CryptoHeatmapSection />
      <HistoricalFearAndGreedSection />
    </>
  );
};

export default MarketOverview;
