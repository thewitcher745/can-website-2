import React from "react";
import {
  FaTelegram,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

const socials = [
  {
    name: "Telegram",
    url: "https://t.me/CryptoANalysis_CAN",
    icon: <FaTelegram />,
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/COINEO963",
    icon: <FaTwitter />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/CryptoANalysis_CAN",
    icon: <FaInstagram />,
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@CryptoANalysis_CAN",
    icon: <FaYoutube />,
  },
  {
    name: "Tiktok",
    url: "https://www.tiktok.com/@cryptoanalysis_can",
    icon: <FaTiktok />,
  },
];

const Footer: React.FC = () => (
  <footer
    id="contact"
    className="bg-background text-text-main pt-12 pb-8 px-4 border-t border-background"
  >
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
      {/* About CAN */}
      <div className="md:col-span-2">
        <h3 className="text-2xl font-bold text-text-muted mb-3">About CAN</h3>
        <p className="mb-3 text-text-main">
          CAN began its professional journey in the crypto market in 2020,
          consistently delivering high-quality technical analysis to guide
          smarter trading decisions — without a single day off.
        </p>
        <p className="mb-3 text-text-main">
          Our mission is to achieve financial freedom through cryptocurrency
          trading, and we’re passionate about helping others pursue the same
          path.
        </p>
        <p className="mb-3 text-text-main">
          We rely on a blend of proven technical methods — including Neo Wave,
          Wyckoff Theory, Price Action, IMF analysis, and more — to provide
          reliable, in-depth market insights for traders at all levels.
        </p>
      </div>
      {/* Contact Info */}
      <div>
        <h4 className="text-lg font-semibold text-text-muted mb-2">
          Contact Info
        </h4>
        <div className="flex items-center gap-2 mb-1">
          <FaTelegram className="text-text-muted" />
          <a
            href="https://t.me/CryptoANalysis_CAN"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram Channel
          </a>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <FaEnvelope className="text-text-muted" />
          <a
            href="mailto:cryptoanalysis.can@gmail.com"
            className="hover:underline"
          >
            cryptoanalysis.can@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <FaClock className="text-text-muted" />
          <span>Everyday - 24/7</span>
        </div>
        <p className="mt-2 text-xs text-text-main">
          All our VIP SIGNALS & ANALYSIS are published on our Telegram channel.
        </p>
      </div>
      {/* Socials */}
      <div>
        <h4 className="text-lg font-semibold text-text-muted mb-2">
          Follow Us
        </h4>
        <div className="flex flex-wrap gap-3 mb-3">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text-main text-xl"
              aria-label={s.name}
            >
              {s.icon}
            </a>
          ))}
        </div>
        <div className="text-xs text-text-main">
          You can follow us on other social media as well.
        </div>
      </div>
    </div>
    {/* Bottom Bar */}
    <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-background flex flex-col md:flex-row items-center justify-between text-xs text-text-main">
      <div className="mb-2 md:mb-0">
        CAN Trading Signals — Providing professional trading signals and risk
        management strategies for individuals.
      </div>
      <div className="flex gap-4">
        <span>
          Quick Links: <span className="italic">(Coming soon)</span>
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
