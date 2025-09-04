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
