import React from "react";
import { BadgeCheck, CalendarCheck, Handshake, Users } from "lucide-react";

import StatBox from "./StatBox";

const OurStats = () => {
  return (
    <section className="flex justify-center py-10 max-w-6xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 xl:grid-rows-1 xl:grid-cols-4 gap-4">
        <StatBox
          icon={<BadgeCheck />}
          stat="2000+"
          caption="Members who have tested additional features, insights, and community benefits since the beginning."
        />
        <StatBox
          icon={<CalendarCheck />}
          stat="250+"
          caption="Annual Users who continue their access to premium platform features."
        />
        <StatBox
          icon={<Handshake />}
          stat="6+ years"
          caption="Supporting our community and continuously improving our technical analysis since launch."
        />
        <StatBox
          icon={<Users />}
          stat="10k+"
          caption="Followers and members across our public channels and communities."
        />
      </div>
    </section>
  );
};

export default OurStats;
