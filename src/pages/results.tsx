import React, { useState } from "react";
import Masonry from "react-masonry-css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Hardcoded list of available months (folder names)
const availableMonths = [
  "apr-2025",
  "mar-2025",
  "feb-2025",
  "jan-2025",
  // "dec-2024",
  // "nov-2024",
  // "oct-2024",
  // "sep-2024",
  // "aug-2024",
  // "jul-2024",
  // "jun-2024",
  // "may-2024",
];

// Specify how many images each month has
const imagesCountPerMonth: Record<string, number> = {
  "apr-2025": 7,
  "mar-2025": 7,
  "feb-2025": 6,
  "jan-2025": 8,
  "dec-2024": 9,
  "nov-2024": 8,
  "oct-2024": 4,
  "sep-2024": 7,
  "aug-2024": 6,
  "jul-2024": 5,
  "jun-2024": 8,
  "may-2024": 8,
};

// Generate image file names for each month using imagesCountPerMonth
const imagesPerMonth: Record<string, string[]> = {};
availableMonths.forEach((month) => {
  const count = imagesCountPerMonth[month] || 0;
  imagesPerMonth[month] = Array.from(
    { length: count },
    (_, i) => `/images/results/full-reports/${month}/${i + 1}.jpg`
  );
});

const breakpointColumnsObj = {
  default: 3,
  800: 2,
  500: 1,
};

const ResultsPage: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(availableMonths[0]);
  const images = imagesPerMonth[selectedMonth] || [];

  return (
    <>
      <Navbar />
      <main className="results-page min-h-screen bg-background pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 pt-24">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Full Results Gallery
          </h1>
          <div className="flex justify-center mb-8">
            <select
              className="border rounded px-4 py-2 text-lg bg-surface text-text-main"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {availableMonths.map((month) => (
                <option key={month} value={month}>
                  {month.replace("-", " ").toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {images.map((src, idx) => (
              <div key={idx} className="masonry-item">
                <img src={src} alt={`Result ${selectedMonth} ${idx + 1}`} />
              </div>
            ))}
          </Masonry>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ResultsPage;
