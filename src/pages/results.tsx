import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";

import Footer from "../shared/ui/Footer";
import ResultsTable from "@features/full-results/ResultsTable";
import Banner from "@src/features/homepage/components/promotions/Banner";

// Hardcoded list of available months (folder names)
const availableMonths = [
  "jul-2023",
  "aug-2023",
  "sep-2023",
  "oct-2023",
  "nov-2023",
  "dec-2023",
  "jan-2024",
  "feb-2024",
  "mar-2024",
  "apr-2024",
  "may-2024",
  "jun-2024",
  "jul-2024",
  "aug-2024",
  "sep-2024",
  "oct-2024",
  "nov-2024",
  "dec-2024",
  "jan-2025",
  "feb-2025",
  "mar-2025",
  "apr-2025",
  "may-2025",
  "jun-2025",
  "jul-2025",
  "aug-2025",
  "sep-2025",
];

// Generate image file names for each month using imagesCountPerMonth
const imagesPerMonth: Record<string, string[]> = {};
availableMonths.forEach((month) => {
  imagesPerMonth[month] = Array.from(
    { length: 5 },
    (_, i) => `/images/results/full-reports/${month}/${i + 1}.svg`
  );
});

const breakpointColumnsObj = {
  default: 3,
  800: 2,
  500: 1,
};

const monthOrder: { [key: string]: number } = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

const parseMonthYearString = (
  monthYear: string
): { monthKey: string; year: string; monthName: string } => {
  const [monthKey, year] = monthYear.split("-");
  const monthName = new Date(
    parseInt(year),
    monthOrder[monthKey] - 1,
    1
  ).toLocaleString("default", { month: "long" });
  return { monthKey, year, monthName };
};

