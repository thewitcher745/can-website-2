import Head from "next/head";

import Navbar from "../shared/ui/navbar/Navbar";
import Footer from "../shared/ui/Footer";
import Staging from "./index/Contents";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - CAN Trading</title>
        <meta name="description" content="CAN Trading - Professional cryptocurrency analysis and trading signals" />
        <meta property="og:title" content="CAN Trading" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Professional cryptocurrency analysis and trading signals" />
        <meta property="og:url" content="https://can-trading.com/" />
        <meta property="og:site_name" content="CAN Trading" />
        <meta property="og:image" content="/images/showcase/can-banner.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CAN Trading" />
        <meta name="twitter:description" content="Professional cryptocurrency analysis and trading signals" />
        <meta name="twitter:image" content="/images/showcase/can-banner.png" />
      </Head>
      <Staging />
      <Footer />
    </>
  );
}
