import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";
import { ChevronRight } from "lucide-react";

import { buildApiUrl } from "@src/config";
import RecentVideosScroll from "./RecentVideosScroll";
import { Video } from "@src/types";

const VideosSectionContent: React.FC = () => {
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

  return (
    <>
      <div className="w-full">
        <RecentVideosScroll videos={videos} />
      </div>
      <div className="flex mt-4 gap-2 items-center hover:*:text-primary ">
        <FaYoutube className="w-6 h-6 text-text-main transition-all duration-200" />
        <Link
          href={videos[0].channel_link}
          className="text-text-main font-bold transition-all duration-200"
        >
          Show more
        </Link>
        <ChevronRight className="w-6 h-6 text-text-main transition-all duration-200" />
      </div>
    </>
  );
};

export default VideosSectionContent;
