import { CoinCMCInfo } from "@src/types";

import { buildOverviewStats, formatPercent } from "./utils";
import { reduceNumber } from "@src/utils";

type KeyMetricsSectionProps = {
  cmc: CoinCMCInfo | null;
};

const KeyMetricsSection = ({ cmc }: KeyMetricsSectionProps) => {
  const overviewStats = buildOverviewStats(cmc);

  return (
    <section className="bg-background border border-border rounded-xl p-6 shadow-inner space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Key Metrics</h2>
        {cmc?.name && (
          <span className="text-sm text-text-muted uppercase tracking-[0.25em]">
            Updated Live
          </span>
        )}
      </div>
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          {overviewStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-background/40 border border-border rounded-2xl px-4 py-3"
            >
              <p className="text-sm text-text-muted">{stat.label}</p>
              <p className="text-xl font-semibold text-white mt-1">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {typeof cmc?.dominance === "number" && (
          <div className="border border-border rounded-2xl p-4 bg-background/40">
            <p className="text-text-muted text-sm mb-1">Dominance</p>
            <div className="flex flex-col gap-1">
              <p className="text-2xl font-semibold text-white">
                {formatPercent(cmc.dominance)}
              </p>
              <p className="text-xs text-text-muted">
                Market cap share:{" "}
                {cmc.market_cap ? reduceNumber(cmc.market_cap) : "—"}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default KeyMetricsSection;
