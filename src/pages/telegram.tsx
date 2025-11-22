import Head from "next/head";

import Footer from "@src/shared/ui/Footer";
import { GenericLoader } from "@src/shared/ui/loaders";
import { useEffect } from "react";

const TelegramRedirect: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/telegram";
    }, 2000); // delay in ms
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Redirecting... - CAN Trading</title>
      </Head>
      <main className="results-page min-h-screen bg-background pb-12">
        <div className="max-w-7xl mx-auto px-4 pt-24 flex justify-center">
          <div className="p-10 rounded-xl flex flex-col items-center gap-8">
            <GenericLoader />
            <div className="flex flex-col gap-4 items-center">
              <span className="text-text-main text-2xl font-semibold text-center">
                You are being redirected to our Telegram channel...
              </span>
              <span className="text-text-main">Please wait...</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   return {
//     redirect: {
//       destination: "/telegram",
//       permanent: false,
//     },
//   };
// };

export default TelegramRedirect;
