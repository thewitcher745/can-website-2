import { Video } from "../VideosSection";

const RecentVideoCard: React.FC = ({
  video,
  key,
}: {
  video: Video;
  key: number;
}) => {
  return (
    <a
      key={video.id + "-" + key}
      href={video.link}
      target="_blank"
      rel="noopener noreferrer"
      className=""
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full object-cover aspect-video"
      />
      <div className="p-2">
        <div className="text-white text-sm font-medium mb-1 line-clamp-2 min-h-[2.5em]">
          {video.title}
        </div>
        <div className="text-gray-400 text-xs">
          {new Date(video.published).toLocaleDateString()}
        </div>
      </div>
    </a>
  );
};

export default RecentVideoCard;
