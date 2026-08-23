import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaTelegram } from "react-icons/fa";
import { FaMapLocationDot, FaXTwitter } from "react-icons/fa6";

const dotsStyle = {
  backgroundImage:
    "radial-gradient(circle, rgba(255,203,55,0.88) 2px, transparent 2px)",
  backgroundSize: "20px 20px",
};

const CTAButton = ({
  href,
  icon,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
}) => {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <div className="text-offwhite text-wrap font-semibold flex items-center gap-2 lg:flex bg-border/60 p-3 w-full sm:w-54 h-12 rounded-lg justify-center hover:bg-border transition duration-200">
        {icon}
        <span className="text-offwhite">{text}</span>
      </div>
    </Link>
  );
};

const Banner = () => {
  return (
    <section className="xl:max-w-5xl max-w-4xl w-full flex justify-center">
      <div className="relative flex flex-col sm:flex-row sm:justify-end h-300 w-full sm:h-120 rounded-lg border border-border overflow-hidden">
        {/* Top left dots */}
        <div
          className="pointer-events-none absolute h-40 w-60 opacity-75"
          style={dotsStyle}
        />
        {/* Bottom right dots */}
        <div
          className="pointer-events-none hidden sm:block right-0 bottom-0 absolute h-40 w-60 opacity-75"
          style={dotsStyle}
        />
        {/* Dots fader */}
        <div
          className="pointer-events-none absolute w-full h-full bg-[linear-gradient(to_right,transparent_0%,var(--color-background),var(--color-background)_100%)]
        sm:bg-[linear-gradient(to_right,transparent_0%,var(--color-background)_20%,var(--color-background)_80%,transparent_100%)]"
        />
        {/* Gold gradients */}
        <div className="pointer-events-none absolute w-full h-full bg-[linear-gradient(225deg,color-mix(in_srgb,var(--color-primary)_20%,transparent)_0%,transparent_40%,transparent_100%)]" />{" "}
        <div className="pointer-events-none absolute w-full h-full bg-[linear-gradient(45deg,color-mix(in_srgb,var(--color-primary)_20%,transparent)_0%,transparent_40%,transparent_100%)]" />{" "}
        {/* Mobile bottom part with gradient */}
        <div className="absolute block sm:hidden z-51 bottom-0 bg-[linear-gradient(to_bottom,transparent_0%,var(--color-background)_50%,var(--color-background)_100%)] w-full h-180"></div>
        {/* Graphical section */}
        <div className="absolute w-full h-full sm:w-[35%]">
          {/* Yellow circle */}
          <div
            className="translate-y-[35%] -translate-x-150 
            sm:-translate-x-[20%] sm:translate-y-[55%] 
            md:-translate-x-[25%] md:translate-y-[30%] 
          relative left-[50%] sm:left-0 flex-1
          w-300 h-300 md:w-125 md:h-125 sm:w-75 sm:h-75 
          bg-primary rounded-full"
          />
          {/* Phone screen */}
          <Image
            alt="phone"
            src="/images/banner-phone.png"
            className="absolute z-50 top-85 left-1/2 -translate-x-1/2 w-70
            sm:left-5 sm:top-15 sm:w-40 sm:left-auto sm:translate-x-0
            md:top-10 md:left-15 md:w-50
            drop-shadow-xl/75  shadow-background"
            width={400}
            height={700}
          />
        </div>
        {/* Text section */}
        <div className="relative sm:w-120 z-51 flex flex-1 flex-col justify-between px-5 py-8">
          <div className="max-w-[30rem]">
            <h2 className="text-[2rem] leading-[1.08] font-bold tracking-[-0.03em] text-white md:text-[2.8rem]">
              Get Full Access to
              <br />
              All Our Content for <span className="text-primary">Free!</span>
            </h2>
            <div className="relative mt-4 h-1 w-[15rem] rounded-full bg-primary/95">
              <div className="absolute top-1/2 right-0 h-4 w-4 -translate-y-1/2 rounded-full bg-primary" />
            </div>
            <p className="mt-4 max-w-[24rem] text-sm leading-6 text-text-secondary md:text-base md:leading-7">
              Make the most out of market movements using our insights. Get the
              latest news and analysis, learn risk management and crypto trading
              for free!
            </p>
          </div>

          <div className="w-full mt-2 flex flex-col items-start gap-3 text-sm text-text-secondary">
            <div className="w-full mt-6 flex flex-col gap-3 md:mt-8 md:flex-row md:flex-wrap">
              <CTAButton
                href="/telegram"
                icon={<FaTelegram className="text-base" />}
                text="Join Our Telegram"
              />
              <CTAButton
                href="https://x.com/COINEO963"
                icon={<FaXTwitter className="text-base" />}
                text="Follow Us on X / Twitter"
              />
              <CTAButton
                href="https://www.instagram.com/CryptoANalysis_CAN"
                icon={<FaInstagram className="text-base" />}
                text="Follow Us on Instagram"
              />
            </div>
            <div className="flex flex-row gap-2 items-center">
              <FaMapLocationDot className="mt-0.5 shrink-0 text-lg text-primary" />
              <p className="max-w-[20rem] leading-6">
                You can find our other outlets at the bottom of the website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
