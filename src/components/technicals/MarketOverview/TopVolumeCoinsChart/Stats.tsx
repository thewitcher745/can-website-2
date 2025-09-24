import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { buildApiUrl } from "../../../../config";
import { reduceNumber } from "../../../../utils";

interface MarketData {
  activeCurrencies: number;
  activeExchanges: number;
  marketCapChangePercentage24h: number;
  totalMarketCap: number;
  totalVolume24h: number;
  volumeChangePercentage24h: number;
}

const renderCaret = (change: number) => {
  const isPositive = change >= 0;
  const colorClass = isPositive ? "text-success" : "text-error";
  return (
    <div className={`h-6 w-6 ${colorClass}`}>
      {isPositive ? (
        <ChevronUp className="h-6 w-6" />
      ) : (
        <ChevronDown className="h-6 w-6" />
      )}
    </div>
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
  const [dominanceData, setDominanceData] = useState({
    btcDominance: 0,
    ethDominance: 0,
    btcDominanceChange: 0,
    ethDominanceChange: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(buildApiUrl(`/api/market_data`))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch top coins.");
        return res.json();
      })
      .then((response) => {
        setMarketData(response);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch(buildApiUrl(`/api/dominance`))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch top coins.");
        return res.json();
      })
      .then((response) => {
        setDominanceData(response);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <table className="pl-2 flex flex-col gap-4 rounded-lg">
      <tbody>
        <tr>
          <td className="text-text-muted text-xl text-right p-2 py-6">
            Market Cap
          </td>
          <td className="text-text-main text-3xl font-semibold p-2 py-6">
            {reduceNumber(marketData.totalMarketCap)}
          </td>
          <td>
            <div
              className={`text-text-black flex items-center text-xl font-semibold ${
                marketData.marketCapChangePercentage24h >= 0
                  ? "text-success"
                  : "text-error"
              }`}
            >
              {renderCaret(marketData.marketCapChangePercentage24h)}{" "}
              {Math.abs(marketData.marketCapChangePercentage24h).toFixed(2)}%
            </div>
          </td>
        </tr>
        <tr>
          <td className="text-text-muted text-xl w-30 text-right p-2 py-6">
            24h Volume
          </td>
          <td className="text-text-main text-3xl font-semibold p-2 py-6">
            {reduceNumber(marketData.totalVolume24h)}
          </td>
          <td>
            <div
              className={`text-text-black flex items-center text-xl font-semibold ${
                marketData.volumeChangePercentage24h >= 0
                  ? "text-success"
                  : "text-error"
              }`}
            >
              {renderCaret(marketData.volumeChangePercentage24h)}{" "}
              {Math.abs(marketData.volumeChangePercentage24h).toFixed(2)}%
            </div>
          </td>
        </tr>
        <tr>
          <td className="text-text-muted text-xl text-right p-2 py-6">
            BTC Dominance
          </td>
          <td className="text-text-main text-3xl font-semibold p-2 py-6">
            {dominanceData.btcDominance.toFixed(2)}%
          </td>
          <td>
            <div
              className={`text-text-black flex items-center text-xl font-semibold ${
                dominanceData.btcDominanceChange >= 0
                  ? "text-success"
                  : "text-error"
              }`}
            >
              {renderCaret(dominanceData.btcDominanceChange)}{" "}
              {Math.abs(dominanceData.btcDominanceChange).toFixed(2)}%
            </div>
          </td>
        </tr>
        <tr>
          <td className="text-text-muted text-xl text-right p-2 py-6">
            ETH Dominance
          </td>
          <td className="text-text-main text-3xl font-semibold p-2 py-6">
            {dominanceData.ethDominance.toFixed(2)}%
          </td>
          <td>
            <div
              className={`text-text-black flex items-center text-xl font-semibold ${
                dominanceData.ethDominanceChange >= 0
                  ? "text-success"
                  : "text-error"
              }`}
            >
              {renderCaret(dominanceData.ethDominanceChange)}{" "}
              {Math.abs(dominanceData.ethDominanceChange).toFixed(2)}%
            </div>
          </td>
        </tr>
        <tr>
          <td className="text-text-muted text-xl text-right p-2 py-6">
            Active exchanges
          </td>
          <td className="text-text-main text-3xl font-semibold p-2 py-6">
            {marketData.activeExchanges}
          </td>
        </tr>
        <tr>
          <td className="text-text-muted text-xl text-right p-2 py-6">
            Active cryptocurrencies
          </td>
          <td className="text-text-main text-3xl font-semibold p-2 py-6">
            {marketData.activeCurrencies}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
export default Stats;
