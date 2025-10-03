import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";

import { getCoinLogoLink } from "@src/utils";

const Logo = ({
  symbol,
  fixedLogoUrl,
  padding = "1",
  size = "8",
}: {
  symbol: string;
  fixedLogoUrl?: string;
  padding?: string;
  size?: string;
}) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (fixedLogoUrl) {
      setLogoUrl(fixedLogoUrl);
      return;
    }
    const fetchLogo = async () => {
      const data = await getCoinLogoLink(symbol);
      if (data.length === 0) setLogoUrl("/images/logos/default.png");
      if (data) {
        setLogoUrl(data);
      }
    };

    fetchLogo();
  }, [symbol, fixedLogoUrl]);

  return (
    <div
      className={`w-${size} h-${size} aspect-square rounded-full overflow-hidden bg-text-main p-${padding}`}
    >
      <div
        className={`size-full aspect-square rounded-full overflow-hidden bg-text-main`}
      >
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={`${symbol} logo`}
            width={32}
            height={32}
            className="size-full object-center object-cover"
          />
        ) : (
          <Image
            src="/images/logos/default.png"
            alt={`${symbol} logo`}
            width={32}
            height={32}
            className="size-full object-center object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default Logo;
