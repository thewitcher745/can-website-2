import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { buildApiUrl } from "../../config";

const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

interface FngData {
  value: number;
  value_classification: string;
}

const FearAndGreed = () => {
  const [fngData, setFngData] = useState<FngData | null>(null);
  const [loading, isLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(buildApiUrl(`/api/fng`));
        const data = await response.json();
        setFngData(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load fear and greed data."
        );
      } finally {
        isLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-surface p-3 rounded-md w-full max-w-sm">
      <div className="flex justify-between flex-col-reverse sm:flex-row items-center mb-1">
        {/* <Link href={`/${tables[currentIndex].slug}`}> */}
        <div className="flex justify-center w-full">
          <h3 className="text-lg p-3 font-bold text-text-main">
            Fear and Greed
          </h3>
          {/* <ChevronRight className="h-8 w-8 text-text-muted self-end" /> */}
        </div>
        {/* </Link> */}
      </div>
      <GaugeComponent
        value={fngData?.value || 50}
        type="semicircle"
        marginInPercent={{ top: 0.06, bottom: 0.0, left: 0, right: 0 }}
        labels={{
          valueLabel: {
            formatTextValue: (value) =>
              `${value} (${fngData?.value_classification})`,
            style: {
              color: "#fff",
              fontWeight: "semibold",
              textWrap: "wrap",
              width: "120px",
              whiteSpace: "pre-wrap",
            },
          },
          tickLabels: {
            ticks: [
              { value: 20 },
              { value: 40 },
              { value: 60 },
              { value: 80 },
              { value: 100 },
            ],
            defaultTickValueConfig: {
              hide: true,
            },
            defaultTickLineConfig: {
              hide: true,
            },
          },
        }}
        arc={{
          colorArray: ["#5BE12C", "#EA4228"],
          subArcs: [
            { limit: 0 },
            { limit: 20 },
            { limit: 40 },
            { limit: 60 },
            { limit: 80 },
            { limit: 100 },
          ],
          padding: 0.02,
          width: 0.1,
        }}
        pointer={{
          type: "blob",
          width: 10,
          animate: false,
        }}
      />
    </div>
  );
};

export default FearAndGreed;
