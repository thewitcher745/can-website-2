import Head from "next/head";

import Navbar from "../shared/ui/navbar/Navbar";
import Footer from "../shared/ui/Footer";
import Staging from "./index/Contents";

export default function Home() {
  return (
    <>
      <Head>
        <title>CAN Trading - Home</title>
      </Head>
      <Navbar />
      <Staging />
      <Footer />
    </>
  );
}
