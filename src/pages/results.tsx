import Head from "next/head";
import Link from "next/link";

import Footer from "../shared/ui/Footer";
import ResultsTable from "@src/features/full-results/components/ResultsTable";
import Banner from "@src/features/homepage/components/promotions/Banner";
import CombinedProfitChart from "@src/features/full-results/components/charts/CombinedProfitChart";
import Summary from "@src/features/full-results/components/summary/Summary";
import CombinedWinrateLongShortTargetCharts from "@src/features/full-results/components/charts/CombinedWinrateLongShortTargetCharts";
import MonthYearSelector from "@src/features/full-results/components/MonthYearSelector";
import {
  MonthYearProvider,
  CategoryProvider,
} from "@src/domains/results/context";
import Title from "@src/features/full-results/components/Title";
import CategorySelector from "@src/features/full-results/components/CategorySelector";
import MetaTags from "@src/shared/MetaTags";

const ResultsPage: React.FC = () => {
  return (
    <>
      <MetaTags
        title="Trading Results"
        description="View our verified cryptocurrency trading results and performance metrics. Transparent reporting of our trading signals and analysis outcomes."
        canonicalUrl="https://can-trading.com/results"
        image="/images/showcase/can-banner.png"
        type="website"
      />
      <main className="results-page min-h-screen bg-background pb-12">
        <div className="max-w-7xl mx-auto px-4 pt-12">
          {/* Title section */}
          <Title />
          <div className="z-99">
            <MonthYearProvider>
              <CategoryProvider>
                {/* MonthYear and category selectors */}
                <MonthYearSelector />
                <CategorySelector />

                {/* Summary section */}
                <Summary />

                {/* Charts section */}
                <section id="charts" className="my-4">
                  <CombinedProfitChart />
                  <CombinedWinrateLongShortTargetCharts />
                </section>

                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 mt-12 text-center">
                  Detailed Trade Log
                </h2>
                <ResultsTable />
              </CategoryProvider>
            </MonthYearProvider>
          </div>
          <div className="my-4">
            <Banner />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ResultsPage;
