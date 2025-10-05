import Link from "next/link";
import { ChevronRight } from "lucide-react";

import CryptoHeatmap from "@src/shared/ui/technicals/CryptoHeatmap";

const HeatmapSection: React.FC = () => {
  return (
    <section id="heatmap" className="w-full flex justify-center my-2">
      <div className="max-w-custom w-full flex flex-col items-center lg:items-start justify-center">
        <Link
          href="/coins/overview"
          className="text-text-main font-bold transition-all duration-200 flex items-center pb-4"
        >
          <h2 className="text-2xl font-bold text-text-main title-hover underline">
            Crypto Heatmap
          </h2>
          <ChevronRight className="h-8 w-8 text-text-muted" />
        </Link>
        <div className="w-full sm:px-10">
          <CryptoHeatmap height={400} />
        </div>
      </div>
    </section>
  );
};

export default HeatmapSection;
