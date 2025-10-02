import { ChevronRight } from "lucide-react";
import Link from "next/link";

import SmallTables from "../components/small-tables/SmallTables";

const SmallTablesSection = () => {
  return (
    <section
      id="market-data-tables"
      className="w-full flex justify-center pt-4"
    >
      <div className="2xl:max-w-[100rem] xl:max-w-7xl max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
        <SmallTables />
      </div>
    </section>
  );
};

export default SmallTablesSection;
