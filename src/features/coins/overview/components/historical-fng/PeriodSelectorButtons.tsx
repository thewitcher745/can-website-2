const PeriodSelectorButtons = ({
  setNDataPoints,
  nDataPoints,
}: {
  setNDataPoints: React.Dispatch<React.SetStateAction<number>>;
  nDataPoints: number;
}) => {
  const buttonClassname = "w-10 h-10 rounded hover:bg-text-muted/60 ";

  function handleButtonClick(nDataPoints: number) {
    setNDataPoints(nDataPoints);
  }

  const PeriodSelectionButton = ({
    period,
    label,
  }: {
    period: number;
    label: string;
  }) => {
    return (
      <button
        className={
          buttonClassname +
          (nDataPoints === period
            ? "text-primary hover:text-primary"
            : "text-text-muted hover:text-text-main")
        }
        onClick={() => handleButtonClick(period)}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-text-muted">Period:</span>
      <PeriodSelectionButton period={30} label="1M" />
      <PeriodSelectionButton period={90} label="3M" />
      <PeriodSelectionButton period={180} label="6M" />
      <PeriodSelectionButton period={365} label="1Y" />
      <PeriodSelectionButton period={500} label="All" />
    </div>
  );
};

export default PeriodSelectorButtons;
