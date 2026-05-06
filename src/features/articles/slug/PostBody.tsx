import renderBlock from "@src/shared/ui/articles/articleRenderer";
import { ArticleBody } from "@src/types";

const PostBody = ({ postBody }: { postBody: ArticleBody }) => {
  return (
    <article className="blog-news-article prose max-w-none">
      {postBody.blocks.map(renderBlock)}
    </article>
  );
};

export default PostBody;
