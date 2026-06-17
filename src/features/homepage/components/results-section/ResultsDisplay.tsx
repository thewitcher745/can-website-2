import WaterfallChart from "./WaterfallChart";

const ResultsDisplay = ({ monthYearName }: { monthYearName: string }) => {
  return (
    <div className="flex flex-col items-center justify-start h-100 md:h-150 md:w-3/4 w-full">
      <WaterfallChart monthYearName={monthYearName} />
    </div>
  );
};

export default ResultsDisplay;
