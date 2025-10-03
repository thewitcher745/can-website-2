import React from "react";
import {
  FaBell,
  FaRobot,
  FaShieldAlt,
  FaChartPie,
  FaBalanceScale,
  FaGraduationCap,
} from "react-icons/fa";

const services = [
  {
    icon: <FaBell className="w-8 h-8 text-primary" />,
    title: "Trading Signals",
    desc: "Get high-quality signals tailored to your style—daily scalps with tight stoplosses, swing trades for steady weekly gains, and breakout alerts to catch major market moves.",
  },
  {
    icon: <FaRobot className="w-8 h-8 text-primary" />,
    title: "Algorithmic Trading",
    desc: "Algorithmic Trading Signals designed for quick profit with high leverage and tight risk management strategies.",
  },
  {
    icon: <FaShieldAlt className="w-8 h-8 text-primary" />,
    title: "Risk Management",
    desc: "Comprehensive risk management strategies for different types of signals to reduce your risk exposure in crypto market and minimize potential losses.",
  },
  {
    icon: <FaChartPie className="w-8 h-8 text-primary" />,
    title: "Crypto Market Insight",
    desc: "In-depth market analysis and insights to help you make informed trading decisions and ride the market in the right direction.",
  },
  {
    icon: <FaBalanceScale className="w-8 h-8 text-primary" />,
    title: "Portfolio Optimization",
    desc: "Strategically diversify your capital between Futures trading and Spot trading to maximize your profit while balancing risk.",
  },
  {
    icon: <FaGraduationCap className="w-8 h-8 text-primary" />,
    title: "Trading Education",
    desc: "Join the conversation with our team of analysts in a chat group designed to explain and discuss your own trading setups and analysis.",
  },
];

const ServicesSection: React.FC = () => (
  <section id="services" className="pb-16 pt-4 bg-background">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4">
          Our Premium Services
        </h2>
        <p className="text-lg text-text-muted max-w-3xl mx-auto">
          Comprehensive financial analysis solutions tailored to your trading
          needs
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <div
            key={service.title}
            className="bg-surface p-8 rounded-xl transition duration-300 hover:-translate-y-2 hover:shadow-lg card-hover group"
          >
            <div className="bg-surface w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              {service.icon}
            </div>
            <div className="h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-300 mx-auto mb-6 rounded-full" />
            <h3 className="text-xl font-semibold text-text-main mb-3 text-center">
              {service.title}
            </h3>
            <p className="text-text-muted text-center">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
