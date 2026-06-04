import { BaseMeta, EditorJSBody, Listed } from "@src/shared/types/posts";

export interface ArticleMeta extends BaseMeta {
  thumbnail: string;
}

export type ListedArticle = Listed<ArticleMeta>;

export interface ArticlePost extends ListedArticle {
  content: {
    body: EditorJSBody;
  };
}
