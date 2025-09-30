import { useEffect, useState } from "react";

import { buildApiUrl } from "@src/config";
import { longShortItem } from "@src/types";
import CurrencySelector from "./CurrencySelector";
import List from "./List";

const LongShortRatioSection = () => {
  const [longShortData, setLongShortData] = useState<longShortItem>({});
  const [symbol, setSymbol] = useState("btc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(buildApiUrl("/api/long_short_ratio?symbol=" + symbol))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch long short ratios.");
        return res.json();
      })
      .then((data) => {
        setLongShortData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [symbol]);

  const errorElement = error ? (
    <div className="w-full flex justify-center lg:justify-start text-error font-semibold">
      <span>{error}</span>
    </div>
  ) : null;

  return (
    <section id="long-short-ratio" className="w-full flex justify-center pt-8">
      <div className="2xl:max-w-[100rem] xl:max-w-7xl max-w-6xl w-full flex flex-col lg:flex-row">
        <div className="relative w-full">
          <div className="w-full flex justify-center lg:justify-start text-text-main text-2xl font-semibold">
            <span>Long to Short Orders Ratio</span>
          </div>
          <CurrencySelector onChange={setSymbol} />
          <List longShortData={longShortData} loading={loading} error={error} />
          {error && errorElement}
        </div>
      </div>
    </section>
  );
};

export default LongShortRatioSection;
