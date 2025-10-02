import { useState, useEffect } from "react";

import { TopCoin } from "@src/types";
import SmallTable from "./SmallTable";
import { buildApiUrl } from "@src/config";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const TableTitle = ({ title, link }: { title: string; link: string }) => {
  return (
    <Link href={link}>
      <div className="flex items-center h-12 gap-2">
        <h2 className="text-text-main text-xl underline title-hover font-semibold mb-2">
          {title}
        </h2>
        <ChevronRight className="w-6 h-6 text-text-muted" />
      </div>
    </Link>
  );
};

const SmallTables = () => {
  const [topGainers, setTopGainers] = useState<TopCoin[] | null>(null);
  const [topLosers, setTopLosers] = useState<TopCoin[] | null>([]);
  const [trending, setTrending] = useState<TopCoin[] | null>(null);
  const [topVolumeCoins, setTopVolumeCoins] = useState<TopCoin[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(buildApiUrl(`/api/coins_tables_summary`))
      .then((res) => res.json())
      .then((data) => {
        setTopGainers(data.top_gainers);
        setTopLosers(data.top_losers);
        setTrending(data.trending);
        setTopVolumeCoins(data.top_volume);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <TableTitle title="Top Gainers" link="/coins/gainers" />
        <SmallTable dataLoading={loading} coins={topGainers} />
      </div>
      <div className="flex flex-col">
        <TableTitle title="Top Losers" link="/coins/losers" />
        <SmallTable dataLoading={loading} coins={topLosers} />
      </div>
      <div className="flex flex-col">
        <TableTitle title="Trending" link="/coins/trending" />
        <SmallTable dataLoading={loading} coins={trending} />
      </div>
      <div className="flex flex-col">
        <TableTitle title="Top Volume" link="/coins/volume" />
        <SmallTable dataLoading={loading} coins={topVolumeCoins} />
      </div>
    </>
  );
};

export default SmallTables;
