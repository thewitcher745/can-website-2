import Head from "next/head";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer";
import { buildApiUrl } from "../../config";
import { Video } from "../../components/VideosSection";
import RecentVideoCard from "../../components/videos/RecentVideoCard";

const VideosPage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(buildApiUrl("/api/videos/latest?n=0"))
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

  if (loading)
    return (
      <>
        <Head>
          <title>CAN Trading - Videos</title>
        </Head>
        <Navbar />
        <main className="bg-background min-h-screen">
          <div className="flex flex-col items-center justify-center min-h-[40vh] bg-background">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-opacity-60 mb-4"></div>
            <span className="text-text-muted text-lg tracking-wide">
              Loading videos...
            </span>
          </div>
        </main>
        <Footer />
      </>
    );

  if (error)
    return (
      <>
        <Navbar />
        <main className="bg-background min-h-screen">
          <div className="flex flex-col items-center justify-center min-h-[40vh] bg-background">
            <div className="mb-4">
              <svg
                className="w-12 h-12 text-error animate-pulse"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-error text-lg tracking-wide font-semibold mb-2">
              Error
            </span>
            <span className="text-text-muted text-base">{error}</span>
          </div>
        </main>
        <Footer />
      </>
    );

  if (!videos.length)
    return (
      <>
        <Navbar />
        <main className="bg-background min-h-screen pt-24 px-4">
          <div className="flex flex-col items-center justify-center min-h-[40vh] bg-background">
            <span className="text-text-muted text-lg tracking-wide">
              No videos found.
            </span>
          </div>
        </main>
        <Footer />
      </>
    );

  const [mainVideo, ...otherVideos] = videos;

  return (
    <>
      <Head>
        <title>Videos - CAN Trading</title>
      </Head>
      <Navbar />
      <main className="bg-background min-h-screen pt-24 px-4">
        <section
          id="main-video"
          className="w-full flex flex-col items-center mb-10"
        >
          <div className="w-full max-w-5xl">
            <div className="aspect-video w-full bg-black rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${mainVideo.id}`}
                title={mainVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <div className="mt-4 text-white text-2xl font-bold line-clamp-2">
              {mainVideo.title}
            </div>
            <div className="text-text-muted mt-2 mb-1 line-clamp-4">
              {mainVideo.description}
            </div>
            <div className="text-gray-400 text-sm">
              {new Date(mainVideo.published).toLocaleDateString()}
            </div>
          </div>
        </section>
        <section id="all-videos" className="w-full flex flex-col items-center">
          <div className="w-full max-w-7xl">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-primary">
              All Recent Videos
            </h2>
            <div className="grid gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {otherVideos.map((video) => (
                <RecentVideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default VideosPage;
