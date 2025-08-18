import React, { useState, useEffect, useRef } from "react";
import { buildApiUrl } from "../../config";

interface Gainer {
  change: number;
  name: string;
  price: number;
  symbol: string;
  volume: number;
}

const TopGainersTable = () => {
  const [gainers, setGainers] = useState<Gainer[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(buildApiUrl(`/api/top_gainers`));
        const response = await fetch(buildApiUrl(`/api/top_gainers`));
        const data = await response.json();
        setGainers(data);
      } catch (error) {
        console.error("Error fetching top gainers:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const tableContainer = tableContainerRef.current;

    const handleScroll = () => {
      if (tableContainer) {
        setIsScrolled(tableContainer.scrollLeft > 0);
      }
    };

    if (tableContainer) {
      tableContainer.addEventListener("scroll", handleScroll);
      // Initial check in case the table is already scrolled on load
      handleScroll();
    }

    return () => {
      if (tableContainer) {
        tableContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <section
      id="top-gainers"
      className="py-8 w-full bg-background flex justify-start sm:justify-center"
    >
      <div className="max-w-[1500px] bg-surface p-4 py-8 rounded radius-6 w-full">
        <div ref={tableContainerRef} className="overflow-x-auto relative">
          <table className="text-text-main w-full md:table-fixed table-auto">
            <thead>
              <tr>
                <th
                  className={`sticky left-0 bg-surface px-6 py-2 text-start w-[40%] ${
                    isScrolled ? "sticky-shadow-visible" : ""
                  }`}
                >
                  Name/Symbol
                </th>
                <th className="px-6 py-4 text-start w-[20%]">Price</th>
                <th className="px-6 py-4 text-start w-[20%]">Change</th>
                <th className="px-6 py-4 text-start w-[20%]">Volume</th>
              </tr>
            </thead>
            <tbody>
              {gainers.map((coin, index) => (
                <tr key={index} className="border-b border-border">
                  <td
                    className={`sticky left-0 bg-surface px-6 py-4 ${
                      isScrolled ? "sticky-shadow-visible" : ""
                    }`}
                  >
                    <div className="flex sm:flex-row flex-col justify-start items-start">
                      <span className="text-text-main pr-1 shrink-0">
                        {coin.name}
                      </span>
                      <span className="text-secondary-light opacity-50 font-bold">
                        {coin.symbol}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">${coin.price}</td>
                  <td className="px-6 py-4 flex items-center gap-2 text-success font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                    {coin.change}%
                  </td>
                  <td className="px-6 py-4">${coin.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TopGainersTable;
