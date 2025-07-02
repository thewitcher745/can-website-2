import React from "react";
import Image from "next/image";

interface PostThumbnailProps {
  thumbnailLink: string;
  altText: string;
  className?: string;
  hiddenOnMobile?: boolean;
}

const PostThumbnail: React.FC<PostThumbnailProps> = ({
  thumbnailLink,
  altText,
  className = "",
  hiddenOnMobile = false,
}) => {
  if (!thumbnailLink?.length) return null;

  return (
    <div
      className={`mx-4 lg:mr-8 mb-6 flex-shrink-0 w-30 h-30 mr-2 lg:w-40 lg:h-40 sm:w-30 sm:h-30 relative ${className} ${
        hiddenOnMobile ? "hidden sm:block" : ""
      }`}
    >
      <Image
        src={thumbnailLink}
        alt={altText}
        fill
        className="object-contain backdrop-blur-sm rounded-xl sm:p-2 py-2"
      />
    </div>
  );
};

export default PostThumbnail;
