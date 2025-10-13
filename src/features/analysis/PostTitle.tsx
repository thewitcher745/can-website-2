import Link from "next/link";

import { PostTitleProps } from "@src/types";

const PostTitle = ({ title, slug, className = "", isVip }: PostTitleProps) => {
  return (
    <h2
      className={`z-10 flex items-center mb-2 text-lg sm:text-xl md:text-md lg:ml-2 text-text-main hover:text-primary transition-colors ${className}`}
    >
      <Link href={isVip ? `/vip_analysis/${slug}` : `/analysis/${slug}`}>
        {title}
      </Link>
    </h2>
  );
};

export default PostTitle;
