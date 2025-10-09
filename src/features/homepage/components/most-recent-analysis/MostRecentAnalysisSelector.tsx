import { AnalysisPostMeta } from "@src/types";
import Logo from "@src/shared/ui/Logo";

const PostLogo: React.FC<{ symbol: string }> = ({ symbol }) => {
  return <Logo symbol={symbol.toUpperCase()} padding="1" size="10" />;
};

const MostRecentAnalysisSelector = ({
  recentAnalysis,
  currentSlide,
  setCurrentSlide,
  setIsTransitioning,
  timerRef,
}: {
  recentAnalysis: AnalysisPostMeta[];
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
  setIsTransitioning: (transitioning: boolean) => void;
  timerRef: React.MutableRefObject<NodeJS.Timeout | null>;
}) => {
  return (
    recentAnalysis.length > 1 && (
      <div className="flex lg:flex-col w-full lg:w-auto xl:w-1/4 h-full px-4 justify-around mt-2 space-x-2">
        {recentAnalysis.map((_, index) => (
          <div
            onClick={() => {
              setIsTransitioning(true);
              if (timerRef.current) {
                clearInterval(timerRef.current);
              }
              setTimeout(() => {
                setCurrentSlide(index);
                setIsTransitioning(false);
              }, 500);
            }}
            className={`flex gap-2 line-clamp-2 items-center cursor-pointer transition-all duration-200 p-2 rounded group ${
              index === currentSlide
                ? "translate-y-4 translate-x-0 lg:translate-x-4 lg:translate-y-0"
                : "translate-y-0 translate-x-0 lg:translate-x-0 lg:translate-y-0 hover:bg-surface"
            }`}
          >
            <div
              key={index}
              className={`flex items-center justify-center md:w-10 md:h-10 aspect-square rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? "bg-secondary scale-110 opacity-100"
                  : "bg-gray-300 hover:bg-gray-400 opacity-20 group-hover:opacity-80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <PostLogo symbol={recentAnalysis[index].coins[0].toUpperCase()} />
            </div>
            <div
              className={`flex-col hidden xl:flex transition-all duration-200 ${
                index === currentSlide
                  ? "opacity-100"
                  : "opacity-20 group-hover:opacity-80"
              }`}
            >
              <p className="text-text-main text-sm selector-caption">
                {recentAnalysis[index].title}
              </p>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default MostRecentAnalysisSelector;
