import "../styles/globals.css";
import "../styles/loader.css";
import "../styles/articles.css";
import "../styles/results.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import Navbar from "@shared/ui/navbar/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="any" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17663344120"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17663344120');
            `,
          }}
        />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
