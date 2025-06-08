import React, { useState, useEffect } from "react";
import Image from "next/image";

type MonthResult = {
  label: string;
  img: string;
  winrate?: number;
  grossProfit?: number;
  drawdown?: number;
};

const months: MonthResult[] = [
  {
    label: "February 2025",
    img: "/images/results/full-reports/feb-2025/4.svg",
    winrate: 63,
    grossProfit: 302.6,
  },
  {
    label: "January 2025",
    img: "/images/results/full-reports/jan-2025/4.svg",
    winrate: 80,
    grossProfit: 631.41,
  },
  {
    label: "December 2024",
    img: "/images/results/full-reports/dec-2024/4.svg",
    winrate: 68,
    grossProfit: 364.01,
  },
  {
    label: "November 2024",
    img: "/images/results/full-reports/nov-2024/4.svg",
    winrate: 89,
    grossProfit: 759.06,
  },
  {
    label: "October 2024",
    img: "/images/results/full-reports/oct-2024/4.svg",
    winrate: 78,
    grossProfit: 303.49,
  },
  {
    label: "September 2024",
    img: "/images/results/full-reports/sep-2024/4.svg",
    winrate: 81,
    grossProfit: 609.79,
  },
  {
    label: "August 2024",
    img: "/images/results/full-reports/aug-2024/4.svg",
    winrate: 65,
    grossProfit: 331.98,
  },
  {
    label: "July 2024",
    img: "/images/results/full-reports/jul-2024/4.svg",
    winrate: 64,
    grossProfit: 625.54,
  },
  {
    label: "June 2024",
    img: "/images/results/full-reports/jun-2024/4.svg",
    winrate: 72,
    grossProfit: 283.5,
  },
  {
    label: "May 2024",
    img: "/images/results/full-reports/may-2024/4.svg",
    winrate: 83,
    grossProfit: 546.95,
  },
  {
    label: "April 2024",
    img: "/images/results/full-reports/apr-2024/4.svg",
    winrate: 65,
    grossProfit: 483.86,
  },
  {
    label: "March 2024",
    img: "/images/results/full-reports/mar-2024/4.svg",
    winrate: 67,
    grossProfit: 487.2,
  },
  {
    label: "February 2024",
    img: "/images/results/full-reports/feb-2024/4.svg",
    winrate: 80,
    grossProfit: 751.89,
  },
  {
    label: "January 2024",
    img: "/images/results/full-reports/jan-2024/4.svg",
    winrate: 76,
    grossProfit: 396.76,
  },
  {
    label: "December 2023",
    img: "/images/results/full-reports/dec-2023/4.svg",
    winrate: 90,
    grossProfit: 391.24,
  },
  {
    label: "November 2023",
    img: "/images/results/full-reports/nov-2023/4.svg",
    winrate: 63,
    grossProfit: 332.68,
  },
  {
    label: "October 2023",
    img: "/images/results/full-reports/oct-2023/4.svg",
    winrate: 67,
    grossProfit: 323.12,
  },
  {
    label: "September 2023",
    img: "/images/results/full-reports/sep-2023/4.svg",
    winrate: 71,
    grossProfit: 163.46,
  },
  {
    label: "August 2023",
    img: "/images/results/full-reports/aug-2023/4.svg",
    winrate: 70,
    grossProfit: 220,
  },
  {
    label: "July 2023",
    img: "/images/results/full-reports/jul-2023/4.svg",
    winrate: 77,
    grossProfit: 556,
  },
];

const parseLabel = (label: string): { monthName: string; year: string } => {
  const parts = label.split(" ");
  return { monthName: parts[0], year: parts[1] };
};

