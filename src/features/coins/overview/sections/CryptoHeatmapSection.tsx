import CryptoHeatmapComponent from "../components/heatmap/CryptoHeatmap";
import Title from "../components/Title";

const CryptoHeatmapSection = () => {
  return (
    <section id="crypto-heatmap" className="w-full flex justify-center pt-8">
      <div className="2xl:max-w-[100rem] xl:max-w-7xl max-w-6xl w-full flex flex-col justify-center gap-2">
        <Title title="Crypto Heatmap" />
        <CryptoHeatmapComponent />
      </div>
    </section>
  );
};

export default CryptoHeatmapSection;
