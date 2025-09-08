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
          caption="Our VIP platform has been tested by more than 2000 users."
        />
        <StatBox
          icon={<CalendarCheck />}
          stat="100+"
          caption="More than 100 annual subscription renewals."
        />
        <StatBox
          icon={<Handshake />}
          stat="6"
          caption="6 years of constant support for our valued VIP members."
        />
        <StatBox
          icon={<Users />}
          stat="100k+"
          caption="More than 100k public channel members."
        />
      </div>
    </section>
  );
};

export default OurStats;
