import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";
import { ChevronRight } from "lucide-react";

import { buildApiUrl } from "../config";
import RecentVideosScroll from "./videos/RecentVideosScroll";

export interface Video {
  id: string;
  link: string;
  published: string;
  thumbnail: string;
  description: string;
  title: string;
}

const VideosSection: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(buildApiUrl("/api/videos/latest"))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch videos");
        return res.json();
      })
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="videos" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 text-white">Loading videos...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="videos" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  if (!videos.length) {
    return (
      <section id="videos" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 text-white">No videos found.</div>
        </div>
      </section>
    );
  }

  const [mainVideo, ...otherVideos] = videos;

  return (
    <section id="videos" className="w-full flex justify-center my-2">
      <div className="2xl:max-w-[100rem] xl:max-w-7xl max-w-6xl w-full flex flex-col items-center">
        <h2 className="text-2xl self-start text-text-main font-bold mb-2">
          Our most recent video analysis
        </h2>
        <div className="flex flex-col w-full lg:flex-row items-center justify-center">
          <div className="my-4 pr-10 w-full md:w-full aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${mainVideo.id}`}
              title={mainVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full p-4"
            />
          </div>
          <RecentVideosScroll videos={otherVideos} />
        </div>
        <div className="flex gap-2 items-center hover:*:text-primary ">
          <FaYoutube className="w-6 h-6 text-text-main transition-all duration-200" />
          <Link
            href="/videos"
            className="text-text-main font-bold transition-all duration-200"
          >
            Show more
          </Link>
          <ChevronRight className="w-6 h-6 text-text-main transition-all duration-200" />
        </div>
      </div>
    </section>
  );
};

export default VideosSection;
