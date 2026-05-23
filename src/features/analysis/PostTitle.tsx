interface PostTitleProps {
  title: string;
  slug: string;
  className?: string;
  isVip?: boolean;
}

const PostTitle = ({ title, slug, className = "", isVip }: PostTitleProps) => {
  return (
    <h2
      className={`z-10 flex items-center mb-2 text-lg sm:text-xl md:text-md lg:ml-2 text-text-main hover:text-primary transition-colors ${className}`}
    >
      {title}
    </h2>
  );
};

export default PostTitle;
