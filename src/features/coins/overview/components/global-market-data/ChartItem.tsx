import { useState, useEffect } from "react";
import Image from "next/image";

import { buildApiUrl } from "@src/config";
import { formatPrice, reduceNumber } from "@src/utils";
import { ChartItemProps } from "@src/types";

const ChartIcon = ({
  symbol,
  className,
}: {
  symbol: string;
  className?: string;
}) => {
  const [link, setLink] = useState<string>("");

  useEffect(() => {
    fetch(buildApiUrl(`/api/logo/${symbol}`))
      .then((res) => {
        return res.json();
      })
      .then(setLink)
      .catch(() => "");
  }, []);

  return (
    <div
      className={`aspect-square w-10 h-10 min-w-10 sm:min-w-12 sm:w-12 sm:h-12 p-0 sm:p-1 bg-text-main rounded-full border-2 border-primary overflow-hidden ${className}`}
    >
      {link === "" ? (
        <div className="w-full h-full aspect-square rounded-full bg-primary"></div>
      ) : (
        <div className="size-full aspect-square rounded-full overflow-hidden">
          <Image
            src={link}
            alt={symbol}
            width={64}
            height={64}
            className="size-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

const ChartItem = ({
  key,
  widthPercentage,
  chartItem,
  barColor,
}: {
  key: string;
  widthPercentage: number;
  chartItem: ChartItemProps;
  barColor: string;
}) => {
  return (
    <li
      key={key}
      className="flex items-center justify-center py-2 w-full xs:w-80 sm:w-full"
    >
      <div className="flex items-center justify-center">
        <div className="flex flex-col gap-1 w-25 pr-2">
          <span className="text-text-main font-semibold text-right">
            {chartItem.name}
          </span>
          <span className="text-text-muted font-semibold text-right">
            {formatPrice(chartItem.price.toFixed(2))}
          </span>
        </div>
        <ChartIcon symbol={chartItem.symbol} className="z-2 max-w-20" />
      </div>
      <div className="relative sm:flex-1">
        <div
          className="hidden sm:block relative h-4 bg-offwhite rounded-r-full -translate-x-1 z-1"
          style={{ width: `${widthPercentage}%`, backgroundColor: barColor }}
        ></div>
        <div className="hidden xs:block sm:absolute pl-2 top-0 left-0 text-text-main text-lg font-semibold sm:-translate-y-full">
          {formatPrice(chartItem.market_cap.toFixed(0))}
        </div>
        <div className="block xs:hidden sm:absolute pl-2 top-0 left-0 text-text-main text-lg font-semibold sm:-translate-y-full">
          {reduceNumber(chartItem.market_cap)}
        </div>
      </div>
    </li>
  );
};

export default ChartItem;
