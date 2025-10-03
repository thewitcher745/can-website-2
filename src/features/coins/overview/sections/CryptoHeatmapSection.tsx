import CryptoHeatmapComponent from "../components/heatmap/CryptoHeatmap";

const CryptoHeatmapSection = () => {
  return (
    <section id="crypto-heatmap" className="w-full flex justify-center pt-8">
      <div className="2xl:max-w-[100rem] xl:max-w-7xl max-w-6xl w-full flex flex-col lg:flex-row justify-center">
        <CryptoHeatmapComponent />
      </div>
    </section>
  );
};

export default CryptoHeatmapSection;
