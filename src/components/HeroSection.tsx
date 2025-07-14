import React, { useEffect, useState } from "react";

const heroImages = [
  "/images/showcase/can-banner.png",
  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1651341050677-24dba59ce0fd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpdHxlbnwwfHwwfHx8MA%3D%3D",
];

const SLIDE_DURATION = 5000; // ms

const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((c) => (c + 1) % heroImages.length);
    }, SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <section
      id="home"
      className="pt-28 pb-20 md:pt-36 md:pb-28 bg-gradient-to-br from-gray-900 to-gray-800 text-text-muted"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex items-center gap-8">
          <div className="md:w-1/2 mb-14 md:mb-0">
            {/* Animated Title */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl py-2 font-bold text-primary leading-tight mb-6 animate-hero-title"
              style={{
                background: "linear-gradient(90deg, #fe9a00, #ffcb37)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                display: "inline-block",
              }}
            >
              CAN Trading Signals
            </h1>
            {/* Subtitle with fade-in */}
            <p className="text-lg text-primary font-semibold mb-2 animate-fade-in-delay-1">
              Expert Financial Technical Analysis
            </p>
            {/* Description with fade-in */}
            <p className="text-lg text-primary-light mb-8 animate-fade-in-delay-2">
              Providing professional trading signals and risk management
              strategies for individuals.
            </p>
            <div className="flex space-x-4 animate-fade-in-delay-3">
              <a
                href="#pricing"
                className="bg-primary text-black px-6 py-3 border-1 border-primary rounded-md font-semibold hover:bg-transparent hover:text-primary hover:border-primary hover:border-1 transition shadow-sm"
              >
                Get Started
              </a>
              <a
                href="#services"
                className="py-3 px-6 text-text-main font-semibold underline"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center relative">
            <div className="image-container floating-bg h-96 w-full max-w-xl overflow-hidden flex items-center justify-center bg-black/30 rounded-2xl relative">
              {heroImages.map((img, idx) => {
                const isCurrent = idx === current;
                return (
                  <img
                    key={img}
                    src={img}
                    alt="Financial Analysis visual"
                    className={`object-cover w-full h-full absolute top-0 left-0 transition-all duration-[5000ms] ease-linear
                      ${isCurrent ? "opacity-100 z-20" : "opacity-0 z-10"}
                    `}
                    style={{
                      transitionProperty:
                        "opacity, filter, transform, scale, box-shadow, border",
                      borderRadius: "1rem",
                      boxShadow: isCurrent
                        ? "0 10px 32px 0 rgba(104, 104, 104, 0.5)"
                        : "none",
                      pointerEvents: isCurrent ? "auto" : "none",
                      transform: isCurrent ? "scale(1.08)" : "scale(1)",
                      opacity: isCurrent ? 1 : 0,
                    }}
                    draggable={false}
                  />
                );
              })}
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-orange-500/10 pointer-events-none rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes hero-title {
          0% {
            opacity: 0;
            transform: translateY(-10px) scale(0.99);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-hero-title {
          animation: hero-title 1.8s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-delay-1 {
          animation: fade-in 1.5s 0.5s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .animate-fade-in-delay-2 {
          animation: fade-in 1.5s 0.8s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .animate-fade-in-delay-3 {
          animation: fade-in 1.5s 1.1s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        }
        .animate-hero-img-zoom {
          animation: hero-img-zoom 6s linear forwards;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
