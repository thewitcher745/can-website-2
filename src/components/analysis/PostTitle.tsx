import React from "react";
import Link from "next/link";

interface PostTitleProps {
  title: string;
  slug: string;
  className?: string;
}

const PostTitle: React.FC<PostTitleProps> = ({
  title,
  slug,
  className = "",
}) => {
  return (
    <h2
      className={`z-10 flex items-center mb-2 text-lg sm:text-xl md:text-md lg:ml-2 text-text-main hover:text-primary transition-colors ${className}`}
    >
      <Link href={`/analysis/${slug}`}>{title}</Link>
    </h2>
  );
};

export default PostTitle;
