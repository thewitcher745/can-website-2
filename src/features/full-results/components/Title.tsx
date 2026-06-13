import { Crown, Gem } from "lucide-react";
import Link from "next/link";

import GlassCard from "@src/shared/ui/GlassCard";

const Title = () => {
  return (
    <section className="overflow-hidden h-auto md:h-100">
      <div className="relative w-full h-full">
        <img
          src="/images/results-title-bg.png"
          className="absolute z-0 right-1/2 translate-x-1/2 md:translate-x-0 md:right-0 h-100"
        />
        <div className="z-3 flex flex-col items-center p-10 md:items-start rounded-xl md:bg-transparent gap-4">
          <div className="flex flex-col md:flex-row items-center z-2">
            <Crown size={100} className="text-primary p-2 rounded-full" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-main text-center md:text-left">
              Analysis Monthly Performance
            </h1>
          </div>
          <br />
          <p className="text-lg md:text-xl lg:text-2xl font-semibold text-center md:text-left text-text-main md:text-text-muted max-w-md z-2">
            Browse through the full gallery of our results and review our
            performance in prior periods.
          </p>
          <Link href="/telegram" className="cursor-pointer group z-2">
            <GlassCard className="flex backdrop-blur-sm items-center rounded-xl bg-surface/40 h-15">
              <div className="rounded-xl shadow-md">
                <Gem className="text-primary bg-gradient-to-b from-primary/25 to-transparent rounded-xl p-2 h-15 w-auto" />
              </div>
              <h4 className="text-md md:text-xl lg:text-2xl text-text-main mx-4 group-hover:text-primary transition-all duration-200">
                Join our Community for Free!
              </h4>
            </GlassCard>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Title;
