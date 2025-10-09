import Link from "next/link";

import PostDescription from "./PostDescription";
import PostTags from "./PostTags";
import PostTime from "./PostTime";
import PostTitle from "./PostTitle";
import { AnalysisPostMeta } from "@src/types";
import Logo from "@src/shared/ui/Logo";

const TopHalf: React.FC<{ post: AnalysisPostMeta }> = ({ post }) => {
  return (
    <div className="flex gap-2 py-6 items-center h-full md:h-1/3 md:mb-6 relative">
      <Logo
        symbol={post.coins[0].toUpperCase()}
        fixedLogoUrl={post.thumbnail}
        size="20"
        padding="1"
      />
      <PostTitle title={post.title} slug={post.slug} />
    </div>
  );
};

const BottomHalf: React.FC<{ post: AnalysisPostMeta }> = ({ post }) => {
  return (
    <div className="flex gap-2 flex-grow justify-between flex-wrap">
      <PostDescription description={post.desc} />
      <div className="w-full flex md:flex-col flex-wrap justify-between md:items-start items-center">
        <PostTags tags={post.tags} />
        <PostTime time={post.time} className="self-end md:self-auto" />
      </div>
    </div>
  );
};

const AnalysisCard: React.FC<{ post: AnalysisPostMeta }> = ({ post }) => {
  return (
    <Link href={`/analysis/${post.slug}`}>
      <div
        key={post.slug}
        className="border border-border rounded p-2 flex flex-col h-auto md:h-80 min-w-xxs card-hover"
      >
        <TopHalf post={post} />
        <BottomHalf post={post} />
      </div>
    </Link>
  );
};

export default AnalysisCard;
