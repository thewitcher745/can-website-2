import { PostStatus, PostType } from "@src/shared/types/posts";
import { Admin } from "./types";
import { AnalysisPost } from "../analysis/types";
import { ArticlePost } from "../articles/types";
import { HighPotentialPost } from "../high-potential/types";

export function getAdminToken(): string | null {
  return localStorage.getItem("admin_token") || null;
}

/**
 * Creates an empty post of the given type for the create mode of the PostEditor
 *
 * @param postType The type of post to create.
 */
export function createEmptyPost(
  postType: PostType,
): Admin<AnalysisPost> | Admin<ArticlePost> | Admin<HighPotentialPost> {
  const baseMeta = {
    title: "",
    author: "",
    publishedAt: null,
    lastModifiedAt: null,
    createdAt: null,
    description: "",
    tags: [],
  };

  const content = {
    body: {
      version: "",
      time: new Date().toISOString(),
      blocks: [],
    },
  };

  const adminBaseProps = {
    status: "draft" as PostStatus,
    type: postType,
    slug: "",
    content,
  };

  switch (postType) {
    case "analysis":
      return {
        ...adminBaseProps,
        meta: {
          ...baseMeta,
          coins: [],
          image: "",
          isVip: false,
        },
        content: {
          body: content.body,
          updates: [],
        },
      } as Admin<AnalysisPost>;

    case "blog":
    case "news":
      return {
        ...adminBaseProps,
        meta: {
          ...baseMeta,
          thumbnail: "",
        },
      } as Admin<ArticlePost>;

    case "high-potential":
      return {
        ...adminBaseProps,
        meta: {
          ...baseMeta,
          image: "",
          logo: "",
          symbol: "",
          category: "bronze",
        },
      } as Admin<HighPotentialPost>;
  }
}
