import React from "react";
import { FaCheck } from "react-icons/fa";

const features = [
  "DAILY SCALP SIGNALS - Accurate signals with small stoploss for daily profits",
  "SWING SIGNALS - Riding market waves for bigger weekly profits",
  "BREAKOUT SIGNALS - Jumping into coins making good pumps or dumps",
  "INSIGHTS - Get informed before investing",
  "PREMIUM CHAT - Connect with traders, request coin analysis",
  "ALGO SCALPS - High leveraged signals for quick profit",
  "RISK MANAGEMENT TIPS - Trade safer with better risk management",
  "1-3 Manual signals daily",
  "5-10 Algorithm signals daily",
  "5 Long term analyses daily",
];

const packages = [
  {
    duration: "1 MONTH",
    oldPrice: 100,
    newPrice: 75,
    highlight: false,
    description: "Best for new members to try all premium features.",
  },
  {
    duration: "3 MONTHS",
    oldPrice: 300,
    newPrice: 200,
    highlight: true,
    description: "Save more by subscribing for a quarter.",
  },
  {
    duration: "6 MONTHS",
    oldPrice: 600,
    newPrice: 350,
    highlight: false,
    description: "Great value for committed traders.",
  },
  {
    duration: "12 MONTHS",
    oldPrice: 1200,
    newPrice: 600,
    highlight: false,
    description: "Maximize savings for long-term members.",
  },
];

const PricingSection: React.FC = () => (
  <section id="pricing" className="py-16 bg-[#1e1e1e]">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          We Believe in Financial Freedom
        </h2>
        <p className="text-lg text-orange-100 max-w-2xl mx-auto mb-4">
          In our hard work to find it, we would like to help others along the
          way as well.
        </p>
        <h3 className="text-xl font-semibold text-orange-400 mb-2">
          What CAN you expect from our{" "}
          <span className="underline">PREMIUM PACKAGE</span>?
        </h3>
      </div>
      <ul className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-base">
        {features.map((feat) => (
          <li key={feat} className="flex items-start gap-2 text-orange-100">
            <FaCheck className="mt-1 text-orange-400 flex-shrink-0" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>
      <div className="bg-[#181b20] p-4 rounded-2xl shadow-inner">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.duration}
              className={`flex flex-col gap-4 items-center rounded-xl p-6 border-2 transition duration-300 bg-[#23272e] relative ${
                pkg.highlight
                  ? "border-orange-400 shadow-lg"
                  : "border-gray-700"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute lg:-top-5 md:-top-5 -top-3 left-1/2 -translate-x-1/2 bg-orange-400 text-gray-900 text-xs font-bold text-center px-7 py-1 rounded-full shadow">
                  MOST POPULAR!
                </div>
              )}
              <div className="w-full text-center mb-2">
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    pkg.highlight ? "text-orange-400" : "text-gray-400"
                  }`}
                >
                  {pkg.duration}
                </span>
              </div>
              <div className="flex items-end gap-4 mb-1">
                <span className="text-gray-400 line-through text-lg">
                  ${pkg.oldPrice}
                </span>
                <span className="text-3xl font-bold text-orange-400">
                  ${pkg.newPrice}
                </span>
              </div>
              <div className="text-xs text-gray-400 mb-2 text-center">
                All premium features included
              </div>
              <div className="text-sm text-orange-100 text-center mb-4 min-h-[36px]">
                {pkg.description}
              </div>
              <button
                className={`w-full flex-grow flex justify-center items-end px-4 py-2 rounded-lg font-semibold transition text-sm ${
                  pkg.highlight
                    ? "text-orange-400 underline text-gray-900 hover:text-orange-500"
                    : "text-gray-700 underline text-white hover:text-gray-600"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default PricingSection;
