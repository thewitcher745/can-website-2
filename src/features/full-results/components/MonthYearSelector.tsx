import { useMonthYear } from "@src/domains/results/context";
import { Calendar } from "lucide-react";

const MonthYearSelector = () => {
  const {
    allYears,
    selectedYear,
    setSelectedYear,
    allMonths,
    currentMonthYear,
    setCurrentMonthYear,
  } = useMonthYear();

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
      <Calendar size={30} className="hidden sm:block self-end text-text-main" />
      <div className="w-full sm:w-auto">
        <label
          htmlFor="year-select"
          className="block text-sm font-medium text-text-muted mb-2 text-center sm:text-left"
        >
          Year
        </label>
        <select
          id="year-select"
          className="w-full sm:w-auto min-w-[140px] border-b-2 px-4 py-2.5 
          text-base bg-transparent text-text-main shadow-sm hover:border-primary 
          transition-colors cursor-pointer"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {allYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full sm:w-auto">
        <label
          htmlFor="month-select"
          className="block text-sm font-medium text-text-muted mb-2 text-center sm:text-left"
        >
          Month
        </label>
        <select
          id="month-select"
          className="w-full sm:w-auto min-w-[140px] border-b-2 px-4 py-2.5 
          bg-transparent text-text-main hover:border-primary 
          transition-colors cursor-pointer"
          value={currentMonthYear}
          onChange={(e) => setCurrentMonthYear(e.target.value)}
          disabled={!selectedYear || allMonths.length === 0}
        >
          {allMonths.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MonthYearSelector;
