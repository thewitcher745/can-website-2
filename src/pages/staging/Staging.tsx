import OurStats from "../../components/homepage/promotions/ourStats/OurStats";
import Banner from "../../components/homepage/promotions/Banner";
import TopRowGadgetsSection from "../../components/TopRowGadgetsSection";
import MostRecentAnalysisSection from "../../components/MostRecentAnalysis";

const Staging: React.FC = () => {
  return (
    <main className="py-20 px-4 w-full bg-background flex flex-col items-center min-h-screen">
      <TopRowGadgetsSection />
      <MostRecentAnalysisSection />
      <OurStats />
      <div className="w-full pt-20 sm:pt-0 flex justify-center">
        <Banner />
      </div>
    </main>
  );
};

export default Staging;
