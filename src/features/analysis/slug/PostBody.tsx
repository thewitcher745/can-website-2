import { EditorJSBody } from "@src/shared/types/posts";
import renderBlock from "@src/shared/ui/articles/articleRenderer";

const PostBody = ({ postBody }: { postBody: EditorJSBody }) => {
  return (
    <article className="analysis-article prose max-w-none">
      {postBody.blocks.map(renderBlock)}
    </article>
  );
};

export default PostBody;
