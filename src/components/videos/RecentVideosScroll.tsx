import { Video } from "../VideosSection";
import RecentVideoCard from "./RecentVideoCard";

const TopGradientOverlay = () => {
  return (
    <div
      className="pointer-events-none absolute top-0 left-0 w-full h-15 z-10"
      style={{
        background: "linear-gradient(to bottom, #181b20 5%, transparent)",
      }}
    />
  );
};

const BottomGradientOverlay = () => {
  return (
    <div
      className="pointer-events-none absolute bottom-0 left-0 w-full h-15 z-10"
      style={{
        background: "linear-gradient(to top, #181b20 5%, transparent)",
      }}
    />
  );
};

const RecentVideosScroll = ({ videos }: { videos: Video[] }) => {
  return (
    <div className="flex lg:h-100 w-full xl:w-1/8 lg:w-1/5 flex-col relative overflow-hidden">
      <div className="lg:block hidden">
        <TopGradientOverlay />
        <BottomGradientOverlay />
      </div>
      <div
        className="w-full flex justify-center group"
        style={{
          animationDuration: `${videos.length * 10}s`, // 10s per video
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        <div
          className="hidden lg:flex w-full flex-col gap-2 animate-video-scroll group-hover:[animation-play-state:paused]"
          style={{
            animationDuration: `${videos.length * 10}s`, // 10s per video
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          {[...videos, ...videos].map((video, idx) => (
            <RecentVideoCard key={idx} video={video} />
          ))}
        </div>
        <div className="lg:hidden w-4/5 flex gap-2 justify-center">
          {videos.map((video, idx) => (
            <RecentVideoCard key={idx} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentVideosScroll;
