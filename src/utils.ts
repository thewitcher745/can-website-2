import { buildApiUrl } from "./config";

export const getCoinLogoLink = async (symbol: string) => {
  try {
    const response = await fetch(buildApiUrl(`/api/logo/${symbol}`));
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error fetching coin logo:", error);
    return null;
  }
};

export const formatRelativeTime = (time: Date | string, format: string = "long") => {
  // Turns an exact timestamp to a time delta relative to the current time
  if (typeof time === "string") {
    time = new Date(time);
  }

  if (format === "short") {
    if (!time) return "";
    const now = Date.now();

    const diffMs = now - time.getTime();
    if (diffMs < 0) return time.toLocaleString();

    const sec = Math.floor(diffMs / 1000);
    if (sec < 60) return `${sec}s ago`;

    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m ago`;

    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;

    const day = Math.floor(hr / 24);
    if (day < 7) return `${day}d ago`;

    return time.toLocaleDateString();
  }

  if (!time) return "";
    const now = Date.now();
    
    const diffMs = now - time.getTime();
    if (diffMs < 0) return time.toLocaleString();

    const sec = Math.floor(diffMs / 1000);
    if (sec < 60) return "Just now";

    const min = Math.floor(sec / 60);
    if (min < 60) return `${min} minute${min > 1 ? "s" : ""} ago`;

    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr} hour${hr > 1 ? "s" : ""} ago`;

    const day = Math.floor(hr / 24);
    if (day < 7) return `${day} day${day > 1 ? "s" : ""} ago`;

    return time.toLocaleDateString();
}

export const formatPrice = (num: number | string) => {
  const numericalNum = Number(num);
  // Converts the number to a string and separates the integer part every 3 digits from the right.
  const integerPart = String(numericalNum).split(".")[0];
  const decimalPart = String(numericalNum).split(".")[1];
  return `$${integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${decimalPart ? "." + decimalPart : ""}`;
};

export const reduceNumber = (num: number, precision: number = 2) => {
  if (num >= 1000000000000) {
    return `$${(num / 1000000000000).toFixed(precision)}T`;
  } else if (num >= 1000000000) {
    return `$${(num / 1000000000).toFixed(precision)}B`;
  } else if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(precision)}M`;
  } else if (num >= 1000) {
    return `$${(num / 1000).toFixed(precision)}K`;
  }
  return `$${num.toFixed(precision)}`;
};