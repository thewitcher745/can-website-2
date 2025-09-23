import Image from "next/image";

import { AnalysisPostMeta } from "./MostRecentAnalysisCard";

const PostLogo: React.FC<{ thumbnail: string; altText: string }> = ({
  thumbnail,
  altText,
}) => {
  if (!thumbnail?.length) return null;

  return (
    <div
      className={`w-full bg-text-main aspect-square rounded-full xs:relative left-0 top-0 translate-x-0 translate-y-0 opacity-100
                  p-2`}
    >
      <div className="size-full">
        <Image
          src={thumbnail}
          alt={altText}
          width={160}
          height={160}
          className="object-contain object-center size-full"
        />
      </div>
    </div>
  );
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
      <div className="flex lg:flex-col w-full lg:w-auto xl:w-1/4 h-full px-4 justify-around mt-2 space-y-4 space-x-2">
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
            className={`flex gap-2 xs:gap-2 h-20 p-1 line-clamp-2 items-center py-2 cursor-pointer ${
              index === currentSlide
                ? "opacity-100 translate-y-4 translate-x-0 lg:translate-x-4 lg:translate-y-0"
                : "opacity-20 translate-y-0 translate-x-0 lg:translate-x-0 lg:translate-y-0"
            }`}
          >
            <div
              key={index}
              className={`w-12 h-12 md:w-15 md:h-15 aspect-square rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? "bg-secondary scale-110"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <PostLogo
                thumbnail={recentAnalysis[index].thumbnail}
                altText={`${recentAnalysis[index].title} logo`}
              />
            </div>
            <div className="flex-col hidden xl:flex">
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
