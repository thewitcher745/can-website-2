import { ListedAnalysis } from "@src/domains/analysis/types";
import { ListedArticle } from "@src/domains/articles/types";
import { ListedHighPotential } from "@src/domains/high-potential/types";
import { createContext, ReactNode, useContext } from "react";

export type HomePageProps = {
  analysisPosts: ListedAnalysis[];
  blogPosts: ListedArticle[];
  newsPosts: ListedArticle[];
  highPotentialPosts: ListedHighPotential[];
};

const InitialHomepageData = {
  analysisPosts: [],
  blogPosts: [],
  newsPosts: [],
  highPotentialPosts: [],
};

const HomepageContext = createContext<HomePageProps>(InitialHomepageData);

export function HomepageProvider({
  value,
  children,
}: {
  value: HomePageProps;
  children: ReactNode;
}) {
  return (
    <HomepageContext.Provider value={value}>
      {children}
    </HomepageContext.Provider>
  );
}

export function useHomePageData() {
  return useContext(HomepageContext);
}
