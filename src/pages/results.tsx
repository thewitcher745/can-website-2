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
    (_, i) => `/images/results/full-reports/${month}/${i + 1}.svg`
  );
});

const breakpointColumnsObj = {
  default: 3,
  800: 2,
  500: 1,
};

const ResultsPage: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(availableMonths[0]);
  const [modalImg, setModalImg] = useState<string | null>(null);
  const images = imagesPerMonth[selectedMonth] || [];

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
              <div
                key={idx}
                className="transition-transform duration-100 ease-in-out hover:scale-102 hover:z-10 masonry-item cursor-pointer"
                onClick={() => setModalImg(src)}
              >
                <img
                  src={src}
                  alt={`Result ${selectedMonth} ${idx + 1}`}
                  className="masonry-thumb-zoomable"
                />
              </div>
            ))}
          </Masonry>
        </div>
        {/* Modal Overlay */}
        {modalImg && (
          <div
            className="fixed inset-0 bg-[#000000cc] flex items-center justify-center z-50"
            onClick={() => setModalImg(null)}
          >
            <div
              className="relative max-w-3xl bg-gray-800 flex items-center justify-center"
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
    </>
  );
};

export default ResultsPage;
