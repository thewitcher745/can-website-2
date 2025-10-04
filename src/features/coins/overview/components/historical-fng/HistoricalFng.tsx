import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { AreaPlot, LinePlot } from "@mui/x-charts/LineChart";
import { LineSeriesType } from "@mui/x-charts/models";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";
import {
  ChartsAxisHighlight,
  ChartsTooltip,
  useDrawingArea,
} from "@mui/x-charts";
import { useEffect, useState } from "react";

import { buildApiUrl } from "@src/config";
import { GenericLoader } from "@src/shared/ui/loaders";
import GenericError from "@src/shared/ui/GenericError";

function DrawingAreaBox() {
  const { left, top, width, height } = useDrawingArea();
  return (
    <>
      <svg d={`M ${left} ${top} l ${width} 0 l 0 ${height} l -${width} 0 Z`} />
      <rect
        x={left}
        y={top}
        width={width}
        height={height / 5}
        fill="var(--color-success)"
        fillOpacity="0.2"
      />
      <rect
        x={left}
        y={top + (4 * height) / 5}
        width={width}
        height={height / 5}
        fill="var(--color-error)"
        fillOpacity="0.2"
      />
      <text
        x={left + 10}
        y={top + (height * 9) / 10 + 5}
        fontSize={12}
        textAnchor="start"
        fill="var(--color-text-main)"
      >
        Extreme Fear
      </text>
      <text
        x={left + 10}
        y={top + (height * 3) / 5 + height / 10 + 5}
        fontSize={12}
        textAnchor="start"
        fill="var(--color-text-main)"
      >
        Fear
      </text>
      <text
        x={left + 10}
        y={top + (height * 2) / 5 + height / 10 + 5}
        fontSize={12}
        textAnchor="start"
        fill="var(--color-text-main)"
      >
        Neutral
      </text>
      <text
        x={left + 10}
        y={top + height / 5 + height / 10 + 5}
        fontSize={12}
        textAnchor="start"
        fill="var(--color-text-main)"
      >
        Greed
      </text>
      <text
        x={left + 10}
        y={top + height / 10 + 5}
        fontSize={12}
        textAnchor="start"
        fill="var(--color-text-main)"
      >
        Extreme Greed
      </text>
    </>
  );
}

