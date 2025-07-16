import React from "react";
import Image from "next/image";
import { MonthResult } from "./data";

interface ResultsDisplayProps {
  currentResult: MonthResult | undefined;
  allYears: string[];
  selectedYear: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  currentResult,
  allYears,
  selectedYear,
}) => (
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
          <div className="bg-background p-6 rounded-xl flex flex-col items-center md:block">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-text-main">Win Rate</h3>
            </div>
            {currentResult.winrate !== undefined && (
              <p className="text-3xl font-bold text-primary">
                {currentResult.winrate}%
              </p>
            )}
          </div>
          <div className="bg-background p-6 rounded-xl flex flex-col items-center md:block">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-text-main">
                Gross Profit
              </h3>
            </div>
            {currentResult.grossProfit !== undefined && (
              <p className="text-3xl font-bold text-primary">
                %{currentResult.grossProfit.toLocaleString()}
              </p>
            )}
          </div>
          {/* Display Drawdown if available */}
          {currentResult.drawdown !== undefined && (
            <div className="bg-background p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-text-main mb-2">
                Max Drawdown
              </h3>
              <p className="text-3xl font-bold text-primary">
                {currentResult.drawdown}%
              </p>
            </div>
          )}
        </div>
      </>
    ) : (
      <div className="text-center text-text-muted py-10">
        <p>Please select a year and month to view results.</p>
        {allYears.length > 0 && selectedYear === "" && (
          <p>Loading initial data...</p>
        )}
      </div>
    )}
  </div>
);

export default ResultsDisplay;
