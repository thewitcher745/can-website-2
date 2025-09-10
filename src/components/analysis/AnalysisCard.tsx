import PostDescription from "./PostDescription";
import PostTags from "./PostTags";
import PostLogo from "./PostLogo";
import PostTime from "./PostTime";
import PostTitle from "./PostTitle";

interface AnalysisPostMeta {
  thumbnail: string;
  author: string;
  time: string;
  slug: string;
  tags: string[];
  title: string;
  desc: string;
}

const TopHalf: React.FC<{ post: AnalysisPostMeta }> = ({ post }) => {
  return (
    <div className="flex items-center h-full md:h-1/3 md:mb-6 relative">
      <PostLogo thumbnail={post.thumbnail} altText={`${post.title} logo`} />
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
    <div
      key={post.slug}
      className="border border-border p-2 flex flex-col h-auto md:h-80 min-w-xxs"
    >
      <TopHalf post={post} />
      <BottomHalf post={post} />
    </div>
  );
};

export default AnalysisCard;
