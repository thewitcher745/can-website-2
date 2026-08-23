import { useSummaryForMonthYearCategory } from "@src/domains/results/hooks";
import { GenericLoader } from "@src/shared/ui/loaders";
import GenericError from "@src/shared/ui/GenericError";
import { useCategory, useMonthYear } from "@src/domains/results/context";

const MinimalSummary = () => {
  const { currentMonthYear: monthYear } = useMonthYear();
  const { category } = useCategory();
  const { data, loading, error } = useSummaryForMonthYearCategory(
    monthYear,
    category,
  );

  const winrate = `${data?.winrate.toFixed(2) || 0}%`;
  const grossProfit = `+${data?.grossProfit.toFixed(2) || 0}%`;

  if (loading) {
    return (
      <div className="flex gap-4 justify-center text-sm text-text-muted">
        <span>Loading...</span>
      </div>
    );
  }

  if (error || !data) {
    return null;
  }

  return (
    <div className="flex flex-row md:flex-col gap-6 md:gap-4 justify-center text-lg">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-primary">{winrate}</span>
        <span className="text-text-muted font-medium">Winrate</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-success">{grossProfit}</span>
        <span className="text-text-muted font-medium">Gross Profit</span>
      </div>
    </div>
  );
};

export default MinimalSummary;
