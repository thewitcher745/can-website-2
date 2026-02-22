import Script from "next/script";

import "../styles/globals.css";
import "../styles/loader.css";
import "../styles/articles.css";
import "../styles/results.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import Navbar from "@shared/ui/navbar/Navbar";
import { useTwitterPageView } from "@src/shared/useTwitterPageView";
import { AuthProvider } from "@src/features/admin/context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  useTwitterPageView();

  return (
    <AuthProvider>
      {/* X Pixel */}
      <Script id="twitter-pixel" strategy="afterInteractive">
        {`
          !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script'); 
twq('config','ou3hs');
        `}
      </Script>

      {/* GTag Script */}
      <Script id="gtag-config" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NZJH59BG');
        `}
      </Script>

      {/* Favicon */}
      <Head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="any" />
      </Head>

      {/* GTag Noscript */}
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
    </AuthProvider>
  );
}

export default MyApp;
