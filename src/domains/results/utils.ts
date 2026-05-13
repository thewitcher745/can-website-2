import { MonthOptionData } from "./types";

/**
 * Utility function for results page monthYear selector
 */
const parseMonthYearString = (
  monthYear: string,
): { monthKey: string; year: string; monthName: string } => {
  const [monthKey, year] = monthYear.split("-");
  const monthName = new Date(
    parseInt(year),
    monthOrder[monthKey] - 1,
    1,
  ).toLocaleString("default", { month: "long" });
  return { monthKey, year, monthName };
};

/**
 *
 * @param available - List of available monthYears
 * @returns The list of years derived from the monthYears
 */
export function deriveYears(available: string[]): string[] {
  return [
    ...new Set(available.map((my) => parseMonthYearString(my).year)),
  ].sort((a, b) => parseInt(b) - parseInt(a));
}

const monthOrder: { [key: string]: number } = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

/**
 *
 * @param available - List of available monthYears
 * @param selectedYear - The selected year as a string
 * @returns The list of available months derived from the monthYears
 */
export function deriveMonths(
  available: string[],
  selectedYear: string,
): MonthOptionData[] {
  return available
    .filter((my) => parseMonthYearString(my).year === selectedYear)
    .map((my) => ({
      original: my,
      monthKey: parseMonthYearString(my).monthKey,
    }))
    .sort((a, b) => monthOrder[b.monthKey] - monthOrder[a.monthKey])
    .map((m) => ({
      label: parseMonthYearString(m.original).monthName,
      value: m.original,
    }));
}
