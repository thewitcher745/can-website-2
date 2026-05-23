import React from "react";

interface PostTimeProps {
  time: string;
  className?: string;
  hiddenOnMobile?: boolean;
}

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
      Last updated {new Date(time).toLocaleDateString()}{" "}
      {new Date(time).toLocaleTimeString()}
    </div>
  );
};

export default PostTime;
