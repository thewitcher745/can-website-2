import { DollarSign, TrendingUpDown, TrendingUp } from "lucide-react";

import { useSummaryForMonthYear } from "@src/domains/results/hooks";
import SummaryItem from "./SummaryItem";
import { GenericLoader } from "@src/shared/ui/loaders";
import GenericError from "@src/shared/ui/GenericError";
import GlassCard from "@src/shared/ui/GlassCard";
import { useMonthYear } from "@src/domains/results/context";

const Summary = () => {
  const { currentMonthYear: monthYear } = useMonthYear();
  const { data, loading, error } = useSummaryForMonthYear(monthYear);

  const winrate = `${data?.winrate.toFixed(2) || 75.1}%`;
  const grossProfit = `+${data?.grossProfit.toFixed(2) || 674.3}%`;
  const drawdown = `-${data?.drawdown.toFixed(2) || 15.2}%`;

  const summaryElement = (
    <div className="w-full divide-y-2 divide-x-2 divide-white/10 grid grid-cols-1 lg:grid-cols-3 rounded-xl">
      <SummaryItem
        title="Winrate"
        valueStr={winrate}
        icon={TrendingUp}
        iconColor="var(--color-primary)"
      />
      <SummaryItem
        title="Gross profit"
        valueStr={grossProfit}
        icon={DollarSign}
        iconColor="var(--color-primary)"
      />
      <SummaryItem
        title="Max drawdown"
        valueStr={drawdown}
        valueColor="color-mix(in srgb, var(--color-secondary) 80%, transparent)"
        icon={TrendingUpDown}
        iconColor="var(--color-secondary)"
      />
    </div>
  );

  if (loading) {
    return (
      <div className="relative">
        <GlassCard className="w-full divide-y-2 divide-x-2 divide-white/10 rounded-xl">
          <div className="blur-sm pointer-events-none animate-pulse">
            {summaryElement}
          </div>
        </GlassCard>

        <div className="absolute inset-0 flex items-center justify-center">
          <GenericLoader />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="relative">
        <div className="blur-sm pointer-events-none animate-pulse">
          {summaryElement}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <GenericError message="Result failed to load! Try again later." />
        </div>
      </div>
    );
  }

  return (
    <GlassCard className="w-full divide-y-2 divide-x-2 divide-white/10 rounded-xl ">
      {summaryElement}
    </GlassCard>
  );
};

export default Summary;
