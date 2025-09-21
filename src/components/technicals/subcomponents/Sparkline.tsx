import React from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";

const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  return (
    <div className="w-full">
      <Sparklines data={data}>
        <SparklinesLine
          style={{ stroke: color, fill: "none", strokeWidth: 1 }}
        />
      </Sparklines>
    </div>
  );
};

export default Sparkline;
