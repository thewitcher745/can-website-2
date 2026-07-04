import { useMonthYear } from "@src/domains/results/context";
import { Calendar } from "lucide-react";

const ServicesMonthYearSelector = () => {
  const {
    years,
    selectedYear,
    setSelectedYear,
    months,
    currentMonthYear,
    setCurrentMonthYear,
  } = useMonthYear();

  return (
    <div className="flex flex-row md:flex-col justify-center items-center gap-4 mb-8">
      <Calendar size={30} className="hidden md:block text-text-main" />
      <div className="w-full">
        <label
          htmlFor="year-select"
          className="block text-sm font-medium text-text-muted mb-2 text-center md:text-left"
        >
          Year
        </label>
        <select
          id="year-select"
          className="w-full text-center border-b-2 px-4 py-2.5 
          text-base bg-transparent text-text-main shadow-sm hover:border-primary 
          transition-colors cursor-pointer"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full">
        <label
          htmlFor="month-select"
          className="block text-sm font-medium text-text-muted mb-2 text-center md:text-left"
        >
          Month
        </label>
        <select
          id="month-select"
          className="w-full text-center border-b-2 px-4 py-2.5 
          bg-transparent text-text-main hover:border-primary 
          transition-colors cursor-pointer"
          value={currentMonthYear}
          onChange={(e) => setCurrentMonthYear(e.target.value)}
          disabled={!selectedYear || months.length === 0}
        >
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ServicesMonthYearSelector;
