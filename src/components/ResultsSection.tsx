import React, { useState } from "react";
import Image from "next/image";

const months = [
  {
    label: "November 2024",
    img: "/images/results/nov-2024.png",
    winrate: 72,
    netProfit: 14.2,
    drawdown: 5.1,
  },
  {
    label: "December 2024",
    img: "/images/results/dec-2024.png",
    winrate: 80,
    netProfit: 19.7,
    drawdown: 3.8,
  },
  {
    label: "February 2025",
    img: "/images/results/feb-2025.png",
    winrate: 75,
    netProfit: 16.5,
    drawdown: 4.2,
  },
  {
    label: "January 2025",
    img: "/images/results/jan-2025.png",
    winrate: 68,
    netProfit: 11.3,
    drawdown: 6.4,
  },
  {
    label: "January 2025",
    img: "/images/results/jan-2025.png",
    winrate: 68,
    netProfit: 11.3,
    drawdown: 6.4,
  },
  {
    label: "January 2025",
    img: "/images/results/jan-2025.png",
    winrate: 68,
    netProfit: 11.3,
    drawdown: 6.4,
  },
  {
    label: "January 2025",
    img: "/images/results/jan-2025.png",
  },
  {
    label: "January 2025",
    img: "/images/results/jan-2025.png",
  },
  {
    label: "January 2025",
    img: "/images/results/jan-2025.png",
  },
  {
    label: "January 2025",
    img: "/images/results/jan-2025.png",
  },

  // Add more months as needed
];

const ResultsSection: React.FC = () => {
  const [selected, setSelected] = useState(0);

  return (
    <section id="results" className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Monthly Results
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            View our monthly equity curve and performance results. Select a
            month to see its chart.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:items-start">
          {/* Mobile dropdown menu */}
          <div className="md:hidden mb-4">
            <select
              className="w-full p-2 rounded-lg bg-[#181b20] border border-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
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
          <aside className="hidden md:block md:w-1/4 h-full">
            <div className="flex flex-col gap-2 bg-[#181b20] rounded-xl border border-gray-800 p-3 shadow-inner h-full overflow-y-auto">
              {months.map((m, i) => (
                <button
                  key={m.label}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition text-left whitespace-nowrap border-2 border-l-4 border-l-orange-400 border-orange-400/30 bg-gray-800 hover:bg-orange-400/10 focus:outline-none ${
                    selected === i
                      ? "bg-orange-400/20 border-orange-400 text-orange-300"
                      : "text-gray-200"
                  }`}
                  onClick={() => setSelected(i)}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </aside>
          {/* Monthly data display */}
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Chart/image display */}
            <div className="w-full max-w-4xl aspect-video relative">
              <Image
                src={months[selected].img}
                alt={months[selected].label + " equity curve"}
                fill
                className="object-contain rounded-lg bg-gray-800"
                sizes="(max-width: 768px) 100vw, 600px"
                priority
              />
            </div>
            {/* Monthly stats section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
              <div className="bg-[#181b20] p-6 rounded-xl border border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-orange-300">Win Rate</h3>
                  <span className="text-2xl font-bold text-green-400">{months[selected].winrate !== undefined ? months[selected].winrate + '%' : '-'}</span>
                </div>
                <p className="text-sm text-gray-400">Percentage of profitable trades</p>
              </div>
              <div className="bg-[#181b20] p-6 rounded-xl border border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-orange-300">Net Profit</h3>
                  <span className="text-2xl font-bold text-green-400">{months[selected].netProfit !== undefined ? (months[selected].netProfit > 0 ? '+' : '') + months[selected].netProfit + '%' : '-'}</span>
                </div>
                <p className="text-sm text-gray-400">Total profit for the month</p>
              </div>
              <div className="bg-[#181b20] p-6 rounded-xl border border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-orange-300">Max Drawdown</h3>
                  <span className="text-2xl font-bold text-red-400">{months[selected].drawdown !== undefined ? '-' + months[selected].drawdown + '%' : '-'}</span>
                </div>
                <p className="text-sm text-gray-400">Largest peak-to-trough decline</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
