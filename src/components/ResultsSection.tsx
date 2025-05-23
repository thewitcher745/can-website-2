import React, { useState } from "react";
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

const ResultsSection: React.FC = () => {
  const [selected, setSelected] = useState(0);

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
          {/* Mobile dropdown menu */}
          <div className="md:hidden mb-4">
            <select
              className="w-full p-2 rounded-lg bg-background border border-border-strong text-text-main focus:outline-none focus:ring-2 focus:ring-primary"
              value={selected}
              onChange={(e) => setSelected(Number(e.target.value))}
            >
              {months.map((m, i) => (
                <option key={m.label} value={i}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
          {/* Desktop sidebar */}
          <aside className="hidden md:block md:w-1/4 h-full min-h-0">
            <div className="flex flex-col gap-2 bg-background rounded-xl border border-border-strong p-3 shadow-inner h-full overflow-y-auto">
              {months.map((m, i) => (
                <button
                  key={m.label}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition text-left whitespace-nowrap border-2 bg-surface hover:bg-primary/10 focus:outline-none ${
                    selected === i
                      ? "bg-primary/20 border-primary text-text-main border-l-10 pl-5"
                      : "text-text-muted"
                  }`}
                  onClick={() => setSelected(i)}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </aside>
          {/* Monthly data display */}
          <div className="flex-1 flex flex-col items-center justify-center h-full min-h-0">
            {/* Chart/image display */}
            <div className="w-full max-w-4xl aspect-video relative border shadow rounded">
              <Image
                src={months[selected].img}
                alt={months[selected].label + " equity curve"}
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
                  <span className="text-2xl font-bold text-success">
                    {months[selected].winrate !== undefined
                      ? months[selected].winrate + "%"
                      : "-"}
                  </span>
                </div>
                <p className="text-sm text-text-muted">
                  Percentage of profitable trades
                </p>
              </div>
              <div className="bg-background p-6 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-text-main">
                    Gross Profit
                  </h3>
                  <span className="text-2xl font-bold text-success">
                    {months[selected].grossProfit !== undefined
                      ? (months[selected].grossProfit > 0 ? "+" : "") +
                        months[selected].grossProfit +
                        "%"
                      : "-"}
                  </span>
                </div>
                <p className="text-sm text-text-muted">
                  Total profit for the month
                </p>
              </div>
            </div>
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
