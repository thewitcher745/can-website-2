export type PostType = "analysis" | "blog" | "news" | "high-potential";

export interface BaseMeta {
  title: string;
  author: string;
  publishedAt: string;
  lastModifiedAt: string;
  time: string;
  createdAt: string;
  description: string;
  tags: string[];
}

export interface Listed<T> {
  slug: string;
  meta: T;
}

type HeaderBlock = {
  type: "header";
  data: { text: string; level: 1 | 2 | 3 | 4 | 5 | 6 };
};

type ParagraphBlock = {
  type: "paragraph";
  data: { text: string };
};

type ListBlock = {
  type: "list";
  data: {
    style: "ordered" | "unordered";
    items: {
      content: string;
      items: any;
      meta: any;
    }[];
  };
};

type TableBlock = {
  type: "table";
  data: {
    content: string[][];
    withHeadings: boolean;
  };
};

type ImageBlock = {
  type: "image";
  data: {
    file: { url: string };
    caption?: string;
  };
};

export type BodyBlock =
  | HeaderBlock
  | ParagraphBlock
  | ListBlock
  | TableBlock
  | ImageBlock;

export type Body = {
  time: number;
  version: string;
  blocks: BodyBlock[];
};
