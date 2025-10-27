import WaterfallChart from "./WaterfallChart";

const ResultsDisplay = ({ monthYearName }: { monthYearName: string }) => {
  return (
    <div className="flex flex-col items-start justify-center h-100 md:h-150 md:w-3/4 overflow-x-auto overflow-y-hidden">
      <div className="h-full w-full min-w-md md:min-w-auto">
        <WaterfallChart monthYearName={monthYearName} />
      </div>
    </div>
  );
};

export default ResultsDisplay;
