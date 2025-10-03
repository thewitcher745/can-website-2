import React, { useEffect, useState } from "react";
import { MdCurrencyExchange, MdCurrencyBitcoin } from "react-icons/md";
import { FaCoins } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";

import { buildApiUrl } from "@src/config";
import { reduceNumber } from "@src/utils";
import { MarketData } from "@src/types";
import Caret from "@shared/ui/Caret";
import { GenericLoader } from "@src/shared/ui/loaders";
import GenericError from "@src/shared/ui/GenericError";

const LabelColumn = ({
  label,
  icon,
}: {
  label: string;
  icon: React.JSX.Element;
}) => {
  return (
    <td className="py-6 w-1/2">
      <div className="flex items-center text-text-muted gap-2">
        {icon}
        <span className="text-lg">{label}</span>
      </div>
    </td>
  );
};

const StatRow = ({
  label,
  icon,
  value,
  change,
}: {
  label: string;
  icon: React.JSX.Element;
  value: number;
  change?: number;
}) => {
  const labelValue =
    label === "Market Cap" || label === "Total Volume"
      ? reduceNumber(value)
      : value;

  return (
    <tr className="table w-full xl:w-3/4 mx-auto">
      <LabelColumn label={label} icon={icon} />
      <td className="w-1/4">
        <div className="flex xs:flex-row flex-col gap-2 items-center justify-end">
          <span className="text-text-main text-right text-xl font-semibold">
            {labelValue}
          </span>
        </div>
      </td>
      {change ? (
        <td className="w-1/4">
          <div
            className={`pl-2 text-text-black size-full flex items-center text-lg font-semibold ${
              change >= 0 ? "text-success" : "text-error"
            }`}
          >
            <Caret change={change} />{" "}
            <span>{Math.abs(change).toFixed(2)}%</span>
          </div>
        </td>
      ) : (
        <td className="w-1/4">
          <div className="pl-2 text-text-black size-full flex items-center text-lg font-semibold"></div>
        </td>
      )}
    </tr>
  );
};

const Stats = () => {
  const [marketData, setMarketData] = useState<MarketData>({
    activeCurrencies: 0,
    activeExchanges: 0,
    marketCapChangePercentage24h: 0,
    totalMarketCap: 0,
    totalVolume24h: 0,
    volumeChangePercentage24h: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(buildApiUrl(`/api/market_data`))
      .then((res) => {
        if (!res.ok) throw new Error("Oops! Something went wrong.");
        return res.json();
      })
      .then((response) => {
        setMarketData(response);
      })
      .catch((e) => setError(e.message))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const LoaderElement = () => {
    return (
      <div className="pl-2 w-full sm:w-1/2 min-h-75 lg:w-full flex justify-center items-center">
        <GenericLoader />
      </div>
    );
  };

  const ErrorElement = () => {
    return (
      <div className="pl-2 w-full sm:w-1/2 min-h-75 lg:w-full flex justify-center items-center">
        <GenericError message={error || "Failed to fetch market data."} />
      </div>
    );
  };

  if (loading) return <LoaderElement />;
  if (error) return <ErrorElement />;

  return (
    <table className="pl-2 w-full sm:w-1/2 min-w-75 lg:w-full table gap-4 rounded-lg">
      <tbody className="w-full">
        <StatRow
          label="Market Cap"
          icon={<FaCoins className="w-6 h-6" />}
          value={marketData.totalMarketCap}
          change={marketData.marketCapChangePercentage24h}
        />
        <StatRow
          label="Total Volume"
          icon={<FaDollarSign className="w-6 h-6" />}
          value={marketData.totalVolume24h}
          change={marketData.volumeChangePercentage24h}
        />
        <StatRow
          label="Active Currencies"
          icon={<MdCurrencyBitcoin className="w-6 h-6" />}
          value={marketData.activeCurrencies}
        />
        <StatRow
          label="Active Exchanges"
          icon={<MdCurrencyExchange className="w-6 h-6" />}
          value={marketData.activeExchanges}
        />
      </tbody>
    </table>
  );
};
export default Stats;
