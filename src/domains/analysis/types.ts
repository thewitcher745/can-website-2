import { BaseMeta, EditorJSBody, Listed } from "@src/shared/types/posts";

export interface AnalysisMeta extends BaseMeta {
  coins: string[];
  image: string;
  isVip: boolean;
}

export type ListedAnalysis = Listed<AnalysisMeta>;

export interface AnalysisPost extends ListedAnalysis {
  content: {
    body: EditorJSBody;
    updates?: EditorJSBody[];
  };
}
