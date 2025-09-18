import CryptoHeatmap from "./technicals/CryptoHeatmap";

const HeatmapSection: React.FC = () => {
  return (
    <section id="heatmap" className="py-8 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 w-full">
          <CryptoHeatmap />
        </div>
      </div>
    </section>
  );
};

export default HeatmapSection;
