import Link from "next/link";

import TokenCard from "./TokenCard";
import { useHomePageData } from "@src/contexts/HomepageContext";

const HighPotentialContainer = ({ number = 10 }: { number?: number }) => {
  const { highPotentialPosts: posts } = useHomePageData();

  return (
    <div className="w-full flex gap-2 rounded-xl p-4 overflow-x-scroll lg:overflow-hidden">
      {posts.slice(0, number).map((post) => (
        <Link key={post.slug} href={`/high-potential/${post.slug}`}>
          <TokenCard token={post} />
        </Link>
      ))}
    </div>
  );
};

export default HighPotentialContainer;
