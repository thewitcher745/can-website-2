import { useState, useEffect, useRef } from "react";

import MostRecentAnalysisCard, {
  AnalysisPostMeta,
} from "./MostRecentAnalysisCard";
import MostRecentAnalysisSelector from "./MostRecentAnalysisSelector";

type MostRecentProps = {
  recentAnalysis: AnalysisPostMeta[];
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
    <div className="flex justify-center py-6 px-2">
      {recentAnalysis.length === 0 ? (
        <div className="text-center text-text-muted">No posts found.</div>
      ) : (
        <div className="relative flex flex-col lg:flex-row lg:gap-2 items-center justify-center w-full">
          <MostRecentAnalysisCard
            key={recentAnalysis[currentSlide].slug}
            post={recentAnalysis[currentSlide]}
            isInView={!isTransitioning}
          />
          <MostRecentAnalysisSelector
            recentAnalysis={recentAnalysis}
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
            setIsTransitioning={setIsTransitioning}
            timerRef={timerRef}
          />
        </div>
      )}
    </div>
  );
};

export default MostRecent;
