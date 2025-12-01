import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaInstagram, FaTelegram, FaTiktok, FaXTwitter } from "react-icons/fa6";

const DesktopCTAButton = ({
  href,
  icon,
  text,
  highlight = false,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
  highlight?: boolean;
}) => {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <div
        className={`text-offwhite text-wrap font-semibold flex items-center gap-2 lg:flex bg-border/60 p-3 w-45 h-12 rounded-lg justify-center hover:bg-border transition duration-200 ${
          highlight ? "shadow-primary shadow-lg" : ""
        }`}
      >
        {icon}
        <span className="text-offwhite">{text}</span>
      </div>
    </Link>
  );
};

const MobileCTAButton = ({
  href,
  icon,
  text,
  highlight = false,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
  highlight?: boolean;
}) => {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <div
        className={`text-offwhite text-wrap font-semibold flex items-center gap-2 lg:flex bg-border/60 p-3 w-32 h-12 rounded-lg justify-center hover:bg-border transition duration-200 ${
          highlight ? "shadow-primary shadow-lg" : ""
        }`}
      >
        {icon}
        <span className="text-offwhite text-sm">{text}</span>
      </div>
    </Link>
  );
};

const Banner = ({ className }: { className?: string }) => {
  return (
    <section className={`w-full relative flex justify-center ${className}`}>
      <div className="relative w-250 max-w-full border border-border flex p-10 pt-40 md:p-10 rounded-xl bg-gradient-to-b md:bg-radial-[at_top_right] from-primary/40 from-0% via-transparent via-60% to-transparent overflow-x-hidden overflow-y-visible">
        <div className="w-full z-10">
          <div className="w-full text-center md:text-left md:w-82 lg:w-120 border-b-2 border-primary pb-4">
            <span className="text-white font-bold text-3xl text-wrap">
              Get Full Access to All Our Content for Free!
            </span>
          </div>
          <div className="hidden sm:flex flex-wrap justify-center md:justify-start items-center my-6 gap-2 sm:gap-4">
            <DesktopCTAButton
              highlight
              href="/telegram"
              icon={<FaTelegram />}
              text="Our Telegram"
            />
            <DesktopCTAButton
              href="https://x.com/COINEO963"
              icon={<FaXTwitter />}
              text="Our X/Twitter"
            />
            <DesktopCTAButton
              href="https://www.instagram.com/CryptoANalysis_CAN"
              icon={<FaInstagram />}
              text="Our Instagram"
            />
          </div>
          <div className="flex sm:hidden flex-wrap justify-center md:justify-start items-center my-6 gap-2 sm:gap-4">
            <MobileCTAButton
              highlight
              href="/telegram"
              icon={<FaTelegram />}
              text="Telegram"
            />
            <MobileCTAButton
              href="https://x.com/COINEO963"
              icon={<FaXTwitter />}
              text="X/Twitter"
            />
            <MobileCTAButton
              href="https://www.instagram.com/CryptoANalysis_CAN"
              icon={<FaInstagram />}
              text="Instagram"
            />
          </div>
          <div className="m-1 flex justify-center md:justify-start">
            <span className="text-text-muted text-xs text-wrap">
              You can find our other outlets at the bottom of the website.
            </span>
          </div>
        </div>
        <div className="absolute z-0 top-0 left-[50%] translate-x-[-50%] md:translate-x-0 md:left-auto md:right-0 w-40 h-40 md:w-60 md:h-60 opacity-60">
          <Image
            src="/images/logos/can-logo.png"
            alt="Telegram"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
