import { PostDescriptionProps } from "@src/types";
import React from "react";

const PostDescription = ({
  description,
  className = "",
}: PostDescriptionProps) => {
  return (
    <div className="overflow-ellipsis">
      <p
        className={`text-text-muted md:line-clamp-2 lg:text-sm text-md px-2 mb-3 ${className}`}
      >
        {description}
      </p>
    </div>
  );
};

export default PostDescription;
