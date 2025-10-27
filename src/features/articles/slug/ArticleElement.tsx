import React from "react";
import Link from "next/link";
import { Article } from "@src/types";

type ArticleElementProps = {
  article: Article;
  backHref: string;
  backText: string;
};

const ArticleElement: React.FC<ArticleElementProps> = ({
  article,
  backHref,
  backText,
}) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 pt-6">
      <Link href={backHref} className="text-primary hover:underline text-sm">
        ← Back to {backText}
      </Link>
      <div className="rounded-lg p-8 mt-4">
        <h1 className="text-xl md:text-3xl font-semibold mb-4 text-text-main hover:text-primary transition-colors">
          {article.title}
        </h1>
        <div className="text-xs text-text-muted mb-4">
          {new Date(article.time).toLocaleDateString(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}{" "}
          {new Date(article.time).toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="bg-secondary-light text-secondary text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <article
          className="blog-article prose prose-invert text-red max-w-none text-text-main"
          dangerouslySetInnerHTML={{ __html: article.content_html }}
        />
      </div>
    </div>
  );
};

export default ArticleElement;

