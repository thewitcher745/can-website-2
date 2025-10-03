import HistoricalFng from "../components/historical-fng/HistoricalFng";
import Title from "../components/Title";

const HistoricalFearAndGreedSection = () => {
  return (
    <section
      id="historical-fear-and-greed"
      className="w-full flex justify-center pt-4"
    >
      <div className="2xl:max-w-[100rem] xl:max-w-7xl max-w-6xl relative w-full flex flex-col items-center lg:items-start justify-center">
        <Title title="Historical Fear and Greed" />
        <HistoricalFng />
      </div>
    </section>
  );
};

export default HistoricalFearAndGreedSection;
