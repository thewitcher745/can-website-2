import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";

import { useChartsDataForMonthYear } from "@src/domains/results/hooks";
import { ResultsChartsData } from "@src/domains/results/types";
import GenericError from "@src/shared/ui/GenericError";
import { GenericLoader } from "@src/shared/ui/loaders";
import TopTitledChartWrapper from "./TopTitledChartWrapper";

const MARGIN = 50;

const ProfitLineChartBase = ({ data }: { data?: ResultsChartsData | null }) => {
  const cumulativeProfitPercents = data?.cumulativeProfitPercents || [];

  const chartData = [
    { name: "Start", value: 0 },
    ...cumulativeProfitPercents.map((val, index) => ({
      name: `Trade ${index + 1}`,
      value: (val / 100) * MARGIN,
    })),
  ];

  return (
    <TopTitledChartWrapper title="Cumulative profit (50$ per signal)">
      <LineChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="rgba(255,255,255,0.1)"
        />
        <XAxis
          dataKey="name"
          stroke="var(--color-text-main)"
          fontSize={12}
          tickLine={false}
        />
        <YAxis
          stroke="var(--color-text-main)"
          fontSize={12}
          tickLine={false}
          unit="$"
        />
        <ReferenceLine y={0} stroke="var(--color-text-main)" strokeWidth={1} />

        <Tooltip
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
          }}
          itemStyle={{ color: "#fff" }}
          formatter={(value: any) => [`${value.toFixed(1)}%`, "Total Profit"]}
        />

        <Line
          type="monotone"
          dataKey="value"
          dot={false}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </TopTitledChartWrapper>
  );
};

const ProfitLineChart = ({ monthYear }: { monthYear: string }) => {
  const { data, loading, error } = useChartsDataForMonthYear(monthYear);

  if (loading) {
    return (
      <div className="relative">
        <div className="blur-sm pointer-events-none animate-pulse">
          <ProfitLineChartBase data={data} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <GenericLoader />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="relative">
        <div className="blur-sm pointer-events-none">
          <ProfitLineChartBase />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <GenericError message="Result failed to load! Try again later." />
        </div>
      </div>
    );
  }

  return <ProfitLineChartBase data={data} />;
};

export default ProfitLineChart;
