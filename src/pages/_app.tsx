import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="any" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
