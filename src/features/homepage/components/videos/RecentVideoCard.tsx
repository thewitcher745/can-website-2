import { FaYoutube } from "react-icons/fa6";

import { Video } from "@src/types";

const RecentVideoCard = ({
  video,
  isHighlighted,
}: {
  video: Video;
  isHighlighted?: boolean;
}) => {
  return (
    <a href={video.link} target="_blank" rel="noopener noreferrer">
      <div className="w-full h-full p-2 transition-all duration-500 relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className={`w-full object-cover aspect-video transition-all duration-500 ${
            isHighlighted ? "opacity-100" : "opacity-50 scale-90"
          }`}
        />
        <div
          className={`p-2 transition-all duration-500 ${
            isHighlighted ? "opacity-100" : "opacity-50 scale-90"
          }`}
        >
          <div className="text-white text-xs xs:text-sm font-medium mb-1 line-clamp-2 min-h-[2.5em]">
            {video.title}
          </div>
          <div className="text-gray-400 text-xs">
            {new Date(video.published).toLocaleDateString()}
          </div>
        </div>
        <div className="absolute z-10 flex rounded-lg overflow-hidden justify-center items-center hover:opacity-100 opacity-0 transition-all duration-200 top-0 left-0 w-full h-full">
          <div className="bg-gray-500 z-5 absolute w-full h-full opacity-70 transition-all duration-200" />
          <div className="flex z-20 flex-col text-red-500 text-xl p-4 rounded-md justify-center items-center">
            <span className="text-black font-bold">Watch on</span>
            <div className="flex text-red-500 items-center gap-2 font-bold">
              <FaYoutube className="w-6 h-6" /> YouTube
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default RecentVideoCard;
