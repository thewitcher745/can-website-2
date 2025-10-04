import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { AreaPlot, LinePlot } from "@mui/x-charts/LineChart";
import { LineSeriesType } from "@mui/x-charts/models";
import { ChartsAxisHighlight, ChartsTooltip } from "@mui/x-charts";

import YRangeHighlighting from "./YRangeHighlighting";

const ChartElement = ({
  drawChartData = true,
  timeData = [],
  fngHistory = [],
  nDataPoints = 180,
}: {
  drawChartData?: boolean;
  timeData?: number[];
  fngHistory?: any[];
  nDataPoints?: number;
}) => {
  // Set tickInterval based on the period selected
  const tickInterval = (value: any) => {
    if (nDataPoints === 30) return new Date(value).getDate() % 5 === 0;

    if (nDataPoints === 90) return new Date(value).getDate() % 10 === 0;

    if (nDataPoints === 180) return new Date(value).getDate() % 15 === 0;
    else return new Date(value).getDate() % 30 === 0;
  };

  const config = {
    series: [
      {
        type: "line",
        data: fngHistory.map((item) => item.value),
        color: "var(--color-primary)",
        showMark: false,
        valueFormatter: (value) => {
          if (value == null) return "N/A";
          const v = Number(value);
          return `${v.toFixed(0)} (${
            v < 20
              ? "Extreme Fear"
              : v < 40
              ? "Fear"
              : v < 60
              ? "Neutral"
              : v < 80
              ? "Greed"
              : "Extreme Greed"
          })`;
        },
      },
      {
        type: "line",
        data: fngHistory.map((item) => item.value),
        color: "var(--color-primary)",
        showMark: false,
        area: true,
        valueFormatter: (value) => {
          if (value == null) return "N/A";
          const v = Number(value);
          return `${v.toFixed(0)} (${
            v < 20
              ? "Extreme Fear"
              : v < 40
              ? "Fear"
              : v < 60
              ? "Neutral"
              : v < 80
              ? "Greed"
              : "Extreme Greed"
          })`;
        },
      },
    ] as LineSeriesType[],
    grid: {
      vertical: true,
    },
    xAxis: [
      {
        scaleType: "point",
        data: timeData,
        // Create the ticks on the x axis relative to the number of data points.
        tickInterval: tickInterval,
        valueFormatter: (value: any) => {
          const date = new Date(value);
          return `${date.getDate()} ${date.toLocaleString("en-us", {
            month: "long",
          })} ${date.getFullYear()}`;
        },
      } as const,
    ],
    yAxis: [
      {
        scaleType: "linear",
        min: 0,
        max: 100,
      } as const,
    ],
    height: 500,
  };

  const ReferenceLine = ({ y }: { y: number }) => {
    return (
      <ChartsReferenceLine
        lineStyle={{
          strokeDasharray: "5 5",
          stroke: "var(--color-text-muted)",
        }}
        labelStyle={{
          fill: "var(--color-text-muted)",
        }}
        y={y}
        label=""
        labelAlign="start"
      />
    );
  };

  return (
    <ChartContainer {...config}>
      {drawChartData && <AreaPlot />}
      <ReferenceLine y={0} />
      <ReferenceLine y={20} />
      <ReferenceLine y={40} />
      <ReferenceLine y={60} />
      <ReferenceLine y={80} />
      {drawChartData && <LinePlot />}
      <ChartsXAxis />
      <ChartsYAxis />
      <ChartsTooltip />
      <ChartsAxisHighlight x="band" />
      <YRangeHighlighting />
    </ChartContainer>
  );
};

export default ChartElement;
