import Link from "next/link";
import Image from "next/image";

export interface AnalysisPostMeta {
  thumbnail: string;
  image: string;
  author: string;
  time: string;
  slug: string;
  tags: string[];
  title: string;
  desc: string;
}

const PostLogo: React.FC<{ thumbnail: string; altText: string }> = ({
  thumbnail,
  altText,
}) => {
  if (!thumbnail?.length) return null;

  return (
    <div
      className={`w-full bg-surface aspect-square rounded-full overflow-hidden border border-primary xs:relative left-0 top-0 translate-x-0 translate-y-0 opacity-100
                  p-4`}
    >
      <div className="size-full overflow-hidden">
        <Image
          src={thumbnail}
          alt={altText}
          width={160}
          height={160}
          className="object-contain object-center size-full"
        />
      </div>
    </div>
  );
};

const ImageElement = ({ post }: { post: AnalysisPostMeta }) => {
  return (
    <div
      key={post.slug}
      className={
        "relative overflow-hidden rounded-xl flex flex-col max-h-110 w-full aspect-video"
      }
    >
      <div className="relative w-full">
        <img
          width={2000}
          height={2000}
          src={post.image}
          alt={post.title}
          className={
            "object-cover self-center w-full h-full scale-140 object-center transition-all ease-in-out"
          }
        />
      </div>
    </div>
  );
};

const CaptionElement = ({
  post,
  isMobile,
}: {
  post: AnalysisPostMeta;
  isMobile: boolean;
}) => {
  const PostTags = () => {
    return (
      <div className="flex gap-1">
        {post.tags.map((tag, index) => (
          <span key={tag} className="py-1 text-primary text-xs rounded-full">
            {`${tag}${index === post.tags.length - 1 ? "" : ","}`}
          </span>
        ))}
      </div>
    );
  };

  const PostTime = () => {
    return <span className="text-text-muted text-xs">{post.time}</span>;
  };

  if (isMobile) {
    return (
      <div className="w-full h-60 flex flex-col justify-between p-2">
        <div className="flex w-full items-center p-2">
          <div className="w-1/6 mr-2">
            <PostLogo
              thumbnail={post.thumbnail}
              altText={`${post.title} logo`}
            />
          </div>
          <div className="w-5/6 text-text-main text-lg font-semibold">
            <h2>{post.title}</h2>
          </div>
        </div>
        <div className="px-2 mb-4">
          <p className="text-text-muted line-clamp-2">{post.desc}</p>
        </div>
        <div className="flex justify-between items-center px-2">
          <PostTime />
          <PostTags />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-60 md:h-50 flex flex-col justify-between p-2">
      <div className="flex w-full items-center p-2">
        <div className="w-1/6 mr-4">
          <PostLogo thumbnail={post.thumbnail} altText={`${post.title} logo`} />
        </div>
        <div className="w-5/6 flex flex-col gap-4">
          <div className="text-text-main text-lg md:text-xl lg:text-2xl font-semibold">
            <h2>{post.title}</h2>
          </div>
          <div>
            <p className="text-text-muted line-clamp-2">{post.desc}</p>
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
  post: AnalysisPostMeta;
  isInView: boolean;
}> = ({ post, isInView }) => {
  return (
    <Link
      href={`/analysis/${post.slug}`}
      className={`w-full border border-text-muted rounded-xl mb-2 sm:w-4/5 ${
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
