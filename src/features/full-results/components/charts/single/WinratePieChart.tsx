import { useChartsDataForMonthYearCategory } from "@src/domains/results/hooks";
import BinaryPieChartBase from "./BinaryPieChartBase";
import { GenericLoader } from "@src/shared/ui/loaders";
import GenericError from "@src/shared/ui/GenericError";
import { Category } from "@src/domains/results/types";

const WinratePieChart = ({
  monthYear,
  category,
}: {
  monthYear: string;
  category: Category;
}) => {
  const { data, loading, error } = useChartsDataForMonthYearCategory(
    monthYear,
    category,
  );

  const winrate = data?.winrate || 0;

  const chartData = [
    { label: "Profit", value: winrate, color: "#22c55e" },
    { label: "Loss", value: 100 - winrate, color: "#f59e0b" },
  ];

  if (loading) {
    return (
      <div className="relative">
        {/* Blurred skeleton */}
        <div className="blur-sm pointer-events-none animate-pulse">
          <BinaryPieChartBase title="Winrate" data={chartData} />
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
          <BinaryPieChartBase title="Winrate" data={chartData} />
        </div>

        {/* Loader overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <GenericError message="Result failed to load! Try again later." />
        </div>
      </div>
    );
  }

  return <BinaryPieChartBase data={chartData} title="Winrate" />;
};

export default WinratePieChart;
