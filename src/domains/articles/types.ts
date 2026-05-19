import { BaseMeta, Body, Listed } from "@src/shared/types/content";

export interface ArticleMeta extends BaseMeta {
  thumbnail: string;
}

export type ListedArticleMeta = Listed<ArticleMeta>;

export interface ArticlePost extends ListedArticleMeta {
  body: Body;
}
