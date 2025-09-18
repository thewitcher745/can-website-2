import React, { useEffect, useState } from "react";
import Link from "next/link";

import { buildApiUrl } from "../config";
import { FaYoutube } from "react-icons/fa";

interface Video {
  id: string;
  link: string;
  published: string;
  thumbnail: string;
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
    <section id="videos" className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-6">Latest Video</h2>
          <div className="flex w-full aspect-video justify-center mb-8">
            <iframe
              width="700"
              src={`https://www.youtube.com/embed/${mainVideo.id}`}
              title={mainVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-lg w-full max-w-2xl"
            ></iframe>
          </div>
          <h3 className="text-xl font-semibold text-white mb-4">
            More Recent Videos
          </h3>
          <div className="h-150 overflow-y-scroll xs:overflow-hidden xs:h-auto grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6 justify-center">
            {otherVideos.map((video) => (
              <a
                key={video.id}
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className="h-40 block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-200"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-1/2 object-cover"
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
            ))}
          </div>
          <div>
            <button className="text-text-main text-center px-4 py-2 rounded-lg font-semibold transition text-lg">
              View All Videos on our
              <Link
                className="text-primary flex justify-center items-center gap-1"
                href="https://www.youtube.com/@CryptoAnalysisCAN"
              >
                <FaYoutube /> <span>Youtube channel.</span>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideosSection;
