import React from "react";
import Link from "next/link";
import { ArticlePost } from "@src/types";
import renderBlock from "@src/shared/ui/articles/articleRenderer";
import PostBody from "./PostBody";

type ArticleElementProps = {
  article: ArticlePost;
  backHref: string;
  backText: string;
};

const ArticleElement: React.FC<ArticleElementProps> = ({
  article,
  backHref,
  backText,
}) => {
  const postBody = article.body;
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 pt-6">
      <Link href={backHref} className="text-primary hover:underline text-sm">
        ← Back to {backText}
      </Link>
      <div className="rounded-lg p-8 mt-4">
        <h1 className="text-xl md:text-3xl font-semibold mb-4 text-text-main hover:text-primary transition-colors">
          {article.meta.title}
        </h1>
        <div className="text-xs text-text-muted mb-4">
          {new Date(article.meta.time).toLocaleDateString(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}{" "}
          {new Date(article.meta.time).toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
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
        <PostBody postBody={article.body}></PostBody>
      </div>
    </div>
  );
};

export default ArticleElement;
