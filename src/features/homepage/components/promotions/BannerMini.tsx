import React from "react";
import Image from "next/image";
import { FaInstagram, FaTelegram, FaTiktok, FaXTwitter } from "react-icons/fa6";

const Banner = ({ className }: { className?: string }) => {
  return (
    <section
      className={`w-full relative flex justify-center max-w-6xl sm:pt-20 mt-30 sm:mt-10 md:mt-0 ${className}`}
    >
      <div className="max-w-250 flex p-10 pt-25 md:p-10 rounded-xl bg-gradient-to-br from-primary-dark to-primary/60 overflow-x-hidden overflow-y-visible">
        <div className="w-full">
          <div className="w-full text-center md:text-left md:w-120 pb-4">
            <span className="text-white font-bold text-3xl text-wrap">
              Stay connected with our community!
            </span>
          </div>
          <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-start items-center mt-2 gap-2 sm:gap-4">
            <div className="flex bg-offwhite p-2 w-40 h-12 rounded-xl mt-0 items-center justify-center shadow-lg hover:bg-primary transition duration-200">
              <a
                href="/telegram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black text-lg text-wrap font-semibold flex items-center justify-center gap-4"
              >
                <FaTelegram className="text-3xl" />
                <span className="text-black">Telegram</span>
              </a>
            </div>
            <div className="flex bg-offwhite p-2 w-40 h-12 rounded-xl mt-0 items-center justify-center hover:bg-primary transition duration-200">
              <a
                href="https://x.com/COINEO963"
                className="text-black text-lg text-wrap font-semibold flex items-center justify-center gap-4"
              >
                <FaXTwitter className="text-3xl" />
                <span className="text-black">X</span>
              </a>
            </div>
            <div className="flex bg-offwhite p-2 w-40 h-12 rounded-xl mt-0 items-center justify-center hover:bg-primary transition duration-200">
              <a
                href="https://instagram.com/CryptoANalysis_CAN"
                className="text-black text-lg text-wrap font-semibold flex items-center justify-center gap-4"
              >
                <FaInstagram className="text-3xl" />
                <span className="text-black">Instagram</span>
              </a>
            </div>
            <div className="flex bg-offwhite p-2 w-40 h-12 rounded-xl mt-0 items-center justify-center hover:bg-primary transition duration-200">
              <a
                href="https://www.tiktok.com/@cryptoanalysis_can"
                className="text-black text-lg text-wrap font-semibold flex items-center justify-center gap-4"
              >
                <FaTiktok className="text-3xl" />
                <span className="text-black">TikTok</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-60 h-60 md:w-70 md:h-70 absolute left-1/2 right-auto md:left-auto md:right-0 -translate-x-1/2 md:-translate-x-1/4 -top-30 sm:-top-10"
        style={{
          animation: "banner-logo-animation 6s ease-in-out infinite",
          transformStyle: "preserve-3d",
        }}
      >
        <Image
          width={512}
          height={512}
          src="/images/logos/can-logo.png"
          alt=""
          className="absolute blur-2xl opacity-50"
        />
        <Image
          width={512}
          height={512}
          src="/images/logos/can-logo.png"
          alt=""
          className="absolute"
        />
      </div>
    </section>
  );
};

export default Banner;
