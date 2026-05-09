export interface ArticleMeta {
  author: string;
  description: string;
  tags: string[];
  time: string;
  title: string;
  thumbnail?: string;
}

export interface ListedArticle {
  slug: string;
  meta: ArticleMeta;
}
