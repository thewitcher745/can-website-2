import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import MostRecentAnalysisCard, {
  AnalysisPostMeta,
} from "./MostRecentAnalysisCard";

type MostRecentProps = {
  recentAnalysis: AnalysisPostMeta[];
};

const PostLogo: React.FC<{ thumbnail: string; altText: string }> = ({
  thumbnail,
  altText,
}) => {
  if (!thumbnail?.length) return null;

  return (
    <div
      className={`w-full bg-text-main aspect-square rounded-full overflow-hidden xs:relative left-0 top-0 translate-x-0 translate-y-0 opacity-100
                  p-2`}
    >
      <div className="size-full overflow-hidden">
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

const MostRecent: React.FC<MostRecentProps> = ({ recentAnalysis }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear both interval and timeout
  const clearTimers = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Start auto-scroll interval
  const startAutoScroll = () => {
    clearTimers();
    timerRef.current = setInterval(() => {
      setIsTransitioning(true);
      timeoutRef.current = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % recentAnalysis.length);
        setIsTransitioning(false);
      }, 500);
    }, 8000);
  };

  // Start interval on mount and when recentAnalysis changes
  useEffect(() => {
    if (recentAnalysis.length <= 1) return; // Don't auto-scroll if only one or no items
    startAutoScroll();
    return clearTimers;
  }, [recentAnalysis.length]);

  return (
    <div className="max-w-4xl flex justify-center lg:max-w-6xl mx-auto pt-4 pb-8 px-2">
      {recentAnalysis.length === 0 ? (
        <div className="text-center text-text-muted">No posts found.</div>
      ) : (
        <div className="relative flex flex-col lg:flex-row items-center justify-center w-full">
          <MostRecentAnalysisCard
            key={recentAnalysis[currentSlide].slug}
            post={recentAnalysis[currentSlide]}
            isInView={!isTransitioning}
          />
          {/* Navigation dots */}
          {recentAnalysis.length > 1 && (
            <div className="flex lg:flex-col w-full sm:w-3/5 md:w-4/5 lg:w-auto lg:h-3/5 px-4 justify-around mt-2 space-y-4 space-x-2">
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
                  className={`flex gap-2 xs:gap-4 items-center cursor-pointer ${
                    index === currentSlide
                      ? "opacity-100 translate-y-4 translate-x-0 lg:translate-x-4 lg:translate-y-0"
                      : "opacity-20 translate-y-0 translate-x-0 lg:translate-x-0 lg:translate-y-0"
                  }`}
                >
                  <div
                    key={index}
                    className={`w-8 h-8 xs:w-15 xs:h-15 rounded-full transition-all duration-200 ${
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
                  <span className="text-text-main text-sm truncate hidden xl:inline">
                    {recentAnalysis[index].title}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MostRecent;
