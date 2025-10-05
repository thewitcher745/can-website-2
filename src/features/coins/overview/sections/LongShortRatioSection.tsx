import LongShortRatio from "../components/long-short/LongShortRatio";
import Title from "../components/Title";

const LongShortRatioSection = () => {
  return (
    <section
      id="long-to-short-ratio"
      className="w-full flex justify-center pt-4"
    >
      <div className="max-w-custom w-full flex flex-col gap-2">
        <Title title="Long to Short Orders Ratio" />
        <LongShortRatio />
      </div>
    </section>
  );
};

export default LongShortRatioSection;
