import Link from "next/link";
import React from "react";
import { FaCheck } from "react-icons/fa";

const features = [
  "Daily market commentary and analysis",

  "Short-term trade setups with clearly defined risk parameters",

  "Swing trade ideas and market trend observations",

  "Breakout and momentum watchlists",

  "Risk management and trading psychology resources",

  "Community access for discussion and Q&A",

  "Educational content covering market structure and strategy",

  "Long-form research reports on selected cryptocurrencies",

  "Algorithm-assisted market scans and alerts",

  "Ongoing market updates as conditions evolve",
];

const packages = [
  {
    duration: "1 MONTH",
    oldPrice: 100,
    newPrice: 75,
    highlight: false,
    description: "Ideal for exploring whether the membership fits your needs.",
  },
  {
    duration: "3 MONTHS",
    oldPrice: 300,
    newPrice: 200,
    highlight: true,
    description:
      "A popular option for members who want consistent market coverage.",
  },
  {
    duration: "6 MONTHS",
    oldPrice: 600,
    newPrice: 350,
    highlight: false,
    description:
      "Designed for members seeking longer-term access to research and analysis.",
  },
  {
    duration: "12 MONTHS",
    oldPrice: 1200,
    newPrice: 600,
    highlight: false,
    description:
      "Best value for members who want uninterrupted access throughout the year.",
  },
];

const PricingSection: React.FC = () => (
  <section id="pricing" className="py-16 bg-background">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          We Believe in Financial Freedom Through Trading
        </h2>
        <p className="text-lg text-primary-light max-w-2xl mx-auto mb-4">
          Helping Traders Understand Market Opportunities and Risks.
        </p>
        <h3 className="text-xl font-semibold text-primary mb-2">
          What CAN You Expect from Joining our Community?
        </h3>
      </div>
      <ul className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-base">
        {features.map((feat) => (
          <li key={feat} className="flex items-start gap-2 text-primary-light">
            <FaCheck className="mt-1 text-primary flex-shrink-0" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>
      <div className="bg-background p-4 rounded-2xl shadow-inner flex items-center flex-col">
        <h2 className="text-3xl font-bold text-text-main my-10">
          Community Membership Prices
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.duration}
              className={`flex flex-col gap-4 items-center rounded-xl p-6 border-2 transition duration-300 bg-surface relative ${
                pkg.highlight
                  ? "border-primary text-primary shadow-lg"
                  : "border-border"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute lg:-top-5 md:-top-5 -top-3 left-1/2 -translate-x-1/2 bg-primary text-surface text-xs font-bold text-center px-7 py-1 rounded-full shadow">
                  MOST POPULAR!
                </div>
              )}
              <div className="w-full text-center mb-2">
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    pkg.highlight ? "text-primary" : "text-text-muted"
                  }`}
                >
                  {pkg.duration}
                </span>
              </div>
              <div className="flex items-end gap-4 mb-1">
                <span className="text-text-muted line-through text-lg">
                  ${pkg.oldPrice}
                </span>
                <span className="text-3xl font-bold text-primary">
                  ${pkg.newPrice}
                </span>
              </div>
              <div className="text-xs text-text-muted mb-2 text-center">
                Access all premium trade ideas and community features.
              </div>
              <div className="text-sm text-primary-light text-center mb-4 min-h-[36px]">
                {pkg.description}
              </div>
              <Link
                href="/telegram"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full flex-grow flex justify-center items-end px-4 py-2 rounded-lg font-semibold transition text-sm ${
                  pkg.highlight
                    ? "underline text-text-main hover:text-primary-soft"
                    : "underline text-text-muted hover:text-text-main"
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
        <div className="my-4">
          <h3 className="text-md text-text-muted font-bold">
            Important notice
          </h3>
          <p className="text-sm text-text-muted">
            All content is provided for educational and informational purposes
            only and should not be considered financial, investment, or trading
            advice. Cryptocurrency markets involve substantial risk, and past
            performance does not guarantee future results. Always conduct your
            own research before making investment decisions.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default PricingSection;
