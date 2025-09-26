import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import { getCoinLogoLink } from "../../../utils";
import { buildApiUrl } from "../../../config";
import { TopCoinsTableRowPlaceholer } from "../subcomponents/loaders";

interface Coin {
  change?: number;
  change_24h?: number;
  name: string;
  price: number;
  symbol: string;
  volume: number;
}

interface ApiData {
  top_gainers: Coin[];
  top_losers: Coin[];
  trending: Coin[];
  top_volume: Coin[];
}

const renderCaret = (change: number) => {
  const isPositive = change >= 0;
  const colorClass = isPositive ? "text-success" : "text-error";
  return (
    <div className={`h-4 w-4 ${colorClass} pr-3`}>
      {isPositive ? (
        <ChevronUp className="h-4 w-4" />
      ) : (
        <ChevronDown className="h-4 w-4" />
      )}
    </div>
  );
};

const CoinLogo = ({ symbol }: { symbol: string }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogo = async () => {
      const data = await getCoinLogoLink(symbol);
      // Assuming the API returns an object with a 'logo' property
      if (data) {
        setLogoUrl(data);
      }
    };

    fetchLogo();
  }, [symbol]);

  if (!logoUrl) {
    return (
      <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
    );
  }

  return (
    <Image
      src={logoUrl}
      alt={`${symbol} logo`}
      width={32}
      height={32}
      className="w-8 h-8 rounded-full"
    />
  );
};

const renderTableRows = (coins: Coin[]) => {
  const rows = [];
  for (let i = 0; i < 5; i++) {
    const coin = coins[i];
    // Number of decimal places that the number has
    const decimalPlaces = coin.price.toString().split(".")[1]?.length;
    const changeValue = Math.abs(coin.change).toFixed(2)
      ? Math.abs(coin.change).toFixed(2)
      : Math.abs(coin.change_24h).toFixed(2);

    rows.push(
      <tr key={i} className="border-b border-border h-1/5">
        {coin ? (
          <>
            <td className="px-2 py-2 w-1/2">
              <div className="flex items-center gap-3">
                <CoinLogo symbol={coin.symbol} />
                <div className="flex flex-col truncate">
                  <span className="truncate text-text-main font-semibold text-sm">
                    {coin.name}
                  </span>
                  <span className="text-xs font-medium text-text-muted">
                    {coin.symbol}USDT
                  </span>
                </div>
              </div>
            </td>
            <td className="opacity-80 text-text-main text-md font-light px-4 py-2 w-1/4">
              {decimalPlaces > 6 ? coin.price.toFixed(6) : coin.price}
            </td>
            <td
              className={`px-4 py-2 font-bold w-1/4 ${
                coin.change >= 0 ? "text-success" : "text-error"
              }`}
            >
              <div className="flex items-center gap-1">
                {renderCaret(coin.change)}
                <span className="text-sm font-semibold text-nowrap">
                  {changeValue} %
                </span>
              </div>
            </td>
          </>
        ) : (
          <>
            <td className="px-4 py-2 w-1/2">&nbsp;</td>
            <td className="px-4 py-2 w-1/4">&nbsp;</td>
            <td className="px-4 py-2 w-1/4">&nbsp;</td>
          </>
        )}
      </tr>
    );
  }
  return rows;
};

const SmallTables = () => {
  const [topGainers, setTopGainers] = useState<Coin[] | null>(null);
  const [topLosers, setTopLosers] = useState<Coin[] | null>(null);
  const [trending, setTrending] = useState<Coin[] | null>(null);
  const [topVolumeCoins, setTopVolumeCoins] = useState<Coin[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(buildApiUrl(`/api/coins_tables_summary`));
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result: ApiData = await response.json();

        // The API provides top_losers change as a positive number, convert it to negative
        result.top_losers = result.top_losers.map((coin) => ({
          ...coin,
          change: -Math.abs(coin.change),
        }));
        setTopGainers(result.top_gainers);
        setTopLosers(result.top_losers);
        setTrending(result.trending);
        setTopVolumeCoins(
          result.top_volume.map((coin) => ({
            ...coin,
            change: coin.change_24h,
          }))
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section
      id="market-data-tables"
      className="w-full flex justify-center pt-4"
    >
      <div className="2xl:max-w-[100rem] xl:max-w-7xl max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 justify-center items-center">
        <div
          id="top-gainers"
          className="w-full flex flex-col lg:items-start items-center justify-center"
        >
          <Link href={`/coins/gainers`}>
            <div className="flex">
              <h3 className="text-lg font-semibold underline text-text-main">
                Top Gainers
              </h3>
              <ChevronRight className="h-8 w-8 text-text-muted self-end" />
            </div>
          </Link>
          {loading && <TopCoinsTableRowPlaceholer />}
          {topGainers && !loading && (
            <table className="w-full mt-2">
              <tbody>{renderTableRows(topGainers)}</tbody>
            </table>
          )}
        </div>
        <div
          id="top-losers"
          className="w-full flex flex-col lg:items-start items-center justify-center"
        >
          <Link href={`/coins/losers`}>
            <div className="flex">
              <h3 className="text-lg font-semibold underline text-text-main">
                Top Losers
              </h3>
              <ChevronRight className="h-8 w-8 text-text-muted self-end" />
            </div>
          </Link>
          {loading && <TopCoinsTableRowPlaceholer />}
          {topLosers && !loading && (
            <table className="w-full mt-2">
              <tbody>{renderTableRows(topLosers)}</tbody>
            </table>
          )}
        </div>
        <div
          id="trending"
          className="w-full flex flex-col lg:items-start items-center justify-center"
        >
          <Link href={`/coins/trending`}>
            <div className="flex">
              <h3 className="text-lg font-semibold underline text-text-main">
                Trending
              </h3>
              <ChevronRight className="h-8 w-8 text-text-muted self-end" />
            </div>
          </Link>
          {loading && <TopCoinsTableRowPlaceholer />}
          {trending && !loading && (
            <table className="w-full mt-2">
              <tbody>{renderTableRows(trending)}</tbody>
            </table>
          )}
        </div>
        <div
          id="trending"
          className="w-full flex flex-col lg:items-start items-center justify-center"
        >
          <div className="flex">
            <h3 className="text-lg font-semibold text-text-main">
              Top coins by 24h volume
            </h3>
          </div>
          {loading && <TopCoinsTableRowPlaceholer />}
          {topVolumeCoins && !loading && (
            <table className="w-full mt-2">
              <tbody>{renderTableRows(topVolumeCoins)}</tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
};

export default SmallTables;
