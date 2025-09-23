import Link from "next/link";
import { ChevronRight } from "lucide-react";

import HighPotentialContainer from "./high-potential/HighPotentialContainer";

const HighPotentialTokensSection = () => {
  return (
    <section id="high-potential" className="w-full flex justify-center my-2">
      <div className="2xl:max-w-[100rem] xl:max-w-7xl max-w-6xl py-4 w-full flex flex-col items-center justify-center">
        <div className="flex flex-col self-start sm:text-left">
          <Link
            href="/analysis"
            className="flex items-center gap-2 text-2xl font-bold text-text-main"
          >
            High Potential Tokens
            <ChevronRight className="w-4 h-4 text-text-muted" />
          </Link>
        </div>
        <HighPotentialContainer />
      </div>
    </section>
  );
};

export default HighPotentialTokensSection;
