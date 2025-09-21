import CryptoHeatmap from "./technicals/CryptoHeatmap";

const HeatmapSection: React.FC = () => {
  return (
    <section id="heatmap" className="w-full flex justify-center my-2">
      <div className="2xl:max-w-[100rem] xl:max-w-7xl max-w-6xl w-full flex justify-center">
        <CryptoHeatmap height={600} />
      </div>
    </section>
  );
};

export default HeatmapSection;
