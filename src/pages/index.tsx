import Head from "next/head";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import Staging from "./index/Staging";

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
