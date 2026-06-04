import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { useEffect } from "react";

import Footer from "@src/shared/ui/Footer";
import { GenericLoader } from "@src/shared/ui/loaders";

// GTag tracking setup
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params: Record<string, any>,
    ) => void;
  }
}

const TelegramRedirect: React.FC = () => {
  useEffect(() => {
    // Fire conversion event when component mounts
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-17953959733/8ya1COyMnqwcELXejvFC",
        value: 1.0,
        currency: "EUR",
      });
    }

    const timer = setTimeout(() => {
      window.location.href = "https://t.me/+2znhsiCGpI81MzQ0";
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17953959733');
        `}
      </Script>
      <Head>
        <title>Redirecting... - CAN Trading</title>
      </Head>
      <main className="results-page min-h-screen bg-background pb-12">
        <div className="max-w-7xl mx-auto px-4 pt-24 flex justify-center">
          <div
            id="redirect-loader"
            className="p-10 rounded-xl flex flex-col items-center gap-8"
          >
            <GenericLoader />
            <div className="flex flex-col gap-4 items-center">
              <span className="text-text-main text-2xl font-semibold text-center">
                You are being redirected to our Telegram channel...
              </span>
              <span className="text-text-main">Please wait...</span>
              <Link
                className="text-text-main text-sm underline hover:text-primary"
                href="/"
              >
                Go back to main page
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TelegramRedirect;
