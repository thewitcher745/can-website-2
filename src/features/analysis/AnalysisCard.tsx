import Link from "next/link";

import PostDescription from "./PostDescription";
import PostTags from "./PostTags";
import PostTime from "./PostTime";
import PostTitle from "./PostTitle";
import Logo from "@src/shared/ui/Logo";
import { ListedAnalysis } from "@src/domains/analysis/types";

const TopHalf: React.FC<{ post: ListedAnalysis; isVip: boolean }> = ({
  post,
  isVip,
}) => {
  return (
    <div className="flex items-center md:items-start gap-2 py-6 md:py-0 items-center h-36 md:h-24 md:h-1/3 md:mb-6 relative">
      <Logo
        symbol={post.meta.coins[0].toUpperCase()}
        fixedLogoUrl={"/images/logos/default.png"}
        size="20"
        padding="1"
      />
      <div className="relative overflow-y-hidden h-full">
        <PostTitle isVip={isVip} title={post.meta.title} slug={post.slug} />
        <div className="card-title-gradient absolute bottom-0 left-o w-full h-10 bg-red-500" />
      </div>
    </div>
  );
};

const BottomHalf: React.FC<{ post: ListedAnalysis }> = ({ post }) => {
  return (
    <div className="flex gap-2 flex-grow justify-between flex-wrap">
      <PostDescription description={post.meta.description} />
      <div className="w-full flex md:flex-col flex-wrap justify-between md:items-start items-center">
        <div className="relative w-full">
          <PostTags tags={post.meta.tags} />
          <div className="tags-gradient absolute right-0 top-0 w-10 h-full transition-all duration-200" />
        </div>
        <PostTime
          time={post.meta.publishedAt || ""}
          className="self-end md:self-auto"
        />
      </div>
    </div>
  );
};

const AnalysisCard: React.FC<{ post: ListedAnalysis; isVip: boolean }> = ({
  post,
  isVip,
}) => {
  return (
    <Link
      href={isVip ? `/vip_analysis/${post.slug}` : `/analysis/${post.slug}`}
    >
      <div
        key={post.slug}
        className="group border border-border rounded p-2 flex flex-col h-auto md:h-80 min-w-xxs card-hover bg-background"
      >
        <TopHalf isVip={isVip} post={post} />
        <BottomHalf post={post} />
      </div>
    </Link>
  );
};

export default AnalysisCard;
