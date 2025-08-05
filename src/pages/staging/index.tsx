import Head from 'next/head'

import Navbar from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
import Footer from "../../components/Footer";
import FearAndGreed from '../../components/technicals/FearAndGreed';

export default function Home() {
  return (
    <>
      <Head>
        <title>CAN Trading - Home</title>
      </Head>
      <Navbar />
      <main>
        <HeroSection />
        <FearAndGreed />
      </main>
      <Footer />
    </>
  );
}
