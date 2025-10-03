import LongShortRatio from "../components/long-short/LongShortRatio";

const LongShortRatioSection = () => {
  return (
    <section
      id="long-to-short-ratio"
      className="w-full flex justify-center pt-4"
    >
      <div className="2xl:max-w-[100rem] xl:max-w-7xl max-w-6xl w-full flex gap-2">
        <LongShortRatio />
      </div>
    </section>
  );
};

export default LongShortRatioSection;