const PeriodSelectorButtons = ({
  setNDataPoints,
  nDataPoints,
}: {
  setNDataPoints: React.Dispatch<React.SetStateAction<number>>;
  nDataPoints: number;
}) => {
  const buttonClassname = "w-10 h-10 rounded hover:bg-text-muted/60 ";

  function handleButtonClick(nDataPoints: number) {
    setNDataPoints(nDataPoints);
  }

  const PeriodSelectionButton = ({
    period,
    label,
  }: {
    period: number;
    label: string;
  }) => {
    return (
      <button
        className={
          buttonClassname +
          (nDataPoints === period
            ? "text-primary hover:text-primary"
            : "text-text-muted hover:text-text-main")
        }
        onClick={() => handleButtonClick(period)}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-text-muted">Period:</span>
      <PeriodSelectionButton period={30} label="1M" />
      <PeriodSelectionButton period={90} label="3M" />
      <PeriodSelectionButton period={180} label="6M" />
      <PeriodSelectionButton period={365} label="1Y" />
      <PeriodSelectionButton period={500} label="All" />
    </div>
  );
};

const HistoricalFng = () => {
  const [fngHistory, setFngHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nDataPoints, setNDataPoints] = useState(30);

  useEffect(() => {
    setLoading(true);
    fetch(buildApiUrl(`/api/fng_historical?limit=${nDataPoints}`))
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setFngHistory(response.reverse());
      })
      .catch((e) => setError("Oops! Something went wrong."))
      .finally(() => {
        setLoading(false);
      });
  }, [nDataPoints]);

  const timeData = fngHistory.map((item) => item.timestamp * 1000);

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
        tickInterval: (value: any) =>
          new Date(value).getDate() === 1 || new Date(value).getDate() === 16,
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

  if (loading) {
    return (
      <div className="relative w-full">
        <div className="pl-15 flex items-center justify-between">
          <PeriodSelectorButtons
            nDataPoints={nDataPoints}
            setNDataPoints={setNDataPoints}
          />
        </div>
        <div className="blur-sm">
          <ChartContainer {...config}>
            <ChartsReferenceLine
              lineStyle={{
                strokeDasharray: "5 5",
                stroke: "var(--color-text-muted)",
              }}
              labelStyle={{
                fill: "var(--color-text-muted)",
              }}
              y={0}
              label=""
              labelAlign="start"
            />
            <ChartsReferenceLine
              lineStyle={{
                strokeDasharray: "5 5",
                stroke: "var(--color-text-muted)",
              }}
              labelStyle={{
                fill: "var(--color-text-muted)",
              }}
              y={20}
              label=""
              labelAlign="start"
            />
            <ChartsReferenceLine
              lineStyle={{
                strokeDasharray: "5 5",
                stroke: "var(--color-text-muted)",
              }}
              labelStyle={{
                fill: "var(--color-text-muted)",
              }}
              y={40}
              label=""
              labelAlign="start"
            />
            <ChartsReferenceLine
              lineStyle={{
                strokeDasharray: "5 5",
                stroke: "var(--color-text-muted)",
              }}
              labelStyle={{
                fill: "var(--color-text-muted)",
              }}
              y={60}
              label=""
              labelAlign="start"
            />
            <ChartsReferenceLine
              lineStyle={{
                strokeDasharray: "5 5",
                stroke: "var(--color-text-muted)",
              }}
              labelStyle={{
                fill: "var(--color-text-muted)",
              }}
              y={80}
              label=""
              labelAlign="start"
            />
            <ChartsXAxis />
            <ChartsYAxis />
            <ChartsTooltip />
            <ChartsAxisHighlight x="band" />
            <DrawingAreaBox />
          </ChartContainer>
        </div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <GenericLoader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full">
        <div className="pl-15 flex items-center justify-between">
          <PeriodSelectorButtons
            nDataPoints={nDataPoints}
            setNDataPoints={setNDataPoints}
          />
        </div>
        <div className="blur-sm">
          <ChartContainer {...config}>
            <ChartsReferenceLine
              lineStyle={{
                strokeDasharray: "5 5",
                stroke: "var(--color-text-muted)",
              }}
              labelStyle={{
                fill: "var(--color-text-muted)",
              }}
              y={0}
              label=""
              labelAlign="start"
            />
            <ChartsReferenceLine
              lineStyle={{
                strokeDasharray: "5 5",
                stroke: "var(--color-text-muted)",
              }}
              labelStyle={{
                fill: "var(--color-text-muted)",
              }}
              y={20}
              label=""
              labelAlign="start"
            />
            <ChartsReferenceLine
              lineStyle={{
                strokeDasharray: "5 5",
                stroke: "var(--color-text-muted)",
              }}
              labelStyle={{
                fill: "var(--color-text-muted)",
              }}
              y={40}
              label=""
              labelAlign="start"
            />
            <ChartsReferenceLine
              lineStyle={{
                strokeDasharray: "5 5",
                stroke: "var(--color-text-muted)",
              }}
              labelStyle={{
                fill: "var(--color-text-muted)",
              }}
              y={60}
              label=""
              labelAlign="start"
            />
            <ChartsReferenceLine
              lineStyle={{
                strokeDasharray: "5 5",
                stroke: "var(--color-text-muted)",
              }}
              labelStyle={{
                fill: "var(--color-text-muted)",
              }}
              y={80}
              label=""
              labelAlign="start"
            />
            <ChartsXAxis />
            <ChartsYAxis />
            <ChartsTooltip />
            <ChartsAxisHighlight x="band" />
            <DrawingAreaBox />
          </ChartContainer>
        </div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <GenericError message={error} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        <div className="pl-15 flex items-center justify-between">
          <PeriodSelectorButtons
            nDataPoints={nDataPoints}
            setNDataPoints={setNDataPoints}
          />
        </div>
        {fngHistory.length > 0 && (
          <ChartContainer {...config}>
            <ChartsReferenceLine
              lineStyle={{
                strokeDasharray: "5 5",
                stroke: "var(--color-text-muted)",
              }}
              labelStyle={{
                fill: "var(--color-text-muted)",
              }}
              y={0}
              label=""
              labelAlign="start"
            />
            <ChartsReferenceLine
              lineStyle={{
                strokeDasharray: "5 5",
                stroke: "var(--color-text-muted)",
              }}
              labelStyle={{
                fill: "var(--color-text-muted)",
              }}
              y={20}
              label=""
              labelAlign="start"
            />
            <ChartsReferenceLine
              lineStyle={{
                strokeDasharray: "5 5",
                stroke: "var(--color-text-muted)",
              }}
              labelStyle={{
                fill: "var(--color-text-muted)",
              }}
              y={40}
              label=""
              labelAlign="start"
            />
            <ChartsReferenceLine
              lineStyle={{
                strokeDasharray: "5 5",
                stroke: "var(--color-text-muted)",
              }}
              labelStyle={{
                fill: "var(--color-text-muted)",
              }}
              y={60}
              label=""
              labelAlign="start"
            />
            <ChartsReferenceLine
              lineStyle={{
                strokeDasharray: "5 5",
                stroke: "var(--color-text-muted)",
              }}
              labelStyle={{
                fill: "var(--color-text-muted)",
              }}
              y={80}
              label=""
              labelAlign="start"
            />
            <LinePlot />
            <AreaPlot />
            <ChartsXAxis />
            <ChartsYAxis />
            <ChartsTooltip />
            <ChartsAxisHighlight x="band" />
            <DrawingAreaBox />
          </ChartContainer>
        )}
      </div>
    </>
  );
};

export default HistoricalFng;
