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
      className={`text-xl sm:text-2xl font-semibold mb-2 text-text-main hover:text-primary transition-colors ${className}`}
    >
      <Link href={`/analysis/${slug}`}>{title}</Link>
    </h2>
  );
};

export default PostTitle;
