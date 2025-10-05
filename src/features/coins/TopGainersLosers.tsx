import TopGainers from "./top-gainers-losers/TopGainers";
import TopLosers from "./top-gainers-losers/TopLosers";

const TopGainersLosers = () => {
  return (
    <section
      id="top-gainers"
      className="w-full bg-background flex justify-start sm:justify-center"
    >
      <div className="max-w-custom flex flex-col lg:flex-row gap-4 p-4 py-8 rounded radius-6 w-full">
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-bold mb-6 pl-4 text-text-main">
            Top Gainers
          </h2>
          <TopGainers />
        </div>
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-bold mb-6 pl-4 text-text-main">
            Top Losers
          </h2>
          <TopLosers />
        </div>
      </div>
    </section>
  );
};

export default TopGainersLosers;
