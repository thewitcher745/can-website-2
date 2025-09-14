import MostRecentAnalysisCard, {
  AnalysisPostMeta,
} from "./MostRecentAnalysisCard";
import { useState, useEffect } from "react";

type MostRecentProps = {
  recentAnalysis: AnalysisPostMeta[];
};

const MostRecent: React.FC<MostRecentProps> = ({ recentAnalysis }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-scroll functionality
  useEffect(() => {
    if (recentAnalysis.length <= 1) return; // Don't auto-scroll if only one or no items

    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % recentAnalysis.length);
        setIsTransitioning(false);
      }, 500); // Half of transition duration
    }, 8000); // Change slide every 8 seconds

    return () => clearInterval(interval);
  }, [recentAnalysis.length]);

  return (
    <div className="max-w-4xl flex justify-center lg:max-w-6xl mx-auto py-8 px-2">
      {recentAnalysis.length === 0 ? (
        <div className="text-center text-text-muted">No posts found.</div>
      ) : (
        <div className="relative flex flex-col items-center w-full">
          <MostRecentAnalysisCard
            key={recentAnalysis[currentSlide].slug}
            post={recentAnalysis[currentSlide]}
            isInView={!isTransitioning}
          />
          {/* Navigation dots */}
          {recentAnalysis.length > 1 && (
            <div className="flex justify-center mt-2 space-x-2">
              {recentAnalysis.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsTransitioning(true);
                    setTimeout(() => {
                      setCurrentSlide(index);
                      setIsTransitioning(false);
                    }, 500);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentSlide
                      ? "bg-secondary scale-110"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MostRecent;
