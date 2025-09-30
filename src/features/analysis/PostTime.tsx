import React from "react";

import { PostTimeProps } from "@src/types";

const PostTime = ({
  time,
  className = "",
  hiddenOnMobile = false,
}: PostTimeProps) => {
  return (
    <div
      className={`text-xs text-text-muted px-2 mb-3 ${className} ${
        hiddenOnMobile ? "hidden sm:block" : ""
      }`}
    >
      Last updated {time}
    </div>
  );
};

export default PostTime;
