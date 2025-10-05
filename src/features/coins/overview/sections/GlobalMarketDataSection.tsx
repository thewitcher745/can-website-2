import GlobalMarketData from "../components/global-market-data/GlobalMarketData";
import Title from "../components/Title";

const GlobalMarketDataSection = () => {
  return (
    <section
      id="global-market-data"
      className="w-full flex justify-center pt-8"
    >
      <div className="max-w-custom w-full">
        <GlobalMarketData />
      </div>
    </section>
  );
};

export default GlobalMarketDataSection;
