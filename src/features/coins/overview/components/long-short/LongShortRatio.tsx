import { useEffect, useState } from "react";

import { buildApiUrl } from "@src/config";
import { longShortItem } from "@src/types";
import CurrencySelector from "./CurrencySelector";
import List from "./List";
import { GenericLoader } from "@src/shared/ui/loaders";
import GenericError from "@src/shared/ui/GenericError";

const LongShortRatio = () => {
  const [longShortData, setLongShortData] = useState<longShortItem>({});
  const [symbol, setSymbol] = useState("btc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(buildApiUrl(`/api/long_short_ratio?symbol=${symbol}`))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch long/short orders data.");
        return res.json();
      })
      .then((response) => {
        setLoading(false);
        setLongShortData(response);
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
      });
  }, [symbol]);

  useEffect(() => {
    setLoading(true);
  }, [symbol, setLoading]);

  if (loading)
    return (
      <div className="w-full min-h-100">
        <CurrencySelector onChange={setSymbol} />
        <div className="flex justify-center items-center min-h-75">
          <GenericLoader />
        </div>
      </div>
    );

  if (error)
    return (
      <div className="w-full min-h-100">
        <CurrencySelector onChange={setSymbol} />
        <div className="flex justify-center items-center min-h-75">
          <GenericError message={error} />
        </div>
      </div>
    );

  return (
    <div className="w-full">
      <CurrencySelector onChange={setSymbol} />
      <List longShortData={longShortData} loading={loading} error={error} />
    </div>
  );
};

export default LongShortRatio;
