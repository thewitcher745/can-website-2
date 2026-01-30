import Link from "next/link";

import { changeColor, buildChangeStats } from "./utils";
import { CoinCMCInfo, CoinMetaInfo } from "@src/types";

type CoinOverviewSectionProps = {
  symbol: string;
  meta: CoinMetaInfo | null;
  cmc: CoinCMCInfo | null;
};

const CoinOverviewSection = ({
  symbol,
  meta,
  cmc,
}: CoinOverviewSectionProps) => {
  const changeStats = buildChangeStats(cmc);

  return (
    <section className="bg-background border border-border rounded-xl p-6 shadow-xl flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-background flex items-center justify-center overflow-hidden">
            {meta?.logo ? (
              <img
                src={meta.logo}
                alt={meta?.name ?? symbol}
                className="w-12 h-12 object-contain"
              />
            ) : (
              <span className="text-2xl font-semibold text-primary">
                {symbol?.slice(0, 3).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <p className="text-lg text-text-muted">Rank</p>
            <p className="text-2xl font-semibold text-white">
              {cmc?.rank ? `#${cmc.rank}` : "—"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 lg:grid-cols-2 2xl:grid-cols-4 gap-2 text-center">
          {changeStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col justify-between bg-background/60 border border-border rounded-md p-3"
            >
              <p className="text-sm text-text-muted">{stat.label} Change</p>
              <p className={`text-xl font-semibold ${changeColor(stat.value)}`}>
                {stat.value === undefined || stat.value === null
                  ? "—"
                  : `${stat.value > 0 ? "+" : ""}${stat.value.toFixed(2)}%`}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/vip"
            className="inline-flex justify-center items-center rounded-full bg-primary text-black px-6 py-3 font-semibold hover:bg-primary-soft transition"
          >
            Get VIP Signals
          </Link>
          <span className="text-xs text-text-muted text-center">
            Stay ahead with CAN Trading research.
          </span>
        </div>
      </div>
    </section>
  );
};

export default CoinOverviewSection;
