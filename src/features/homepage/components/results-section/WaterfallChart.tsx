import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

import { toWaterfallDataset } from "./numericalData";

const WaterfallChart = ({ monthYearName }: { monthYearName: string }) => {
  const dataset = toWaterfallDataset(monthYearName);

  function genericFormatter(value: number) {
    return value === 0 || value === null ? null : `${value.toFixed(2)}%`;
  }

  function increaseFormatter(value: number) {
    return value === 0 || value === null ? null : `+${value.toFixed(2)}%`;
  }

  function decreaseFormatter(value: number) {
    return value === 0 || value === null ? null : `-${value.toFixed(2)}%`;
  }

  return (
    <div id="waterfall-chart" className="w-full h-full">
      <BarChart
        dataset={dataset as any}
        skipAnimation={true}
        xAxis={[
          {
            dataKey: "idx",
            scaleType: "band",
            label: "Signal Number",
            valueFormatter: (idx, context) => `${idx}`,
          },
        ]}
        yAxis={[
          {
            label: "Gross profit %",
            valueFormatter: (value: number) =>
              dataset[0].bottomPadding > 0
                ? String(value)
                : String(value + dataset[0].bottomPadding),
          },
        ]}
        slotProps={{
          legend: {
            sx: {
              fontSize: 14,
              color: "white",
            },
          },
        }}
        series={[
          {
            dataKey: "base",
            stack: "wf",
            color: "transparent",
            label: "Total gross profit",
            valueFormatter: (value: number) => null,
          },
          {
            dataKey: "inc",
            stack: "wf",
            color: "#22c55e", // green
            label: "Increase",
            valueFormatter: increaseFormatter as any,
          },
          {
            dataKey: "dec",
            stack: "wf",
            color: "#f59e0b", // amber
            label: "Decrease",
            valueFormatter: decreaseFormatter as any,
          },
        ]}
        sx={{
          // Optional theming to mimic your screenshot
          "*": { color: "w-full" },
          "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": { fontWeight: 500 },
          "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
            fontWeight: 500,
          },
          "& .MuiChartsGrid-line": { opacity: 0.35 },
        }}
      />
    </div>
  );
};

export default WaterfallChart;
