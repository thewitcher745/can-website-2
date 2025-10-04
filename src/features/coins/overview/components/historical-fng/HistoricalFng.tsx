import { useEffect, useState } from "react";

import { buildApiUrl } from "@src/config";
import { GenericLoader } from "@src/shared/ui/loaders";
import GenericError from "@src/shared/ui/GenericError";
import PeriodSelectorButtons from "./PeriodSelectorButtons";
import ChartElement from "./ChartElement";

const HistoricalFng = () => {
  const [fngHistory, setFngHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nDataPoints, setNDataPoints] = useState(30);

  useEffect(() => {
    setLoading(true);
    fetch(buildApiUrl(`/api/fng_historical?limit=${nDataPoints}`))
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setFngHistory(response.reverse());
      })
      .catch((e) => setError("Oops! Something went wrong."))
      .finally(() => {
        setLoading(false);
      });
  }, [nDataPoints]);

  const timeData = fngHistory.map((item) => item.timestamp * 1000);

  if (loading) {
    return (
      <div className="relative w-full">
        <div className="pl-15 flex items-center justify-between">
          <PeriodSelectorButtons
            nDataPoints={nDataPoints}
            setNDataPoints={setNDataPoints}
          />
        </div>
        <div className="blur-sm">
          <ChartElement nDataPoints={nDataPoints} drawChartData={false} />
        </div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <GenericLoader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full">
        <div className="pl-15 flex items-center justify-between">
          <PeriodSelectorButtons
            nDataPoints={nDataPoints}
            setNDataPoints={setNDataPoints}
          />
        </div>
        <div className="blur-sm">
          nDataPoints={nDataPoints}
          <ChartElement drawChartData={false} />
        </div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <GenericError message={error} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        <div className="pl-15 flex items-center justify-between">
          <PeriodSelectorButtons
            nDataPoints={nDataPoints}
            setNDataPoints={setNDataPoints}
          />
        </div>
        {fngHistory.length > 0 && (
          <ChartElement
            nDataPoints={nDataPoints}
            timeData={timeData}
            fngHistory={fngHistory}
          />
        )}
      </div>
    </>
  );
};

export default HistoricalFng;
