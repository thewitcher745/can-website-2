import Link from "next/link";
import { useMemo } from "react";

import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { AreaPlot, LinePlot } from "@mui/x-charts/LineChart";
import type { LineSeriesType } from "@mui/x-charts/models";
import { ChartsAxisHighlight, ChartsTooltip } from "@mui/x-charts";

import GenericError from "@src/shared/ui/GenericError";

type ClosingPricePoint = {
  time: number;
  close: number;
};

type ClosingPriceHistorySectionProps = {
  symbol: string;
  period: number;
  points: ClosingPricePoint[] | null;
  error?: string | null;
};

const ALLOWED_PERIODS = [30, 90, 180, 365, 500] as const;

const periodLabel = (period: number) => {
  switch (period) {
    case 30:
      return "1M";
    case 90:
      return "3M";
    case 180:
      return "6M";
    case 365:
      return "1Y";
    case 500:
      return "All";
    default:
      return String(period);
  }
};

const formatUsd = (value: unknown) => {
  if (value == null) return "N/A";
  const v = Number(value);
  if (Number.isNaN(v)) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: v >= 1 ? 2 : 6,
  }).format(v);
};

const ClosingPriceHistorySection = ({
  symbol,
  period,
  points,
  error,
}: ClosingPriceHistorySectionProps) => {
  const normalizedPeriod = (
    ALLOWED_PERIODS.includes(period as any) ? period : 30
  ) as (typeof ALLOWED_PERIODS)[number];

  const dataset = useMemo(() => {
    if (!points || points.length === 0) return [];
    return points;
  }, [points]);

  const timeData = useMemo(() => dataset.map((p) => p.time), [dataset]);
  const priceData = useMemo(() => dataset.map((p) => p.close), [dataset]);

  const tickInterval = (value: any) => {
    const d = new Date(value);

    if (normalizedPeriod === 30) return d.getDate() % 5 === 0;
    if (normalizedPeriod === 90) return d.getDate() % 10 === 0;
    if (normalizedPeriod === 180) return d.getDate() % 15 === 0;
    if (normalizedPeriod === 365)
      return d.getMonth() % 2 === 0 && d.getDate() === 1;

    return d.getMonth() % 3 === 0 && d.getDate() === 1;
  };

  const series = useMemo(
    () =>
      [
        {
          type: "line",
          data: priceData,
          color: "var(--color-primary)",
          showMark: false,
          valueFormatter: (value) => formatUsd(value),
        },
        {
          type: "line",
          data: priceData,
          color: "var(--color-primary)",
          showMark: false,
          area: true,
          valueFormatter: (value) => formatUsd(value),
        },
      ] as LineSeriesType[],
    [priceData]
  );

  const config = {
    series,
    grid: {
      vertical: true,
    },
    xAxis: [
      {
        scaleType: "point",
        data: timeData,
        tickInterval: tickInterval,
        valueFormatter: (value: any) => {
          const date = new Date(value);
          return `${date.getDate()} ${date.toLocaleString("en-us", {
            month: "short",
          })} ${date.getFullYear()}`;
        },
      } as const,
    ],
    yAxis: [
      {
        scaleType: "linear",
        width: 88,
        valueFormatter: (value: any) => {
          const v = Number(value);
          if (Number.isNaN(v)) return String(value);
          return formatUsd(v);
        },
      } as const,
    ],
    height: 460,
    sx: {
      "& .MuiChartsGrid-line": { opacity: 0.35 },
      "& .MuiChartsAxis-tickLabel": { fontWeight: 500 },
    },
  };

  return (
    <section className="bg-background border border-border rounded-xl p-6 shadow-inner space-y-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-primary-soft">
            Price History
          </p>
          <h2 className="text-2xl font-semibold text-white">
            {symbol.toUpperCase()} closing price
          </h2>
          <p className="text-text-muted">
            Historical close (USD) by selected period.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-text-muted text-sm">Period:</span>
          {ALLOWED_PERIODS.map((p) => (
            <Link
              key={p}
              href={{
                pathname: `/coin/${symbol.toLowerCase()}`,
                query: { period: p },
              }}
              className={
                "w-10 h-10 rounded flex items-center justify-center hover:bg-text-muted/60 " +
                (normalizedPeriod === p
                  ? "text-primary hover:text-primary"
                  : "text-text-muted hover:text-text-main")
              }
              prefetch={false}
            >
              {periodLabel(p)}
            </Link>
          ))}
        </div>
      </div>

      {error ? (
        <div className="relative w-full min-h-[420px] flex items-center justify-center">
          <GenericError message={error} />
        </div>
      ) : dataset.length === 0 ? (
        <div className="text-text-muted text-sm border border-dashed border-border rounded-2xl p-6 text-center">
          No chart data available.
        </div>
      ) : (
        <div className="w-full">
          <ChartContainer {...config}>
            <AreaPlot />
            <LinePlot />
            <ChartsXAxis />
            <ChartsYAxis />
            <ChartsTooltip />
            <ChartsAxisHighlight x="band" />
          </ChartContainer>
        </div>
      )}
    </section>
  );
};

export default ClosingPriceHistorySection;
