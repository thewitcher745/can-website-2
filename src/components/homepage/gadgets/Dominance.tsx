import { useEffect, useState, useRef } from "react";

import { buildApiUrl } from "../../../config";

interface MarketDominanceData {
  btcDominance: number;
  ethDominance: number;
}

const DominanceContainer = ({
  label,
  value,
  colorClass,
}: {
  label: string;
  value: number;
  colorClass: string;
}) => {
  return (
    <div className="flex flex-col px-2">
      <div className="flex items-center gap-1">
        <div className={`rounded-full h-2 w-2 ${colorClass}`} />
        <h3 className="text-sm px-1 text-offwhite">{label}</h3>
      </div>

      <h1 className="text-2xl font-semibold text-text-main">
        {value.toFixed(2)}%
      </h1>
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
        const response = await fetch(buildApiUrl(`/api/market_data`));
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
      className={`pt-3 rounded-md w-full h-full flex flex-col justify-eve items-center ${className}`}
    >
      <div className="flex justify-between flex-col-reverse sm:flex-row items-center mb-1 h-1/5">
        <div className="flex justify-center w-full">
          <h3 className="text-lg p-3 font-bold text-text-main">
            BTC Dominance
          </h3>
          {/* <ChevronRight className="h-8 w-8 text-text-muted self-end" /> */}
        </div>
      </div>
      <div className="flex flex-col flex-grow py-4">
        <div
          id="dominance-container"
          className="w-full h-full relative flex justify-center items-center"
        >
          <div className="btc-dominance">
            <DominanceContainer
              label="Bitcoin"
              value={marketData?.btcDominance || 0}
              colorClass="bg-primary"
            />
          </div>
          <div className="eth-dominance">
            <DominanceContainer
              label="Ethereum"
              value={marketData?.ethDominance || 0}
              colorClass="bg-secondary"
            />
          </div>
          <div className="alt-dominance">
            <DominanceContainer
              label="Alt"
              value={
                100 -
                (marketData?.btcDominance || 0) -
                (marketData?.ethDominance || 0)
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
