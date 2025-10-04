import React from "react";

import VideosSectionContent from "../components/videos/Contents";

const VideosSection = () => {
  return (
    <section id="videos" className="w-full flex justify-center my-2">
      <div className="2xl:max-w-[100rem] xl:max-w-7xl max-w-6xl w-full flex flex-col items-center">
        <h2 className="text-2xl self-start text-text-main font-bold mb-4">
          Recent video analysis
        </h2>
        <VideosSectionContent />
      </div>
    </section>
  );
};

export default VideosSection;
