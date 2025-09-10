import React from "react";
import Link from "next/link";

interface PostTagsProps {
  tags: string[];
  hiddenOnMobile?: boolean;
  className?: string;
}

const PostTags: React.FC<PostTagsProps> = ({
  tags,
  hiddenOnMobile = false,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-grow h-8 items-center px-2 gap-2 ${
        hiddenOnMobile ? "hidden lg:flex" : ""
      } ${className}`}
    >
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 bg-primary/10 text-primary text-xs sm:text-sm rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default PostTags;
