import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { buildApiUrl } from "@src/config";
import { MarketDominanceData } from "@src/types";

const DominanceContainer = ({
  label,
  value,
  colorClass,
  valueChange,
}: {
  label: string;
  value: number;
  colorClass: string;
  valueChange: number;
}) => {
  const renderCaret = (change: number) => {
    const isPositive = change >= 0;
    const colorClass = isPositive ? "text-success" : "text-error";
    return (
      <div className={`h-4 w-4 ${colorClass} pr-3`}>
        {isPositive ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col px-2 gap-1">
      <div className="flex items-center gap-1">
        <div className={`rounded-full h-2 w-2 ${colorClass}`} />
        <h3 className="text-sm px-1 text-gray-400">{label}</h3>
      </div>

      <h1 className="text-2xl font-semibold text-text-main">
        {value.toFixed(2)}%
      </h1>
      <div className="flex items-center gap-1">
        {renderCaret(valueChange)}
        <span
          className={`text-md font-semibold ${
            valueChange > 0 ? "text-success" : "text-error"
          }`}
        >
          {valueChange.toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

const DominanceAxis = ({
  btcDominance,
  ethDominance,
}: {
  btcDominance: number;
  ethDominance: number;
}) => {
  return (
    <div className="flex h-2 w-full my-2 px-4 rounded-xl overflow-hidden">
      <div
        className="h-full bg-primary rounded-l-xl"
        style={{ width: `${btcDominance}%` }}
      />
      <div
        className="h-full bg-secondary"
        style={{ width: `${ethDominance}%` }}
      />
      <div
        className="h-full bg-text-muted rounded-r-xl"
        style={{ width: `${100 - btcDominance - ethDominance}%` }}
      />
    </div>
  );
};

const Dominance = ({ className }: { className?: string }) => {
  const [marketData, setMarketData] = useState<MarketDominanceData | null>(
    null
  );
  const [loading, isLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(buildApiUrl(`/api/dominance`));
        const data = await response.json();
        setMarketData(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load market data."
        );
      } finally {
        isLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className={`pt-3 rounded-md w-full h-full flex flex-col items-center ${className}`}
    >
      <div className="flex flex-col flex-grow pb-4">
        <div
          id="dominance-container"
          className="w-full h-full relative flex justify-center items-center"
        >
          <div className="btc-dominance">
            <DominanceContainer
              label="Bitcoin"
              value={marketData?.btcDominance || 0}
              valueChange={marketData?.btcDominanceChange || 0}
              colorClass="bg-primary"
            />
          </div>
          <div className="eth-dominance">
            <DominanceContainer
              label="Ethereum"
              value={marketData?.ethDominance || 0}
              valueChange={marketData?.ethDominanceChange || 0}
              colorClass="bg-secondary"
            />
          </div>
          <div className="alt-dominance">
            <DominanceContainer
              label="Alts"
              value={
                100 -
                (marketData?.btcDominance || 0) -
                (marketData?.ethDominance || 0)
              }
              valueChange={
                -(marketData?.btcDominanceChange || 0) -
                (marketData?.ethDominanceChange || 0)
              }
              colorClass="bg-text-muted"
            />
          </div>
        </div>
        <DominanceAxis
          btcDominance={marketData?.btcDominance || 0}
          ethDominance={marketData?.ethDominance || 0}
        />
      </div>
    </div>
  );
};

export default Dominance;
