import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";

import { getCoinLogoLink } from "@src/utils";

const Logo = ({
  symbol,
  fixedLogoUrl,
  padding = "1",
  size = "8",
  className = "",
}: {
  symbol: string;
  fixedLogoUrl?: string;
  padding?: string;
  size?: string | number;
  className?: string;
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
      className={`w-${size} h-${size} min-w-${size} min-h-${size} max-w-${size} max-h-${size} aspect-square rounded-full overflow-hidden bg-text-main p-${padding} ${className}`}
    >
      <div
        className={`size-full aspect-square rounded-full overflow-hidden bg-text-main`}
      >
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={`${symbol.toUpperCase()}USDT logo`}
            width={size === "full" ? undefined : (size as number) * 4}
            height={size === "full" ? undefined : (size as number) * 4}
            fill={size === "full"}
            className={`size-full aspect-square object-center`}
          />
        ) : (
          <Image
            src="/images/logos/default.png"
            alt={`${symbol} logo`}
            width={size === "full" ? undefined : (size as number) * 4}
            height={size === "full" ? undefined : (size as number) * 4}
            fill={size === "full"}
            className="size-full object-center"
          />
        )}
      </div>
    </div>
  );
};

export default Logo;
