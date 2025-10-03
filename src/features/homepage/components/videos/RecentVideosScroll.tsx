import { useEffect, useState } from "react";

import { Video } from "@src/types";
import RecentVideoCard from "./RecentVideoCard";

const RecentVideosScroll = ({ videos }: { videos: Video[] }) => {
  const [highlightedVideoIndex, setHighlightedVideoIndex] = useState<number>(0);

  useEffect(() => {
    setInterval(() => {
      setHighlightedVideoIndex((prev) => (prev + 1) % videos.length);
    }, 8000);
  }, []);
  return (
    <div className="grid grid-cols-2 lg:flex max-h-screen overflow-y-scroll lg:overflow-y-hidden w-full">
      {videos.map((video, idx) => (
        <div key={idx} className="w-full">
          <RecentVideoCard
            video={video}
            isHighlighted={idx === highlightedVideoIndex}
          />
        </div>
      ))}
    </div>
  );
};

export default RecentVideosScroll;
