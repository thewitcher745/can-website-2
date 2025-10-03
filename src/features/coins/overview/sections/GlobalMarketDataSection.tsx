import GlobalMarketData from "../components/global-market-data/GlobalMarketData";
import Title from "../components/Title";

const GlobalMarketDataSection = () => {
  return (
    <section
      id="global-market-data"
      className="w-full flex justify-center pt-8"
    >
      <div className="2xl:max-w-[100rem] xl:max-w-7xl max-w-6xl w-full">
        <GlobalMarketData />
      </div>
    </section>
  );
};

export default GlobalMarketDataSection;
