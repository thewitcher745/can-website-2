import renderBlock from "@src/shared/ui/articles/articleRenderer";
import { ArticleBody } from "@src/types";

const PostBody = ({ postBody }: { postBody: ArticleBody }) => {
  return (
    <article className="high-potential-article prose max-w-none">
      {postBody.blocks.map(renderBlock)}
    </article>
  );
};

export default PostBody;
