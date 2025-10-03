import HighPotentialContainer from "../components/high-potential/HighPotentialContainer";

const HighPotentialTokensSection = () => {
  return (
    <section id="high-potential" className="w-full flex justify-center my-2">
      <div className="2xl:max-w-[100rem] xl:max-w-7xl max-w-6xl py-4 w-full flex flex-col items-center justify-center">
        <div className="flex flex-col self-start sm:text-left">
          <h2 className="text-text-main text-2xl font-bold">
            High Potential Tokens
          </h2>
        </div>
        <HighPotentialContainer />
      </div>
    </section>
  );
};

export default HighPotentialTokensSection;
