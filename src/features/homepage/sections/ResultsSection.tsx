import React, { useState, useEffect } from "react";
import Link from "next/link";

import cumulativeData from "../components/results-section/cumulativeData.json";
import SectionHeader from "../components/results-section/SectionHeader";
import Selectors from "../components/results-section/Selectors";
import ResultsDisplay from "../components/results-section/ResultsDisplay";
import Stats from "../components/results-section/Stats";

const parseLabel = (label: string) => {
  const [monthName, year] = label.split("-");
  return { monthName, year };
};

const ResultsSection: React.FC = () => {
  const [allYears, setAllYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [monthsForSelectedYear, setMonthsForSelectedYear] = useState<string[]>(
    []
  );
  const [selectedMonth, setSelectedMonth] = useState<string>("");

  useEffect(() => {
    const years = [
      ...new Set(cumulativeData.map((m) => parseLabel(m.label).year)),
    ].sort((a, b) => parseInt(b) - parseInt(a));
    setAllYears(years);

    if (years.length > 0) {
      const initialYear = years[0];
      setSelectedYear(initialYear);
    }
  }, []);

  useEffect(() => {
    if (selectedYear) {
      const availableMonths = [
        ...new Set(
          cumulativeData
            .filter((m) => parseLabel(m.label).year === selectedYear)
            .map((m) => parseLabel(m.label).monthName)
        ),
      ];
      setMonthsForSelectedYear(availableMonths);

      if (availableMonths.length > 0) {
        setSelectedMonth(availableMonths[0]);
      } else {
        setSelectedMonth("");
      }
    }
  }, [selectedYear]);

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      const targetLabel = `${selectedMonth}-${selectedYear}`;
      const result = cumulativeData.find((m) => m.label === targetLabel);
    }
  }, [selectedYear, selectedMonth]);

  return (
    <section id="results" className="py-4 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader />
        <div className="flex flex-col md:flex-row gap-8 md:items-start min-h-[600px] md:h-[600px]">
          <div>
            <Selectors
              allYears={allYears}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              monthsForSelectedYear={monthsForSelectedYear}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
            />
            <Stats
              netProfit={cumulativeData
                .find((m) => m.label === selectedMonth + "-" + selectedYear)
                ?.grossProfit?.toString()}
              winrate={cumulativeData
                .find((m) => m.label === selectedMonth + "-" + selectedYear)
                ?.winrate?.toString()}
            />
            <div className="justify-center mt-12 hidden md:flex">
              <Link
                href="/results"
                className="text-center border border-primary text-primary font-semibold px-6 py-3 rounded-lg shadow hover:scale-102 hover:underline duration-100 transition-all text-lg"
              >
                View all results
              </Link>
            </div>
          </div>
          <ResultsDisplay monthYearName={selectedMonth + "-" + selectedYear} />
          <div className="flex justify-center md:hidden">
            <Link
              href="/results"
              className="text-center border border-primary text-primary font-semibold px-6 py-3 rounded-lg shadow hover:border-primary-light hover:bg-primary-light/20 hover:scale-102 duration-100 transition-all text-lg"
            >
              View all results
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
