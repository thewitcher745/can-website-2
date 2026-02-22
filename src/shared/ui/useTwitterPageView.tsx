import { useRouter } from "next/router";
import { useEffect } from "react";

export function useTwitterPageView() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      if ((window as any).twq) {
        (window as any).twq("track", "PageView");
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);
}
