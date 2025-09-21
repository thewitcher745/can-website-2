import CryptoHeatmap from "./technicals/CryptoHeatmap";

const HeatmapSection: React.FC = () => {
  return (
    <section id="heatmap" className="w-full flex justify-center">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 w-full">
          <CryptoHeatmap />
        </div>
      </div>
    </section>
  );
};

export default HeatmapSection;
