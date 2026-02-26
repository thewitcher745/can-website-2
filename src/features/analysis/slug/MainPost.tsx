import { AnalysisPost } from "@src/types";
import PostBody from "./PostBody";

const MainPost = ({ post }: { post: AnalysisPost }) => {
  return (
    <div className="rounded-lg p-8 mt-4">
      <h1 className="text-xl md:text-3xl font-semibold mb-4 text-text-main hover:text-primary transition-colors">
        {post.meta.title}
      </h1>
      <div className="text-xs text-text-muted mb-4">
        {new Date(post.meta.time).toLocaleDateString(undefined, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}{" "}
        {new Date(post.meta.time).toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </div>
      <PostBody postBody={post.body} />
    </div>
  );
};

export default MainPost;
