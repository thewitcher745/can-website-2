import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Rectangle,
  ResponsiveContainer,
} from "recharts";

import { useChartsDataForMonthYearCategory } from "@src/domains/results/hooks";
import { ResultsChartsData } from "@src/domains/results/types";
import GenericError from "@src/shared/ui/GenericError";
import { GenericLoader } from "@src/shared/ui/loaders";
import TopTitledChartWrapper from "./single/TopTitledChartWrapper";
import GlassCard from "@src/shared/ui/GlassCard";
import { useCategory, useMonthYear } from "@src/domains/results/context";

const MARGIN_USD = 50;

const CombinedProfitChartBase = ({
  data,
}: {
  data?: ResultsChartsData | null;
}) => {
  const profitPercents = data?.profitPercents || [];
  const cumulativeProfitPercents = data?.cumulativeProfitPercents || [];

  // Merge data into one array for the ComposedChart
  let cumulativeTracker = 0;
  const chartData = profitPercents.map((delta, i) => {
    const start = cumulativeTracker;
    cumulativeTracker += delta;

    // Calculate the $ value from the cumulative % provided in data
    const cumulativeUSD = (cumulativeProfitPercents[i] / 100) * MARGIN_USD;

    return {
      name: `Trade ${i + 1}`,
      displayRange: [start, cumulativeTracker], // For Waterfall
      delta: delta, // For Waterfall color logic
      cumulativeUSD: cumulativeUSD, // For Line Chart
      isIncrease: delta >= 0,
    };
  });

  // Custom bar shape for waterfall colors
  const renderWaterfallBar = (props: any) => {
    const { payload } = props;
    const fill = payload.isIncrease ? "#22c55e" : "#f59e0b";
    return <Rectangle {...props} fill={fill} />;
  };

  return (
    <GlassCard className="rounded-xl">
      <TopTitledChartWrapper
        title="Cumulative profit for this month"
        height={500}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
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

            {/* Left Y-Axis for Waterfall (%) */}
            <YAxis
              yAxisId="left"
              orientation="left"
              // stroke="#22c55e"
              fontSize={12}
              tickLine={false}
              unit="%"
            />

            {/* Right Y-Axis for Cumulative Profit ($) */}
            <YAxis
              yAxisId="right"
              orientation="right"
              // stroke="#3b82f6"
              fontSize={12}
              tickLine={false}
              unit="$"
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
              itemStyle={{ color: "#fff" }}
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              formatter={(value: any, name: any, entry: any) => {
                // entry.payload contains the original object from the chartData array

                if (name === "Trade Change (%)") {
                  return [`${entry.payload.delta.toFixed(1)}%`, name];
                }
              }}
            />

            <ReferenceLine
              yAxisId="left"
              y={0}
              stroke="var(--color-text-main)"
              strokeWidth={1}
            />

            {/* Waterfall Bars mapped to Left Axis */}
            <Bar
              yAxisId="left"
              dataKey="displayRange"
              shape={renderWaterfallBar}
              name="Trade Change (%)"
            />

            {/* Cumulative Line mapped to Right Axis */}
            {/* <Line
            yAxisId="right"
            type="basis"
            dataKey="cumulativeUSD"
            stroke="#3b82f6aa"
            strokeWidth={5}
            dot={false}
            activeDot={{ r: 6 }}
            name="Total Profit ($)"
          /> */}
          </ComposedChart>
        </ResponsiveContainer>
      </TopTitledChartWrapper>
    </GlassCard>
  );
};

const CombinedProfitChart = () => {
  const { currentMonthYear: monthYear } = useMonthYear();
  const { category } = useCategory();

  const { data, loading, error } = useChartsDataForMonthYearCategory(
    monthYear,
    category,
  );

  if (loading) {
    return (
      <div className="relative">
        <GlassCard className="w-full rounded-xl">
          <div className="blur-sm pointer-events-none animate-pulse">
            <CombinedProfitChartBase data={data} />
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
        <GlassCard className="w-full rounded-xl">
          <div className="blur-sm pointer-events-none">
            <CombinedProfitChartBase />
          </div>
        </GlassCard>

        <div className="absolute inset-0 flex items-center justify-center">
          <GenericError message="Result failed to load! Try again later." />
        </div>
      </div>
    );
  }

  return <CombinedProfitChartBase data={data} />;
};

export default CombinedProfitChart;
