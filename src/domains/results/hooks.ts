import { useEffect, useState } from "react";

import useQuery from "@src/lib/hooks/useQuery";
import { resultsApi } from "./api";
import {
  Category,
  MonthSummaryData,
  MonthYearStateData,
  ResultsChartsData,
  TradeData,
} from "./types";

type UseTradesForMonthYearResult = {
  data: TradeData[] | null;
  loading: boolean;
  error: string | null;
};

type UseSummaryForMonthYearResult = {
  data: MonthSummaryData | null;
  loading: boolean;
  error: string | null;
};

type UseChartsDataForMonthYearResult = {
  data: ResultsChartsData | null;
  loading: boolean;
  error: string | null;
};

type UseCategoriesForMonthYear = {
  data: Category[];
  loading: boolean;
  error: string | null;
};

/**
 * Fetches available categories for a month-year
 *
 * @param monthYear - The month-year string to fetch data for. Month should be in
 * lowercase and short form. example jul-2024.
 * @returns List of categories ("insights" or "algorithms" or both)
 */
export function useCategoriesForMonthYear(
  monthYear: string,
): UseCategoriesForMonthYear {
  const { data, loading, error } = useQuery(
    () => resultsApi.getCategoriesForMonthYear(monthYear),
    [monthYear],
  );

  return { data: data || ["insights"], loading, error };
}

/**
 * Fetches full trade data for a month-year-category
 *
 * @param monthYear - The month-year string to fetch data for. Month should be in
 * lowercase and short form. example jul-2024.
 * @param category - The category to fetch the data for, "insights" or "algorithm"
 * @returns List of trade data, and loading and error states for the fetch
 */
export function useTradesForMonthYearCategory(
  monthYear: string,
  category: Category,
): UseTradesForMonthYearResult {
  const { data, loading, error } = useQuery(
    () => resultsApi.getTradesForMonthYear(monthYear, category),
    [monthYear, category],
  );

  return { data, loading, error };
}

/**
 * Fetches the summary for a month-year-category, including gross profit, winrate and drawdown.
 *
 * @param monthYear - The month-year string to fetch data for. Month should be in
 * lowercase and short form. example jul-2024.
 * @returns Month-year summary information, and loading and error states for the fetch
 */
export function useSummaryForMonthYearCategory(
  monthYear: string,
  category: Category,
): UseSummaryForMonthYearResult {
  const { data, loading, error } = useQuery(
    () => resultsApi.getSummaryForMonthYear(monthYear, category),
    [monthYear, category],
  );

  return { data, loading, error };
}

/**
 * Fetches the results chart data for a month-year-category, combined for all charts.
 *
 * @param monthYear - The month-year string to fetch data for. Month should be in
 * lowercase and short form. example jul-2024.
 * @returns Results chart data, and loading and error states for the fetch
 */
export function useChartsDataForMonthYearCategory(
  monthYear: string,
  category: "insights" | "algorithm",
): UseChartsDataForMonthYearResult {
  const { data, loading, error } = useQuery(
    () => resultsApi.getChartsDataForMonthYear(monthYear, category),
    [monthYear, category],
  );

  return { data, loading, error };
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
 * Hook for handling month-year selection on results page.
 *
 * @returns Object containing list of all years, selected year, all months and current month-year
 * plus their dispatch functions.
 */
export function useMonthYearSelector(): MonthYearStateData {
  const [allYears, setAllYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [allMonths, setAllMonths] = useState<
    { label: string; value: string }[]
  >([]);
  const [currentMonthYear, setCurrentMonthYear] = useState<string>(""); // e.g., "mar-2025"

  const { data } = useQuery(resultsApi.getAvailableMonthYears, []);

  const availableMonthYears = data || [];

  useEffect(() => {
    // Populate years, sorted descending
    const years = [
      ...new Set(
        availableMonthYears.map((my) => parseMonthYearString(my).year),
      ),
    ].sort((a, b) => parseInt(b) - parseInt(a));
    setAllYears(years);

    if (years.length > 0) {
      const latestYear = years[0];
      setSelectedYear(latestYear);
    }
  }, [availableMonthYears]);

  useEffect(() => {
    if (selectedYear) {
      const monthsInYear = availableMonthYears
        .filter((my) => parseMonthYearString(my).year === selectedYear)
        .map((my) => ({
          original: my, // "mar-2025"
          monthKey: parseMonthYearString(my).monthKey, // "mar"
        }))
        .sort((a, b) => monthOrder[b.monthKey] - monthOrder[a.monthKey]); // Sort months descending (Dec, Nov, ...)

      const displayMonths = monthsInYear.map((m) => ({
        label: parseMonthYearString(m.original).monthName, // "MARCH"
        value: m.original, // "mar-2025"
      }));
      setAllMonths(displayMonths);

      if (displayMonths.length > 0) {
        // If currentMonthYear's year is different or it's not set, update it
        if (
          !currentMonthYear ||
          parseMonthYearString(currentMonthYear).year !== selectedYear
        ) {
          setCurrentMonthYear(displayMonths[0].value); // Select the latest month of the new year
        }
      } else {
        setCurrentMonthYear(""); // No months for this year
      }
    }
  }, [selectedYear, currentMonthYear]); // Added currentMonthYear to dependencies to handle initial load correctly

  return {
    allYears,
    setAllYears,
    selectedYear,
    setSelectedYear,
    allMonths,
    setAllMonths,
    currentMonthYear,
    setCurrentMonthYear,
  };
}

/**
 * Function for managing results modalObject display for zooming results charts.
 *
 * @returns The modalObject for zooming and its dispatch function.
 */
export function useResultsModal() {
  const [modalObject, setModalObject] = useState<string | null>(null);

  // Close modalObject on ESC key or mobile back
  useEffect(() => {
    if (!modalObject) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalObject(null);
    };
    window.addEventListener("keydown", handler);

    // Handle mobile back (popstate)
    const onPopState = () => {
      setModalObject(null);
    };
    window.addEventListener("popstate", onPopState);
    // Push a new state when modalObject opens
    window.history.pushState({ modalObject: true }, "");

    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("popstate", onPopState);
      // When closing modalObject, go back if last state was modalObject
      if (window.history.state && window.history.state.modalObject) {
        window.history.back();
      }
    };
  }, [modalObject]);
}
