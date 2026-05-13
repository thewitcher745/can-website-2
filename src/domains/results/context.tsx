import { createContext, ReactNode, useContext, useState } from "react";
import { useMonthYearState } from "./hooks";
import { Category, CategoryStateData, MonthYearStateData } from "./types";

// Month year context provider
const initialMonthYearState: MonthYearStateData = {
  years: [],
  months: [],
  
  selectedYear: "",
  setSelectedYear: () => {},

  currentMonthYear: "",
  setCurrentMonthYear: () => {},
};

const MonthYearContext = createContext<MonthYearStateData>(
  initialMonthYearState,
);

export function MonthYearProvider({ children }: { children: ReactNode }) {
  const value = useMonthYearState();

  return (
    <MonthYearContext.Provider value={value}>
      {children}
    </MonthYearContext.Provider>
  );
}

export function useMonthYear() {
  return useContext(MonthYearContext);
}

// Category context provider
const initialCategoryState: CategoryStateData = {
  category: "insights",
  setCategory: () => {},
};

const CategoryContext = createContext<CategoryStateData>(initialCategoryState);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState<Category>("insights");

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  return useContext(CategoryContext);
}
