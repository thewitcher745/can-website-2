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
        <link rel="icon" href="/favicon.png" type="image/png" sizes="any" />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-V82MPDY0KP"
        strategy="afterInteractive"
      />
      <Script id="gtag-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-V82MPDY0KP');
        `}
      </Script>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
