import LongShortPieChart from "./single/LongShortPieChart";
import WinratePieChart from "./single/WinratePieChart";
import TargetsBarChart from "./single/TargetsBarChart";
import GlassCard from "@src/shared/ui/GlassCard";
import { useCategory, useMonthYear } from "@src/domains/results/context";

const CombinedWinrateLongShortTargetCharts = () => {
  const { currentMonthYear: monthYear } = useMonthYear();
  const { category } = useCategory();

  return (
    <GlassCard className="w-full my-2 rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 divide-x-0 md:divide-y-0 md:divide-x-2 divide-white/10">
        <WinratePieChart monthYear={monthYear} category={category} />
        <LongShortPieChart monthYear={monthYear} category={category} />
      </div>
      <TargetsBarChart monthYear={monthYear} category={category} />
    </GlassCard>
  );
};

export default CombinedWinrateLongShortTargetCharts;
