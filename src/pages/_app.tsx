import "../styles/globals.css";
import "../styles/loader.css";
import "../styles/articles.css";
import "../styles/results.css";
import "../styles/editor.css";

import type { AppProps } from "next/app";
import Navbar from "@shared/ui/navbar/Navbar";
import { useTwitterPageView } from "@src/shared/useTwitterPageView";
import { AuthProvider } from "@src/features/admin/context/AuthContext";
import Tags from "@src/shared/Tags";

function MyApp({ Component, pageProps }: AppProps) {
  useTwitterPageView();

  return (
    <AuthProvider>
      <Tags />
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
