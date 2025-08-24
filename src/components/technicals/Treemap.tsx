import React, { ReactElement, useEffect, useRef, useState } from "react";
// @ts-ignore
import * as d3 from "d3";
import { ChevronDown, ChevronUp } from "lucide-react";

import { buildApiUrl } from "../../config";

interface HeatmapNode {
  name: string;
  market_cap: number;
  children?: HeatmapNode[];
}

interface TreemapProps {
  width?: number;
  height?: number;
}

const Treemap: React.FC<TreemapProps> = ({ width = 600, height = 400 }) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const [data, setData] = useState<HeatmapNode | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(buildApiUrl(`/api/heatmap`));
        const json = await response.json();
        setData(json);
        console.log(json);
      } catch (e) {
        setData(null);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!data || !ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    // Transform flat array to hierarchy structure if needed
    let hierarchyData;
    if (Array.isArray(data)) {
      // If data is a flat array, wrap it in a root object
      hierarchyData = {
        name: "Root",
        market_cap: 0,
        children: data,
      };
    } else {
      hierarchyData = data;
    }

    // Map market_cap to value for d3
    const root = d3.hierarchy(hierarchyData).sum((d: any) => d.market_cap || 0);

    d3
      .treemap<HeatmapNode>()
      .tile(d3.treemapBinary)
      .size([width, height])
      .padding(2)(root);

    // Custom color function based on price_change_percentage_24h
    const getColor = (priceChange: number) => {
      if (priceChange > 0) return "#16C784"; // Positive - green
      if (priceChange < 0) return "#C5151F"; // Negative - red
      return "#808A9D"; // Zero or null - gray
    };

    const stylizePriceText = (price: number): string => {
      // Converts the number to a string and separates the integer part every 3 digits from the right.
      const integerPart = String(price).split(".")[0];
      const decimalPart = String(price).split(".")[1];
      return `${integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${
        decimalPart || "00"
      }`;
    };

    const getSymbolFontSize = (rectangleArea: number) => {
      // This value multiplied by the rectangle width would give the font size in em
      const scalingCoeff = 0.0001;

      return `${(rectangleArea * scalingCoeff) ** 0.5}em`;
    };

    const getPriceFontSize = (rectangleArea: number) => {
      // This value multiplied by the rectangle width would give the font size in em
      const scalingCoeff = 0.00003;

      return `${(rectangleArea * scalingCoeff) ** 0.5}em`;
    };

    const getChangePercentageFontSize = (rectangleArea: number) => {
      // This value multiplied by the rectangle width would give the font size in em
      const scalingCoeff = 0.00002;

      return `${(rectangleArea * scalingCoeff) ** 0.5}em`;
    };

    const getChangePercentageCaret = (priceChange: number) => {
      if (priceChange > 0) return "▲";
      return "▼";
    };

    svg
      .selectAll("g")
      .data(root.leaves())
      .enter()
      .append("g")
      .attr("transform", (d: any) => `translate(${d.x0},${d.y0})`)
      .each(function (d: any) {
        d3.select(this)
          .append("rect")
          .attr("width", d.x1 - d.x0)
          .attr("height", d.y1 - d.y0)
          .attr("fill", getColor(d.data.price_change_percentage_24h || 0));

        // Use foreignObject to embed HTML content
        d3.select(this)
          .append("foreignObject")
          .attr("width", d.x1 - d.x0)
          .attr("height", d.y1 - d.y0)
          .append("xhtml:div")
          .attr(
            "class",
            "h-full w-full flex justify-center items-center treemap-label p-1 text-white overflow-hidden"
          ) // Add custom classes for styling
          .html(
            `<div class="flex flex-col justify-center items-center">
              <div style="font-size: ${getSymbolFontSize(
                (d.x1 - d.x0) * (d.y1 - d.y0)
              )}">${d.data.symbol}</div>
              <div style="font-size: ${getPriceFontSize(
                (d.x1 - d.x0) * (d.y1 - d.y0)
              )}">$${stylizePriceText(d.data.current_price || 0)}</div>
              <div style="font-size: ${getChangePercentageFontSize(
                (d.x1 - d.x0) * (d.y1 - d.y0)
              )}">
              ${getChangePercentageCaret(d.data.price_change_percentage_24h)}
              ${(Math.abs(d.data.price_change_percentage_24h) || 0).toFixed(
                2
              )}%</div>
            </div>`
          );
      });
  }, [data, width, height]);

  return (
    <section className="py-8 w-full bg-background flex justify-center">
      <div className="max-w-[1500px] bg-surface p-4 py-8 rounded radius-6 w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 pl-4 text-text-main">
          Crypto Heatmap
        </h2>
        <svg ref={ref} width={width} height={height} className="block" />
        {!data && (
          <div className="mt-4 text-text-main">Loading heatmap data...</div>
        )}
      </div>
    </section>
  );
};

export default Treemap;