// Helper to sort month names chronologically (January, February, ...)
const monthOrder = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

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
    ].sort((a, b) => parseInt(b) - parseInt(a)); // Sort years descending (e.g., 2025, 2024)
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
      // Sort months based on their appearance in the original `months` array for that year (newest first)
      // The original `months` array is sorted globally newest to oldest.
      // So, for a given year, months will appear in reverse chronological order.
      setMonthsForSelectedYear(availableMonths);

      if (availableMonths.length > 0) {
        // If current selectedMonth is not in the new list OR if selectedMonth is not set yet for this year
        if (!availableMonths.includes(selectedMonth) || selectedMonth === "") {
            setSelectedMonth(availableMonths[0]); // Select the first (latest) month for the new year
        }
      } else {
        setSelectedMonth(""); // No months available for this year
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
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4">
            Monthly Results
          </h2>
          <p className="text-lg text-text-muted max-w-3xl mx-auto">
            View our monthly equity curve and performance results. Select a
            month to see its chart.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:items-start h-[600px] md:h-[600px] min-h-0">
          {/* Mobile Year dropdown menu */}
          <div className="md:hidden mb-4">
            <label htmlFor="year-select-mobile" className="block text-sm font-medium text-text-muted mb-1">Select Year:</label>
            <select
              id="year-select-mobile"
              className="w-full p-2 rounded-lg bg-background border border-border-strong text-text-main focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {allYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Mobile Month dropdown menu */}
          <div className="md:hidden mb-4">
            <label htmlFor="month-select-mobile" className="block text-sm font-medium text-text-muted mb-1">Select Month:</label>
            <select
              id="month-select-mobile"
              className="w-full p-2 rounded-lg bg-background border border-border-strong text-text-main focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              disabled={!selectedYear || monthsForSelectedYear.length === 0}
            >
              {monthsForSelectedYear.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          {/* Desktop sidebar */}
          <aside className="hidden md:block md:w-1/4 h-full min-h-0">
            <div className="flex flex-col gap-6 bg-background rounded-xl border border-border-strong p-3 shadow-inner h-full overflow-y-auto">
              {/* Year Selector */}
              <div>
                <h4 className="text-sm font-semibold text-text-main mb-2 px-1">Year</h4>
                <div className="flex flex-col gap-1">
                  {allYears.map((year) => (
                    <button
                      key={year}
                      className={`w-full px-4 py-2 rounded-lg font-medium transition text-left whitespace-nowrap border-2 bg-surface hover:bg-primary/10 focus:outline-none ${
                        selectedYear === year
                          ? "bg-primary/20 border-primary text-text-main font-semibold"
                          : "text-text-muted border-transparent"
                      }`}
                      onClick={() => setSelectedYear(year)}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Month Selector */}
              <div>
                <h4 className="text-sm font-semibold text-text-main mb-2 px-1">Month</h4>
                <div className="flex flex-col gap-1">
                  {monthsForSelectedYear.map((month) => (
                    <button
                      key={month}
                      className={`w-full px-4 py-2 rounded-lg font-medium transition text-left whitespace-nowrap border-2 bg-surface hover:bg-primary/10 focus:outline-none ${
                        selectedMonth === month
                          ? "bg-primary/20 border-primary text-text-main font-semibold"
                          : "text-text-muted border-transparent"
                      }`}
                      onClick={() => setSelectedMonth(month)}
                      disabled={!selectedYear || monthsForSelectedYear.length === 0}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
          {/* Monthly data display */}
          <div className="flex-1 flex flex-col items-center justify-center h-full min-h-0">
            {currentResult ? (
              <>
                {/* Chart/image display */}
                <div className="w-full max-w-4xl aspect-video relative border shadow rounded">
                  <Image
                    src={currentResult.img}
                    alt={currentResult.label + " equity curve"}
                    fill
                    className="object-contain rounded-lg bg-surface"
                    sizes="(max-width: 768px) 100vw, 600px"
                    priority
                  />
                </div>
                {/* Monthly stats section */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                  <div className="bg-background p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-text-main">
                        Win Rate
                      </h3>
                    </div>
                    {currentResult.winrate !== undefined && (
                      <p className="text-3xl font-bold text-primary">
                        {currentResult.winrate}%
                      </p>
                    )}
                  </div>
                  <div className="bg-background p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-text-main">
                        Gross Profit
                      </h3>
                    </div>
                    {currentResult.grossProfit !== undefined && (
                      <p className="text-3xl font-bold text-primary">
                        ${currentResult.grossProfit.toLocaleString()}
                      </p>
                    )}
                  </div>
                  {/* Display Drawdown if available */}
                  {currentResult.drawdown !== undefined && (
                    <div className="bg-background p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-text-main mb-2">Max Drawdown</h3>
                      <p className="text-3xl font-bold text-primary">{currentResult.drawdown}%</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center text-text-muted py-10">
                <p>Please select a year and month to view results.</p>
                 { allYears.length > 0 && selectedYear === "" && <p>Loading initial data...</p>}
              </div>
            )}
          </div>
        </div>
        {/* Link to full results page */}
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
