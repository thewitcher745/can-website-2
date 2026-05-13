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
import { deriveMonths, deriveYears } from "./utils";

interface QueryResult<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

/**
 * Fetches available categories for a month-year
 *
 * @param monthYear - The month-year string to fetch data for. Month should be in
 * lowercase and short form. example jul-2024.
 * @returns List of categories ("insights" or "algorithms" or both)
 */
export function useCategoriesForMonthYear(
  monthYear: string,
): QueryResult<Category[]> {
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
): QueryResult<TradeData[] | null> {
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
): QueryResult<MonthSummaryData | null> {
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
): QueryResult<ResultsChartsData | null> {
  const { data, loading, error } = useQuery(
    () => resultsApi.getChartsDataForMonthYear(monthYear, category),
    [monthYear, category],
  );

  return { data, loading, error };
}

/**
 * Hook for handling month-year selection on results page.
 *
 * @returns Object containing list of all years, selected year, all months and current month-year
 * plus their dispatch functions.
 */
export function useMonthYearState() {
  const { data } = useQuery(resultsApi.getAvailableMonthYears, []);
  const available = data ?? [];

  const years = deriveYears(available);
  const [selectedYear, setSelectedYear] = useState<string>("");

  // Set default year once
  useEffect(() => {
    if (years.length && !selectedYear) setSelectedYear(years[0]);
  }, [years]);

  const months = deriveMonths(available, selectedYear);
  const [currentMonthYear, setCurrentMonthYear] = useState<string>("");

  // Set default month when year changes
  useEffect(() => {
    setCurrentMonthYear(months[0]?.value ?? "");
  }, [selectedYear]);

  return {
    years,
    selectedYear,
    setSelectedYear,
    months,
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
