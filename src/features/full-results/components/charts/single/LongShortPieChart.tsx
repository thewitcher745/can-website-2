import { useChartsDataForMonthYear } from "@src/domains/results/hooks";
import BinaryPieChartBase from "./BinaryPieChartBase";
import { GenericLoader } from "@src/shared/ui/loaders";
import GenericError from "@src/shared/ui/GenericError";

const LongShortPieChart = ({ monthYear }: { monthYear: string }) => {
  const { data, loading, error } = useChartsDataForMonthYear(monthYear);

  const longTradesPercentage = data?.longTradesPercentage || 0;

  const chartData = [
    { label: "Long", value: longTradesPercentage, color: "#22c55e" },
    { label: "Short", value: 100 - longTradesPercentage, color: "#f59e0b" },
  ];

  if (loading) {
    return (
      <div className="relative">
        {/* Blurred skeleton */}
        <div className="blur-sm pointer-events-none animate-pulse">
          <BinaryPieChartBase title="Winrate" />
        </div>

        {/* Loader overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <GenericLoader />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="relative">
        {/* Blurred skeleton */}
        <div className="blur-sm pointer-events-none">
          <BinaryPieChartBase title="Winrate" />
        </div>

        {/* Loader overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <GenericError message="Result failed to load! Try again later." />
        </div>
      </div>
    );
  }

  return <BinaryPieChartBase data={chartData} title="Direction" />;
};

export default LongShortPieChart;
