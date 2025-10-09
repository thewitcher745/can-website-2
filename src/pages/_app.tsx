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
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
