import React, { useLayoutEffect, useRef, useState } from "react";

interface TooltipProps {
  data: any;
  position: { x: number; y: number };
  containerRef?: any;
}

const Tooltip = ({ data, position, containerRef }: TooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({ opacity: 0 });

  if (!data) return null;

  useLayoutEffect(() => {
    if (tooltipRef.current && containerRef?.current) {
      const tooltipWidth = tooltipRef.current.offsetWidth;
      const tooltipHeight = tooltipRef.current.offsetHeight;
      const containerWidth = containerRef?.current.offsetWidth;
      const containerHeight = containerRef?.current.offsetHeight;

      let top = position.y + 5;
      let left = position.x + 5;

      if (left + tooltipWidth > containerWidth) {
        left = position.x - tooltipWidth - 5;
      }

      if (top + tooltipHeight > containerHeight) {
        top = position.y - tooltipHeight - 5;
      }

      if (left < 0) {
        left = 5;
      }

      if (top < 0) {
        top = 5;
      }

      setStyle({
        position: "absolute",
        left: `${left}px`,
        top: `${top}px`,
        minWidth: "250px",
        opacity: 1,
        transition: "opacity 0.2s",
      });
    }
  }, [data, position, containerRef]);

  const stylizePriceText = (price: number): string => {
    const parts = String(price).split(".");
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const decimalPart = parts[1] || "00";
    return `${integerPart}.${decimalPart}`;
  };

  const priceChange = data.price_change_percentage_24h || 0;
  const isPositive = priceChange >= 0;

  return (
    <div
      ref={tooltipRef}
      className="absolute z-100 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-sm text-gray-800 pointer-events-none"
      style={style}
    >
      <div className="flex items-center mb-3">
        <h3 className="font-bold text-base">{data.name}</h3>
        <span className="text-gray-500 ml-2">{data.symbol.toUpperCase()}</span>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Price:</span>
          <div className="flex items-center">
            <span className="font-semibold">
              ${stylizePriceText(data.current_price || 0)}
            </span>
            <span
              className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded-md ${
                isPositive
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {isPositive ? "▲" : "▼"} {Math.abs(priceChange).toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Market Cap:</span>
          <span className="font-semibold">
            ${stylizePriceText(data.market_cap || 0)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Volume (24h):</span>
          <span className="font-semibold">
            ${stylizePriceText(data.total_volume || 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
