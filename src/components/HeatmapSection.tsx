import CryptoHeatmap from "./technicals/CryptoHeatmap";

const HeatmapSection: React.FC = () => {
  return (
    <section id="heatmap" className="w-full flex justify-center my-2">
      <div className="2xl:max-w-[100rem] xl:max-w-7xl max-w-6xl w-full flex flex-col items-center lg:items-start justify-center">
        <h2 className="text-2xl font-bold pb-4 text-text-main">
          Crypto Heatmap
        </h2>
        <div className="w-full sm:px-10">
          <CryptoHeatmap height={400} />
        </div>
      </div>
    </section>
  );
};

export default HeatmapSection;
