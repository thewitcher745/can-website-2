import { EditorJSBody } from "@src/shared/types/posts";
import renderBlock from "@src/shared/ui/articles/articleRenderer";

type UpdateProps = {
  updateBody: EditorJSBody;
  time: number | string;
};

const Update = ({ updateBody, time }: UpdateProps) => {
  return (
    <div className="border-l-4 border-primary px-6 py-3 relative">
      <div className="text-xs text-text-muted mb-1">
        {new Date(time).toLocaleDateString(undefined, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}{" "}
        {new Date(time).toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </div>
      <article className="analysis-article prose max-w-none">
        {updateBody.blocks.map(renderBlock)}
      </article>
    </div>
  );
};

export default Update;
