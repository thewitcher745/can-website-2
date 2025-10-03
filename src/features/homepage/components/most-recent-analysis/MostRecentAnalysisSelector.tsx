import Image from "next/image";

import { AnalysisPostMeta } from "@src/types";

const PostLogo: React.FC<{ thumbnail: string; altText: string }> = ({
  thumbnail,
  altText,
}) => {
  if (!thumbnail?.length)
    return (
      <div
        className={`w-full bg-text-main aspect-square overflow-hidden rounded-full xs:relative left-0 top-0 translate-x-0 translate-y-0 opacity-100
              p-1`}
      >
        <div className="size-full p-2 overflow-hidden rounded-full bg-gray-500">
          <Image
            src="/images/logos/can-logo.png"
            alt={altText}
            width={160}
            height={160}
            className="object-contain object-center size-full  scale-180"
          />
        </div>
      </div>
    );
  return (
    <div
      className={`w-full bg-text-main aspect-square overflow-hidden rounded-full xs:relative left-0 top-0 translate-x-0 translate-y-0 opacity-100
                  p-1`}
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
              className={`w-12 h-12 md:w-10 md:h-10 aspect-square rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? "bg-secondary scale-110 opacity-100"
                  : "bg-gray-300 hover:bg-gray-400 opacity-20 group-hover:opacity-80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <PostLogo
                thumbnail={recentAnalysis[index].thumbnail}
                altText={`${recentAnalysis[index].title} logo`}
              />
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
