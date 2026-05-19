import { ResponsiveContainer } from "recharts";

/**
 * A wrapper for charts that puts a title above them
 * @param title - THe title above the chart
 * @returns The wrapped chart with the title
 */
const TopTitledChartWrapper = ({
  title,
  height = 350,
  children,
}: {
  title: string;
  height?: number | `${number}%`;
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full py-4" style={{ width: "100%", height: "100%" }}>
      <h3
        style={{
          color: "var(--color-text-main)",
          fontSize: "1rem",
          fontWeight: 600,
          textAlign: "center",
          margin: "0 0 1rem 0",
        }}
      >
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={height}>
        {children}
      </ResponsiveContainer>
    </div>
  );
};

export default TopTitledChartWrapper;
