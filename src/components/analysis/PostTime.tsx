import React from "react";

interface PostTimeProps {
  time: string;
  className?: string;
  hiddenOnMobile?: boolean;
}

const PostTime: React.FC<PostTimeProps> = ({
  time,
  className = "",
  hiddenOnMobile = false,
}) => {
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
