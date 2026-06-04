import React from "react";

interface PostTagsProps {
  tags: string[];
  hiddenOnMobile?: boolean;
  className?: string;
}

const PostTags = ({
  tags,
  hiddenOnMobile = false,
  className = "",
}: PostTagsProps) => {
  return (
    <div
      className={`w-full overflow-x-hidden ${hiddenOnMobile ? "hidden lg:block" : ""}`}
    >
      <div
        className={`tags-scroll flex h-8 items-center px-2 gap-2 ${className}`}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-primary/10 text-primary text-xs sm:text-sm rounded-full whitespace-nowrap flex-shrink-0"
          >
            {tag}
          </span>
        ))}
        {/* Duplicate tags for seamless loop */}
        {tags.map((tag) => (
          <span
            key={`${tag}-duplicate`}
            className="px-3 py-1 bg-primary/10 text-primary text-xs sm:text-sm rounded-full whitespace-nowrap flex-shrink-0"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PostTags;
