import { Article } from "@src/types";

const MainPost = ({ mainPost }: { mainPost: Article }) => {
  return (
    <div className="rounded-lg p-8 mt-4">
      <h1 className="text-xl md:text-3xl font-semibold mb-4 text-text-main hover:text-primary transition-colors">
        {mainPost.title}
      </h1>
      <div className="text-xs text-text-muted mb-4">
        {new Date(mainPost.time).toLocaleDateString(undefined, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}{" "}
        {new Date(mainPost.time).toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </div>
      <article
        className="analysis-article prose prose-invert max-w-none text-text-main"
        dangerouslySetInnerHTML={{ __html: mainPost.content_html }}
      />
    </div>
  );
};

export default MainPost;
