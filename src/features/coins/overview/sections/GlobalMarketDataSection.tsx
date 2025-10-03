import GlobalMarketData from "../components/global-market-data/GlobalMarketData";

const GlobalMarketDataSection = () => {
  return (
    <section
      id="global-market-data"
      className="w-full flex justify-center pt-8"
    >
      <div className="2xl:max-w-[100rem] xl:max-w-7xl max-w-6xl w-full flex flex-col lg:flex-row justify-center">
        <GlobalMarketData />
      </div>
    </section>
  );
};

export default GlobalMarketDataSection;
