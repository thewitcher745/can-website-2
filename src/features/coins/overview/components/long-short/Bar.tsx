const Bar = ({ longPercentage }: { longPercentage: number }) => {
  return (
    <div className="w-full rounded-full overflow-hidden flex relative">
      <div className="w-full h-8 flex gap-4 justify-center">
        <div
          className="absolute z-1 right-0 h-full bg-error"
          style={{ width: 100 - longPercentage + "%" }}
        />
        <div
          className="absolute z-1 left-0 h-full bg-success"
          style={{ width: longPercentage + "%" }}
        />
        <span className="z-10 text-text-main text-xl">
          {longPercentage.toFixed(2)}%
        </span>
        <span className="z-10 text-text-main text-xl">
          {(100 - longPercentage).toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

export default Bar;
