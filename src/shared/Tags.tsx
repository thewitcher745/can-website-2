import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";

const Tags = () => {
  // Don't render anything on admin pages. We don't want tracking on those.
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith("/admin");

  if (isAdminPage) return null;

  return (
    <>
      {/* X Pixel */}
      <Script id="twitter-pixel" strategy="afterInteractive">
        {`
          !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script'); 
twq('config','ou3hs');
        `}
      </Script>

      {/* Google Ads */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=AW-17953959733"
      />
      <Script id="google-ads" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17953959733');
        `}
      </Script>

      {/* Favicon */}
      <Head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="any" />
      </Head>
    </>
  );
};

export default Tags;
