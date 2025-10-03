import OurStats from "@features/homepage/components/promotions/ourStats/OurStats";
import Banner from "@features/homepage/components/promotions/Banner";
import TopRowGadgetsSection from "@features/homepage/sections/TopRowGadgetsSection";
import MostRecentAnalysisSection from "@features/homepage/sections/MostRecentAnalysisSection";
import VideosSection from "@features/homepage/sections/VideosSection";
import HeatmapSection from "@features/homepage/sections/HeatmapSection";
import TopMarketCapCoinsSection from "@features/homepage/sections/TopMarketCapCoinsSection";
import HighPotentialTokensSection from "@features/homepage/sections/HighPotentialTokensSection";
import HeroSection from "@src/features/homepage/sections/HeroSection";

const Staging: React.FC = () => {
  return (
    <main className="py-20 px-4 w-full bg-background flex flex-col items-center min-h-screen">
      <HeroSection />
      <TopRowGadgetsSection />
      <TopMarketCapCoinsSection />
      <MostRecentAnalysisSection />
      <VideosSection />
      <HighPotentialTokensSection />
      <HeatmapSection />
      <OurStats />
      <div className="w-full pt-20 sm:pt-0 flex justify-center">
        <Banner />
      </div>
    </main>
  );
};

export default Staging;
