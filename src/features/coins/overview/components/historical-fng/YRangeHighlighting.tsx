import { useDrawingArea } from "@mui/x-charts";

const YRangeHighlighting = () => {
  const { left, top, width, height } = useDrawingArea();
  return (
    <>
      <svg d={`M ${left} ${top} l ${width} 0 l 0 ${height} l -${width} 0 Z`} />
      <rect
        x={left}
        y={top}
        width={width}
        height={height / 5}
        fill="var(--color-success)"
        fillOpacity="0.2"
      />
      <rect
        x={left}
        y={top + (4 * height) / 5}
        width={width}
        height={height / 5}
        fill="var(--color-error)"
        fillOpacity="0.2"
      />
      <text
        x={left + 10}
        y={top + (height * 9) / 10 + 5}
        fontSize={12}
        textAnchor="start"
        fill="var(--color-text-main)"
      >
        Extreme Fear
      </text>
      <text
        x={left + 10}
        y={top + (height * 3) / 5 + height / 10 + 5}
        fontSize={12}
        textAnchor="start"
        fill="var(--color-text-main)"
      >
        Fear
      </text>
      <text
        x={left + 10}
        y={top + (height * 2) / 5 + height / 10 + 5}
        fontSize={12}
        textAnchor="start"
        fill="var(--color-text-main)"
      >
        Neutral
      </text>
      <text
        x={left + 10}
        y={top + height / 5 + height / 10 + 5}
        fontSize={12}
        textAnchor="start"
        fill="var(--color-text-main)"
      >
        Greed
      </text>
      <text
        x={left + 10}
        y={top + height / 10 + 5}
        fontSize={12}
        textAnchor="start"
        fill="var(--color-text-main)"
      >
        Extreme Greed
      </text>
    </>
  );
};

export default YRangeHighlighting;
