import Link from "next/link";
import PostBody from "./PostBody";
import { ArticlePost } from "@src/domains/articles/types";

type ArticleElementProps = {
  article?: ArticlePost;
  backHref: string;
  backText: string;
  fallbackHref: string;
  fallbackText: string;
};

const ArticleElement = ({
  article,
  backHref,
  backText,
  fallbackText,
  fallbackHref,
}: ArticleElementProps) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 pt-6">
      {article ? (
        <>
          <Link
            href={backHref}
            className="text-primary hover:underline text-sm"
          >
            ← Back to {backText}
          </Link>
          <div className="rounded-lg p-8 mt-4">
            <h1 className="text-xl md:text-3xl font-semibold mb-4 text-text-main hover:text-primary transition-colors">
              {article.meta.title}
            </h1>
            <div className="text-xs text-text-muted mb-4">
              {new Date(article.meta.publishedAt || "").toLocaleDateString(
                undefined,
                {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                },
              )}{" "}
              {new Date(article.meta.publishedAt || "").toLocaleTimeString(
                undefined,
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                },
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {article.meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-secondary-light text-secondary text-xs px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <PostBody postBody={article.content.body}></PostBody>
          </div>
        </>
      ) : (
        <div className="rounded-lg p-8 mt-4 flex flex-col items-center">
          <h3 className="text-text-muted">
            This post can't be displayed at the moment. Try again later!
          </h3>
          <h3 className="text-text-muted">
            Meanwhile, see our{" "}
            <Link
              className="underline text-primary hover:text-primary-dark"
              href={fallbackHref}
            >
              other {fallbackText} posts.
            </Link>
          </h3>
        </div>
      )}
    </div>
  );
};

export default ArticleElement;
