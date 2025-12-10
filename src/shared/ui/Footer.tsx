import React from "react";
import {
  FaTelegram,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socials = [
  {
    name: "Telegram",
    url: "/telegram",
    icon: <FaTelegram />,
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/COINEO963",
    icon: <FaXTwitter />,
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
    className="bg-background pt-2 text-text-main pb-8 px-4 border-t border-background"
  >
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
      {/* About CAN */}
      <div className="md:col-span-2">
        <h3 className="text-2xl font-bold text-primary mb-3">About CAN</h3>
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
        <h4 className="text-lg font-semibold text-primary mb-2">
          Contact Info
        </h4>
        <div className="flex items-center gap-2 mb-1">
          <FaTelegram className="text-primary" />
          <a
            href="/telegram"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram Channel
          </a>
        </div>
        <div className="flex items-center gap-2 mb-1 text-wrap">
          <FaEnvelope className="text-primary" />
          <a
            href="mailto:cryptoanalysis.can@gmail.com"
            className="hover:underline"
          >
            cryptoanalysis.can@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <FaClock className="text-primary" />
          <span>Everyday - 24/7</span>
        </div>
        <p className="mt-2 text-xs text-text-main">
          All our VIP SIGNALS & ANALYSIS are published on our Telegram channel.
        </p>
      </div>
      {/* Socials */}
      <div>
        <h4 className="text-lg font-semibold text-primary mb-2">Follow Us</h4>
        <div className="flex flex-wrap gap-3 mb-3">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-primary text-xl rounded-full bg-surface hover:bg-primary/20 transition-colors duration-200 w-10 h-10 flex items-center justify-center shadow-sm"
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
  </footer>
);

export default Footer;
