import React from 'react';

interface MobileSelectorsProps {
  allYears: string[];
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  monthsForSelectedYear: string[];
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
}

const MobileSelectors: React.FC<MobileSelectorsProps> = ({ 
  allYears, 
  selectedYear, 
  setSelectedYear, 
  monthsForSelectedYear, 
  selectedMonth, 
  setSelectedMonth 
}) => (
  <div className="md:hidden">
    <div className="mb-4">
      <label htmlFor="year-select-mobile" className="block text-sm font-medium text-text-muted mb-1">Select Year:</label>
      <select
        id="year-select-mobile"
        className="w-full p-2 rounded-lg bg-background border border-border-strong text-text-main focus:outline-none focus:ring-2 focus:ring-primary"
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

    <div className="mb-4">
      <label htmlFor="month-select-mobile" className="block text-sm font-medium text-text-muted mb-1">Select Month:</label>
      <select
        id="month-select-mobile"
        className="w-full p-2 rounded-lg bg-background border border-border-strong text-text-main focus:outline-none focus:ring-2 focus:ring-primary"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        disabled={!selectedYear || monthsForSelectedYear.length === 0}
      >
        {monthsForSelectedYear.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default MobileSelectors;
