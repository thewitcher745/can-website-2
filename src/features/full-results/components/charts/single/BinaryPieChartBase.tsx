import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Legend,
  Tooltip,
  PieSectorShapeProps,
  Sector,
} from "recharts";

interface BinaryPieChartBaseProps {
  data?: {
    label: string;
    value: number;
    color: string;
  }[];
  title: string;
}

const BinaryPieChartBase = ({ data, title }: BinaryPieChartBaseProps) => {
  const defaultData = [
    { label: "Profit", value: 80, color: "#22c55e" },
    { label: "Loss", value: 20, color: "#f59e0b" },
  ];

  const chartData = data || defaultData;

  const PieSection = (props: PieSectorShapeProps) => (
    <Sector {...props} fill={defaultData[props.index].color} />
  );

  const renderTooltip = (props: any) => {
    if (!props.active || !props.payload || props.payload.length === 0) {
      return null;
    }

    const data = props.payload[0];
    const item = chartData.find((d) => d.label === data.name);

    return (
      <div
        style={{
          backgroundColor: "#1e293b",
          border: "none",
          borderRadius: "8px",
          padding: "8px 12px",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            color: item?.color || "#fff",
            fontWeight: 500,
          }}
        >
          {data.name}: {data.value.toFixed(1)}%
        </p>
      </div>
    );
  };

  const renderLegend = (props: any) => {
    return (
      <ul
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          listStyle: "none",
          padding: 0,
          margin: "10px 0 0 0",
        }}
      >
        {chartData.map((entry, index) => (
          <li
            key={`legend-${index}`}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: entry.color,
                display: "inline-block",
              }}
            />
            <span style={{ color: "var(--color-text-main)", fontSize: "14px" }}>
              {entry.label}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div
      className="relative w-full"
      style={{
        height: 250,
      }}
    >
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
            nameKey="label"
            stroke="none"
            shape={PieSection}
          ></Pie>
          <Tooltip content={renderTooltip} />
          <Legend content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>

      <div
        style={{
          position: "absolute",
          top: "46%", // Adjust slightly based on Legend height
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <h3
          style={{
            color: "var(--color-text-main)",
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          {title}
        </h3>
      </div>
    </div>
  );
};

export default BinaryPieChartBase;
