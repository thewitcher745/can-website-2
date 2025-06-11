import React from "react";

interface PostDescriptionProps {
  description: string;
  className?: string;
  hiddenOnMobile?: boolean;
}

const PostDescription: React.FC<PostDescriptionProps> = ({
  description,
  className = "",
  hiddenOnMobile = false,
}) => {
  return (
    <p
      className={`text-text-muted lg:text-xl text-sm px-2 mb-3 text-justify ${className} ${
        hiddenOnMobile ? "hidden sm:block" : ""
      }`}
    >
      {description}
    </p>
  );
};

export default PostDescription;
