export type PostType = "analysis" | "blog" | "news" | "high-potential";
export type PostStatus = "published" | "draft" | "archived";

export interface BaseMeta {
  title: string;
  author: string;
  publishedAt: string | null;
  lastModifiedAt: string | null;
  createdAt: string | null;
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

export type EditorJsBlock =
  | HeaderBlock
  | ParagraphBlock
  | ListBlock
  | TableBlock
  | ImageBlock;

export type EditorJSBody = {
  time: string; // ISO-format datetime string
  version: string;
  blocks: EditorJsBlock[];
};
