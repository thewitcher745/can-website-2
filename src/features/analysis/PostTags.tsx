import React from "react";

import { PostTagsProps } from "@src/types";

const PostTags = ({
  tags,
  hiddenOnMobile = false,
  className = "",
}: PostTagsProps) => {
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
