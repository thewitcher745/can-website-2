import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";

import { buildApiUrl } from "../../../config";

const HistoricalFearAndGreed = () => {
  const [fngHistory, setFngHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(buildApiUrl(`/api/fng_historical`));
        if (!response.ok) throw new Error("Failed to fetch Fear and Greed.");
        const data = await response.json();
        setFngHistory(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const timeData = fngHistory.map((item) => item.timestamp * 1000);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section
      id="historical-fear-and-greed"
      className="w-full flex justify-center pt-4"
    >
      <div className="2xl:max-w-[100rem] xl:max-w-7xl max-w-6xl relative w-full flex flex-col items-center lg:items-start justify-center">
        <div className="flex flex-col sm:text-left">
          <div className="text-2xl font-bold mb-2 text-text-main transition-colors duration-200">
            Historical Fear and Greed
          </div>
        </div>
        <div className="w-full">
          {fngHistory.length > 0 && (
            <LineChart
              axisHighlight={{
                y: "band",
              }}
              grid={{
                vertical: true,
              }}
              xAxis={[
                {
                  scaleType: "band",
                  data: timeData,
                  tickInterval: (value) =>
                    new Date(value).getDate() === 1 ||
                    new Date(value).getDate() === 16,
                  valueFormatter: (value) => {
                    const date = new Date(value);
                    return `${date.getDate()} ${date.toLocaleString("en-us", {
                      month: "long",
                    })} ${date.getFullYear()}`;
                  },
                },
              ]}
              series={[
                {
                  data: fngHistory.map((item) => item.value),
                  area: true,
                  showMark: false,
                  color: "var(--color-primary)",
                  valueFormatter: (value) =>
                    `${value.toFixed(0)} (${
                      value < 20
                        ? "Extreme Fear"
                        : value < 40
                        ? "Fear"
                        : value < 60
                        ? "Neutral"
                        : value < 80
                        ? "Greed"
                        : "Extreme Greed"
                    })`,
                },
              ]}
              height={400}
            ></LineChart>
          )}
        </div>
      </div>
    </section>
  );
};

export default HistoricalFearAndGreed;
