import { FaChartLine, FaTrophy } from "react-icons/fa6";

import Caret from "@src/shared/ui/Caret";

const Stats = ({
  netProfit,
  winrate,
}: {
  netProfit?: string;
  winrate?: string;
}) => {
  return (
    <div className="flex flex-col gap-8 border-l-2 border-primary py-6 pl-2">
      {netProfit && (
        <div className="flex gap-1 items-center justify-between">
          <div className="flex items-center">
            <FaTrophy className="mr-2 text-primary" />
            <p className="text-text-muted text-xl">Gross profit</p>
          </div>
          <div className="flex gap-1 items-center">
            <Caret change={10}></Caret>
            <p className="text-2xl text-success">{netProfit}%</p>
          </div>
        </div>
      )}
      {winrate && (
        <div className="flex gap-1 items-center justify-between">
          <div className="flex items-center">
            <FaChartLine className="mr-2 text-primary" />
            <p className="text-text-muted text-xl">Winrate</p>
          </div>
          <p className="text-2xl text-success">{winrate}%</p>
        </div>
      )}
    </div>
  );
};

export default Stats;
