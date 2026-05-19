import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Rectangle,
} from "recharts";

import { useChartsDataForMonthYearCategory } from "@src/domains/results/hooks";
import { ResultsChartsData, Category } from "@src/domains/results/types";
import GenericError from "@src/shared/ui/GenericError";
import { GenericLoader } from "@src/shared/ui/loaders";
import TopTitledChartWrapper from "./TopTitledChartWrapper";

const TargetsBarChartBase = ({ data }: { data?: ResultsChartsData | null }) => {
  const processedData = (data?.perTargetRatio || [])
    .filter((item) => item.targetId !== 0)
    .sort((a, b) => b.targetId - a.targetId);

  const chartData =
    processedData.length > 0
      ? processedData.map((item) => ({
          name: `TP${item.targetId}`,
          value: item.targetPercentage,
        }))
      : [
          { name: "TP1", value: 10 },
          { name: "TP2", value: 30 },
          { name: "TP3", value: 10 },
          { name: "TP4", value: 50 },
        ];

  const renderCustomBar = (props: any) => {
    const { x, y, width, height, index } = props;

    // Your heat scale: Red -> Orange -> Teal -> Blue
    const targetColors = ["#ef4444", "#f59e0b", "#06b6d4", "#3b82f6"];
    const fill = targetColors[index] || targetColors[targetColors.length - 1];

    // We return a standard Recharts Rectangle with our dynamic fill
    return <Rectangle {...props} fill={fill} radius={[4, 4, 0, 0]} />;
  };

  return (
    <TopTitledChartWrapper title="Target distribution">
      <BarChart
        layout="vertical"
        data={chartData}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="rgba(255,255,255,0.1)"
        />
        {/* <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--color-text-main)", fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--color-text-main)", fontSize: 12 }}
          unit="%"
        /> */}
        <XAxis type="number" />
        <YAxis
          dataKey="name"
          type="category"
          stroke="var(--color-text-main)"
          fontSize={12}
        />
        <Tooltip
          cursor={{ fill: "rgba(255,255,255,0.05)" }}
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
          }}
          itemStyle={{ color: "#fff" }}
          formatter={(value: any) => [
            `${(value as number).toFixed(1)}%`,
            "Hit Rate",
          ]}
        />
        <Legend
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{ paddingTop: "10px", opacity: 0 }}
        />
        <Bar dataKey="value" radius={[4, 4, 0, 0]} shape={renderCustomBar} />
      </BarChart>
    </TopTitledChartWrapper>
  );
};

const TargetsBarChart = ({
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

  if (loading) {
    return (
      <div className="relative">
        <div className="blur-sm pointer-events-none animate-pulse">
          <TargetsBarChartBase data={data} />
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
          <TargetsBarChartBase />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <GenericError message="Result failed to load! Try again later." />
        </div>
      </div>
    );
  }

  return <TargetsBarChartBase data={data} />;
};

export default TargetsBarChart;
