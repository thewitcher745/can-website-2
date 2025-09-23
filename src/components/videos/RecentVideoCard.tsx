import { Video } from "../VideosSection";

type RecentVideoCardProps = {
  video: Video;
};

const RecentVideoCard: React.FC<RecentVideoCardProps> = ({ video }) => {
  return (
    <a
      href={video.link}
      target="_blank"
      rel="noopener noreferrer"
      className="w-1/4 min-w-20"
    >
      <div className="w-full h-full">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full object-cover aspect-video"
        />
        <div className="p-2">
          <div className="text-white text-xs xs:text-sm font-medium mb-1 line-clamp-2 min-h-[2.5em]">
            {video.title}
          </div>
          <div className="text-gray-400 text-xs">
            {new Date(video.published).toLocaleDateString()}
          </div>
        </div>
      </div>
    </a>
  );
};

export default RecentVideoCard;
