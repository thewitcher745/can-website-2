import React, { useState, useEffect } from "react";
import { months, parseLabel, MonthResult } from "./results-section/data";
import SectionHeader from "./results-section/SectionHeader";
import MobileSelectors from "./results-section/MobileSelectors";
import DesktopSidebar from "./results-section/DesktopSidebar";
import ResultsDisplay from "./results-section/ResultsDisplay";

const ResultsSection: React.FC = () => {
  const [allYears, setAllYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [monthsForSelectedYear, setMonthsForSelectedYear] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [currentResult, setCurrentResult] = useState<MonthResult | undefined>(
    undefined
  );

  useEffect(() => {
    const years = [
      ...new Set(months.map((m) => parseLabel(m.label).year)),
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
          months
            .filter((m) => parseLabel(m.label).year === selectedYear)
            .map((m) => parseLabel(m.label).monthName)
        ),
      ];
      setMonthsForSelectedYear(availableMonths);

      if (availableMonths.length > 0) {
        if (!availableMonths.includes(selectedMonth) || selectedMonth === "") {
            setSelectedMonth(availableMonths[0]);
        }
      } else {
        setSelectedMonth("");
      }
    }
  }, [selectedYear]);

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      const targetLabel = `${selectedMonth} ${selectedYear}`;
      const result = months.find((m) => m.label === targetLabel);
      setCurrentResult(result);
    } else {
      setCurrentResult(undefined);
    }
  }, [selectedYear, selectedMonth]);

  return (
    <section id="results" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader />
                <div className="flex flex-col md:flex-row gap-8 md:items-start min-h-[600px] md:h-[600px]">
          <MobileSelectors 
            allYears={allYears}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            monthsForSelectedYear={monthsForSelectedYear}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
          <DesktopSidebar 
            allYears={allYears}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            monthsForSelectedYear={monthsForSelectedYear}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
          <ResultsDisplay 
            currentResult={currentResult} 
            allYears={allYears} 
            selectedYear={selectedYear} 
          />
        </div>
        <div className="flex justify-center mt-12">
          <a
            href="/results"
            className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-primary-dark transition text-lg"
          >
            View Full Results Gallery
          </a>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
