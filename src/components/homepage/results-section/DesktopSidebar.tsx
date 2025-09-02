import React from 'react';

interface DesktopSidebarProps {
  allYears: string[];
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  monthsForSelectedYear: string[];
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ 
  allYears, 
  selectedYear, 
  setSelectedYear, 
  monthsForSelectedYear, 
  selectedMonth, 
  setSelectedMonth 
}) => (
  <aside className="hidden md:block md:w-1/4 h-full min-h-0">
    <div className="flex flex-col gap-6 bg-background rounded-xl border border-border-strong p-3 shadow-inner h-full overflow-y-auto">
      {/* Year Selector */}
      <div>
        <h4 className="text-sm font-semibold text-text-main mb-2 px-1">Year</h4>
        <div className="flex flex-col gap-1">
          {allYears.map((year) => (
            <button
              key={year}
              className={`w-full px-4 py-2 rounded-lg font-medium transition text-left whitespace-nowrap border-2 bg-surface hover:bg-primary/10 focus:outline-none ${
                selectedYear === year
                  ? "bg-primary/20 border-primary text-text-main font-semibold"
                  : "text-text-muted border-transparent"
              }`}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Month Selector */}
      <div>
        <h4 className="text-sm font-semibold text-text-main mb-2 px-1">Month</h4>
        <div className="flex flex-col gap-1">
          {monthsForSelectedYear.map((month) => (
            <button
              key={month}
              className={`w-full px-4 py-2 rounded-lg font-medium transition text-left whitespace-nowrap border-2 bg-surface hover:bg-primary/10 focus:outline-none ${
                selectedMonth === month
                  ? "bg-primary/20 border-primary text-text-main font-semibold"
                  : "text-text-muted border-transparent"
              }`}
              onClick={() => setSelectedMonth(month)}
              disabled={!selectedYear || monthsForSelectedYear.length === 0}
            >
              {month}
            </button>
          ))}
        </div>
      </div>
    </div>
  </aside>
);

export default DesktopSidebar;
