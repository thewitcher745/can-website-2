import { PostStatus, PostType } from "@src/shared/types/posts";
import { AnalysisPost } from "../analysis/types";
import { ArticlePost } from "../articles/types";
import { HighPotentialPost } from "../high-potential/types";

export type SortField = "time" | "title" | "lastModifiedTime" | "type";
export type SortOrder = "asc" | "desc";

/**
 * The admin version of each API response, with type and status added.
 */
export type Admin<T> = T & {
  type: PostType;
  status: PostStatus;
};

export type EditorPost =
  | Admin<AnalysisPost>
  | Admin<ArticlePost>
  | Admin<HighPotentialPost>
  | null;
