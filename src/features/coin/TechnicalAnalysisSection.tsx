import Link from "next/link";

import { AnalysisPostMeta } from "@src/types";
import Logo from "@shared/ui/Logo";

import { formatPostTimestamp } from "./utils";

type TechnicalAnalysisSectionProps = {
  symbol: string;
  analysisPosts: AnalysisPostMeta[];
};

const TechnicalAnalysisSection = ({
  symbol,
  analysisPosts,
}: TechnicalAnalysisSectionProps) => {
  return (
    <section className="bg-background border border-border rounded-xl p-6 shadow-inner space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-primary-soft">
            Technical Analysis
          </p>
          <h2 className="text-2xl font-semibold text-white">
            Latest {symbol.toUpperCase()} insights
          </h2>
          <p className="text-text-muted">
            Curated reports from CAN Trading desk.
          </p>
        </div>
        <Link
          href="/analysis"
          className="text-sm font-semibold text-primary hover:text-primary-soft transition-colors"
        >
          View all analysis →
        </Link>
      </div>

      {analysisPosts.length === 0 ? (
        <div className="text-text-muted text-sm border border-dashed border-border rounded-2xl p-6 text-center">
          We haven&apos;t published technical analysis for{" "}
          {symbol.toUpperCase()} yet. Check back soon!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {analysisPosts.slice(0, 4).map((post) => {
            const primarySymbol = post.coins?.[0] ?? symbol;
            return (
              <Link
                key={post.slug}
                href={`/analysis/${post.slug}`}
                className="group border border-border rounded-2xl p-5 bg-background/40 hover:border-primary hover:bg-background/60 transition-colors flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <Logo
                    symbol={primarySymbol}
                    fixedLogoUrl={post.thumbnail}
                    size="12"
                    padding="2"
                  />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-primary-soft">
                      {primarySymbol.toUpperCase()}
                    </p>
                    <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-text-muted line-clamp-3">
                  {post.desc}
                </p>
                <div className="flex flex-wrap items-center gap-2 justify-between">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={`${post.slug}-${tag}`}
                        className="text-xs px-2 py-1 rounded-full bg-background text-primary border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-text-muted">
                    {formatPostTimestamp(post.time)}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default TechnicalAnalysisSection;
