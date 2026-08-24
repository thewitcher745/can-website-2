import React from "react";
import Link from "next/link";

import SectionHeader from "../components/results-section/SectionHeader";
import ResultsDisplay from "../components/results-section/ResultsDisplay";
import ServicesMonthYearSelector from "../components/results-section/ServicesMonthYearSelector";
import ServicesCategorySelector from "../components/results-section/ServicesCategorySelector";
import MinimalSummary from "@src/features/full-results/components/summary/MinimalSummary";

const ResultsSection: React.FC = () => {
  return (
    <section
      id="results"
      className="w-full overflow-x-scroll sm:overflow-x-hidden py-4 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader />
        <div className="flex flex-col md:flex-row gap-8 py-8">
          <div className="flex flex-col gap-4 md:w-1/4">
            <ServicesMonthYearSelector />
            <ServicesCategorySelector />
            <MinimalSummary />
          </div>
          <div className="flex flex-col gap-8 flex-1">
            <div className="w-full">
              <ResultsDisplay />
            </div>
            <div className="flex justify-center">
              <Link
                href="/results"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-primary to-primary/80 rounded-xl shadow-lg hover:shadow-primary/50 hover:shadow-2xl hover:scale-105 hover:-translate-y-1"
              >
                <span className="relative z-10">View All Results</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
