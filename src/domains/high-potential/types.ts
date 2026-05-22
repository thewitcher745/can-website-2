import { BaseMeta, EditorJSBody, Listed } from "@src/shared/types/posts";

type HighPotentialCategory = "bronze" | "silver" | "gold";

export interface HighPotentialMeta extends BaseMeta {
  image: string;
  logo: string;
  symbol: string;
  category: HighPotentialCategory;
}

export type ListedHighPotential = Listed<HighPotentialMeta>;

export interface HighPotentialPost extends ListedHighPotential {
  content: {
    body: EditorJSBody;
  };
}
