import Link from "next/link";
import Image from "next/image";

import Logo from "@src/shared/ui/Logo";
import { ListedAnalysis } from "@src/domains/analysis/types";

const ImageElement = ({ post }: { post: ListedAnalysis }) => {
  return (
    <div
      key={post.slug}
      className={"relative overflow-hidden rounded-xl flex flex-col mb-2"}
    >
      <div className="relative w-full shadow-xl">
        <div className="absolute left-0 bottom-0 rounded-full overflow-hidden m-5 w-12 h-12 md:h-18 md:w-18 opacity-70 z-999">
          <Logo
            symbol={post.meta.coins[0].toUpperCase()}
            size="full"
            padding="1"
          />
        </div>
        <div className="w-full aspect-[1631/760] relative z-0">
          <Image
            fill
            src={post.meta.image}
            alt={post.meta.title}
            className="object-contain self-center object-center transition-all ease-in-out"
          />
        </div>
      </div>
    </div>
  );
};

const CaptionElement = ({
  post,
  isMobile,
}: {
  post: ListedAnalysis;
  isMobile: boolean;
}) => {
  const limit = isMobile ? 2 : 4;
  const tags = post.meta.tags.slice(0, limit);

  const PostTags = () => {
    return (
      <div className="flex gap-1 hidden xs:block">
        {tags.map((tag, index) => (
          <span key={tag} className="py-1 text-primary text-xs rounded-full">
            {`${tag}${index === tags.length - 1 ? "" : ","}`}
          </span>
        ))}
      </div>
    );
  };

  const PostTime = () => {
    return (
      <span className="text-text-muted text-xs">
        {new Date(post.meta.publishedAt || "").toLocaleDateString()}{" "}
        {new Date(post.meta.publishedAt || "").toLocaleTimeString()}
      </span>
    );
  };

  if (isMobile) {
    return (
      <div className="w-full flex flex-col justify-between p-2 pt-0">
        <div className="flex w-full items-center p-2 pt-0">
          <div className="text-text-main text-md xs:text-lg xs:font-semibold">
            <h3>{post.meta.title}</h3>
          </div>
        </div>
        <div className="px-2 mb-2 h-12 hidden xs:block">
          <p className="text-text-muted text-sm line-clamp-2">
            {post.meta.description}
          </p>
        </div>
        <div className="flex justify-between items-center px-2">
          <PostTime />
          <PostTags />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-100 md:h-45 flex flex-col justify-between p-2 pt-0">
      <div className="flex w-full items-center p-2">
        <div className="w-full flex flex-col gap-4">
          <div className="text-text-main text-lg md:text-xl lg:text-2xl font-semibold">
            <h2>{post.meta.title}</h2>
          </div>
          <div className="h-12">
            <p className="text-text-muted line-clamp-2">
              {post.meta.description}
            </p>
          </div>
          <div className="flex justify-between items-center px-2 md:px-0">
            <PostTime />
            <PostTags />
          </div>
        </div>
      </div>
    </div>
  );
};

const MostRecentAnalysisCard: React.FC<{
  post: ListedAnalysis;
  isInView: boolean;
}> = ({ post, isInView }) => {
  return (
    <Link
      href={`/analysis/${post.slug}`}
      className={`max-w-full w-full border border-text-muted rounded-xl mb-2 hover:bg-surface/60 transition-all duration-200 ${
        isInView ? "animate-fade-in" : "animate-fade-out"
      }`}
    >
      <ImageElement post={post} />
      <div className="hidden md:block">
        <CaptionElement post={post} isMobile={false} />
      </div>
      <div className="md:hidden">
        <CaptionElement post={post} isMobile={true} />
      </div>
    </Link>
  );
};

export default MostRecentAnalysisCard;
