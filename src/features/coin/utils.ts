import { reduceNumber } from "@src/utils";
import { CoinCMCInfo, CoinMetaInfo } from "@src/types";

type NullableNumber = number | null | undefined;

export const formatPercent = (
  value?: NullableNumber,
  fractionDigits = 2
): string => {
  if (value === undefined || value === null) return "—";
  return `${value.toFixed(fractionDigits)}%`;
};

export const changeColor = (value?: NullableNumber) => {
  if (value === undefined || value === null) return "text-text-muted";
  return value >= 0 ? "text-success" : "text-error";
};

export const getHostname = (url?: string) => {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

export const formatPostTimestamp = (time?: string) => {
  if (!time) return "—";
  const date = new Date(time);
  const datePart = date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timePart = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${datePart} · ${timePart}`;
};

export const buildChangeStats = (cmc?: CoinCMCInfo | null) => [
  { label: "1h", value: cmc?.change_1h },
  { label: "24h", value: cmc?.change_24h },
  { label: "7d", value: cmc?.change_7d },
  { label: "30d", value: cmc?.change_30d },
];

export const buildOverviewStats = (cmc?: CoinCMCInfo | null) => [
  {
    label: "Market Cap",
    value:
      cmc?.market_cap === undefined || cmc?.market_cap === null
        ? "—"
        : reduceNumber(cmc.market_cap),
  },
  {
    label: "Fully Diluted",
    value:
      cmc?.diluted_market_cap === undefined || cmc?.diluted_market_cap === null
        ? "—"
        : reduceNumber(cmc.diluted_market_cap),
  },
  { label: "Rank", value: cmc?.rank ? `#${cmc.rank}` : "—" },
];

export const buildLinkGroups = (meta?: CoinMetaInfo | null) => [
  { label: "Website", values: meta?.urls?.website },
  { label: "Explorer", values: meta?.urls?.explorer },
  { label: "Source Code", values: meta?.urls?.source_code },
  { label: "Whitepaper", values: meta?.urls?.technical_doc },
  { label: "Community", values: meta?.urls?.reddit },
  { label: "Announcements", values: meta?.urls?.announcements },
];
