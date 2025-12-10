import Script from "next/script";

import "../styles/globals.css";
import "../styles/loader.css";
import "../styles/articles.css";
import "../styles/results.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import Navbar from "@shared/ui/navbar/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <Script id="gtag-config" strategy="afterInteractive">
          {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NZJH59BG');
        `}
        </Script>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="any" />
      </Head>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-NZJH59BG"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
