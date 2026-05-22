import { PostStatus, PostType } from "@src/shared/types/posts";

export type SortField = "time" | "title" | "lastModifiedTime" | "type";
export type SortOrder = "asc" | "desc";

/**
 * The admin version of each API response, with type and status added.
 */
export type Admin<T> = T & {
  type: PostType;
  status: PostStatus;
};
