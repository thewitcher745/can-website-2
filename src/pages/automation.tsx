import { useEffect } from "react";
import Link from "next/link";
import { FaArrowRight, FaRobot, FaTelegram, FaShieldAlt } from "react-icons/fa";
import { FaChartLine, FaClock } from "react-icons/fa6";

import Banner from "@src/features/homepage/components/promotions/Banner";
import ResultsDisplay from "@src/features/homepage/components/results-section/ResultsDisplay";
import MinimalSummary from "@src/features/full-results/components/summary/MinimalSummary";
import MetaTags from "@src/shared/MetaTags";
import Footer from "@src/shared/ui/Footer";
import GlassCard from "@src/shared/ui/GlassCard";
import {
  CategoryProvider,
  MonthYearProvider,
  useCategory,
} from "@src/domains/results/context";

const ctaClass =
  "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition duration-300 bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg hover:shadow-primary/40 hover:scale-[1.02]";

const secondaryCtaClass =
  "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition duration-300 border border-border bg-surface text-text-main hover:bg-surface/80";

const AlgorithmChart = () => {
  const { setCategory } = useCategory();

  useEffect(() => {
    setCategory("algorithm");
  }, [setCategory]);

  return <ResultsDisplay />;
};

const AutomationPage = () => {
  return (
    <>
      <MetaTags
        title="Algorithm Overview"
        description="An overview of our automated market research workflow, monthly algorithm snapshot, and Telegram updates."
        canonicalUrl="https://can-trading.com/automation"
        image="/images/showcase/can-banner.png"
        type="website"
      />
      <main className="pb-16 pt-4 bg-background flex flex-col items-center">
        <section className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-stretch">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-text-muted">
                  <FaRobot className="text-primary" />
                  Automated market research
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.04em] text-text-main leading-[1.02]">
                  A faster way to track
                  <span className="text-primary"> market structure</span>
                </h1>
                <p className="max-w-2xl text-lg md:text-xl leading-8 text-text-muted">
                  Our automation workflow scans market structure, filters for
                  higher-conviction conditions, and turns the result into a
                  simple monthly snapshot. Telegram remains the primary place
                  where updates and summaries are shared.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/telegram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ctaClass}
                  >
                    <FaTelegram />
                    Open Telegram
                  </Link>
                  <Link href="/services" className={secondaryCtaClass}>
                    View Services
                    <FaArrowRight />
                  </Link>
                </div>
              </div>

              <GlassCard className="rounded-2xl p-6 md:p-8 border border-border">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      icon: <FaChartLine className="text-primary" />,
                      title: "Chart first",
                      text: "A compact monthly chart that summarizes the algorithm view at a glance.",
                    },
                    {
                      icon: <FaShieldAlt className="text-primary" />,
                      title: "Risk aware",
                      text: "A review layer that keeps the process focused on filters, confirmation, and discipline.",
                    },
                    {
                      icon: <FaClock className="text-primary" />,
                      title: "Always on",
                      text: "Monitoring runs continuously so the team can track changes as conditions develop.",
                    },
                    {
                      icon: <FaTelegram className="text-primary" />,
                      title: "Telegram-led",
                      text: "Telegram is the primary outlet for updates, summaries, and implementation notes.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-xl bg-surface p-4">
                      <div className="mb-3 text-xl">{item.icon}</div>
                      <h2 className="mb-1 text-lg font-semibold text-text-main">
                        {item.title}
                      </h2>
                      <p className="text-sm leading-6 text-text-muted">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        <section className="w-full py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] items-start">
              <GlassCard className="rounded-2xl p-6 md:p-8 border border-border">
                <h2 className="text-2xl md:text-3xl font-bold text-text-main">
                  Workflow notes
                </h2>
                <p className="mt-4 text-text-muted leading-7">
                  The workflow starts with market screening, moves through
                  condition checks, and ends with a short internal review before
                  anything is shared publicly.
                </p>
                <div className="mt-6 space-y-4 text-sm leading-6 text-text-muted">
                  <p>
                    • Inputs are grouped by structure, momentum, and reaction
                    zones before any summary is produced.
                  </p>
                  <p>
                    • Each update is reviewed for clarity so the public summary
                    stays concise and actionable.
                  </p>
                  <p>
                    • The chart reflects the current month’s algorithm category
                    performance snapshot.
                  </p>
                </div>
                <div className="mt-8">
                  <Link
                    href="/telegram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ctaClass}
                  >
                    Get updates on Telegram
                    <FaArrowRight />
                  </Link>
                </div>
              </GlassCard>

              <div className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-text-main">
                      Algorithm snapshot
                    </h2>
                    <p className="mt-2 text-text-muted">
                      The chart below reuses the live algorithm series from the
                      results section so the page stays aligned with the latest
                      monthly data.
                    </p>
                  </div>
                </div>
                <MonthYearProvider>
                  <CategoryProvider defaultCategory="algorithm">
                    <MinimalSummary />
                    <AlgorithmChart />
                  </CategoryProvider>
                </MonthYearProvider>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8">
          <div className="px-4 w-full flex justify-center">
            <Banner />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AutomationPage;
