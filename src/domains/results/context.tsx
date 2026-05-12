import { createContext, ReactNode, useContext } from "react";
import { useMonthYearSelector } from "./hooks";
import { MonthYearStateData } from "./types";

const initialState: MonthYearStateData = {
  allYears: [],
  setAllYears: () => {},

  selectedYear: "",
  setSelectedYear: () => {},

  allMonths: [],
  setAllMonths: () => {},

  currentMonthYear: "",
  setCurrentMonthYear: () => {},
};

const MonthYearContext = createContext<MonthYearStateData>(initialState);

export function MonthYearProvider({ children }: { children: ReactNode[] }) {
  const value = useMonthYearSelector();

  return (
    <MonthYearContext.Provider value={value}>
      {children}
    </MonthYearContext.Provider>
  );
}

export function useMonthYear() {
  return useContext(MonthYearContext);
}