const ResultsPage: React.FC = () => {
  const [allYears, setAllYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [monthsForDisplay, setMonthsForDisplay] = useState<
    { label: string; value: string }[]
  >([]);
  const [currentMonthYearKey, setCurrentMonthYearKey] = useState<string>(""); // e.g., "mar-2025"

  const [modalImg, setModalImg] = useState<string | null>(null);
  const images = imagesPerMonth[currentMonthYearKey] || [];

  useEffect(() => {
    // Populate years, sorted descending
    const years = [
      ...new Set(availableMonths.map((my) => parseMonthYearString(my).year)),
    ].sort((a, b) => parseInt(b) - parseInt(a));
    setAllYears(years);

    if (years.length > 0) {
      const latestYear = years[0];
      setSelectedYear(latestYear);
    }
  }, []);

  useEffect(() => {
    if (selectedYear) {
      const monthsInYear = availableMonths
        .filter((my) => parseMonthYearString(my).year === selectedYear)
        .map((my) => ({
          original: my, // "mar-2025"
          monthKey: parseMonthYearString(my).monthKey, // "mar"
        }))
        .sort((a, b) => monthOrder[b.monthKey] - monthOrder[a.monthKey]); // Sort months descending (Dec, Nov, ...)

      const displayMonths = monthsInYear.map((m) => ({
        label: parseMonthYearString(m.original).monthName, // "MARCH"
        value: m.original, // "mar-2025"
      }));
      setMonthsForDisplay(displayMonths);

      if (displayMonths.length > 0) {
        // If currentMonthYearKey's year is different or it's not set, update it
        if (
          !currentMonthYearKey ||
          parseMonthYearString(currentMonthYearKey).year !== selectedYear
        ) {
          setCurrentMonthYearKey(displayMonths[0].value); // Select the latest month of the new year
        }
      } else {
        setCurrentMonthYearKey(""); // No months for this year
      }
    }
  }, [selectedYear, currentMonthYearKey]); // Added currentMonthYearKey to dependencies to handle initial load correctly

  // Close modal on ESC key or mobile back
  React.useEffect(() => {
    if (!modalImg) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalImg(null);
    };
    window.addEventListener("keydown", handler);

    // Handle mobile back (popstate)
    const onPopState = () => {
      setModalImg(null);
    };
    window.addEventListener("popstate", onPopState);
    // Push a new state when modal opens
    window.history.pushState({ modal: true }, "");

    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("popstate", onPopState);
      // When closing modal, go back if last state was modal
      if (window.history.state && window.history.state.modal) {
        window.history.back();
      }
    };
  }, [modalImg]);

  return (
    <>
      <Head>
        <title>Trading Results - CAN Trading</title>
        <meta
          name="description"
          content="View our verified cryptocurrency trading results and performance metrics. Transparent reporting of our trading signals and analysis outcomes."
        />
        <meta property="og:title" content="Trading Results - CAN Trading" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="View our verified cryptocurrency trading results and performance metrics. Transparent reporting of our trading signals and analysis outcomes."
        />
        <meta property="og:url" content="https://can-trading.com/results" />
        <meta property="og:site_name" content="CAN Trading" />
        <meta property="og:image" content="/images/showcase/can-banner.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Trading Results - CAN Trading" />
        <meta
          name="twitter:description"
          content="View our verified cryptocurrency trading results and performance metrics. Transparent reporting of our trading signals and analysis outcomes."
        />
        <meta name="twitter:image" content="/images/showcase/can-banner.png" />
      </Head>
      <main className="results-page min-h-screen bg-background pb-12">
        <div className="max-w-7xl mx-auto px-4 pt-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Full Results Gallery
          </h1>
          <p className="text-text-main text-xl mb-6 px-2">
            Browse through the full gallery of our results and review our
            performance in prior periods.
          </p>
          <div className="flex gap-2 w-full text-xl px-2 pb-4 text-primary">
            Our VIP Services can be viewed{" "}
            <Link
              href="/telegram"
              target="_blank"
              rel="noopener noreferrer"
              className="title-hover underline"
            >
              HERE.
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <div>
              <label
                htmlFor="year-select"
                className="block text-sm font-medium text-text-muted mb-1 text-center sm:text-left"
              >
                Year:
              </label>
              <select
                id="year-select"
                className="border rounded px-4 py-2 text-lg bg-surface text-text-main focus:outline-none focus:ring-2 focus:ring-primary"
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
            <div>
              <label
                htmlFor="month-select"
                className="block text-sm font-medium text-text-muted mb-1 text-center sm:text-left"
              >
                Month:
              </label>
              <select
                id="month-select"
                className="border rounded px-4 py-2 text-lg bg-surface text-text-main focus:outline-none focus:ring-2 focus:ring-primary"
                value={currentMonthYearKey}
                onChange={(e) => setCurrentMonthYearKey(e.target.value)}
                disabled={!selectedYear || monthsForDisplay.length === 0}
              >
                {monthsForDisplay.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {images.map((src, idx) => (
              <div
                key={idx}
                className="transition-transform duration-100 ease-in-out hover:scale-102 hover:z-10 masonry-item cursor-pointer"
                onClick={() => setModalImg(src)}
              >
                <img
                  src={src}
                  alt={`Result ${currentMonthYearKey} ${idx + 1}`}
                  className="masonry-thumb-zoomable"
                />
              </div>
            ))}
          </Masonry>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 mt-12 text-center">
            Detailed Trade Log
          </h2>
          <ResultsTable selectedMonth={currentMonthYearKey} />
          <Banner />
        </div>
        {/* Modal Overlay */}
        {modalImg && (
          <div
            className="fixed inset-0 bg-[#000000cc] flex items-center justify-center z-50"
            onClick={() => setModalImg(null)}
          >
            <div
              className="relative max-w-3xl bg-gray-800 flex items-center justify-center animate-modal-fadein"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute px-0 py-0 top-0 right-2 text-white cursor-pointer p-2 text-3xl opacity-80 transition-all hover:opacity-100 focus:outline-none"
                onClick={() => setModalImg(null)}
                aria-label="Close"
              >
                &times;
              </button>
              <img
                src={modalImg}
                alt="Full size result"
                className="max-h-[80vh] w-auto max-w-full rounded shadow-lg"
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
      <style jsx global>{`
        @keyframes modal-fadein {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modal-fadein {
          animation: modal-fadein 0.32s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </>
  );
};

export default ResultsPage;
