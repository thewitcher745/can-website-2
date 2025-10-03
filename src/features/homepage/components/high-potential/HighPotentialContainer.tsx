import { useEffect, useState } from "react";
import Link from "next/link";

import { buildApiUrl } from "@src/config";
import TokenCard from "./TokenCard";
import { HighPotentialTokenMeta } from "@src/types";

const HighPotentialContainer = ({ number = 10 }: { number?: number }) => {
  const [tokens, setTokens] = useState<HighPotentialTokenMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(buildApiUrl(`/api/high_potential_tokens?n=${number}`))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch high potential tokens.");
        return res.json();
      })
      .then(setTokens)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full flex gap-2 rounded-xl mt-8 p-4 overflow-x-scroll lg:overflow-hidden">
      {tokens.map((token) => (
        <Link key={token.slug} href={`/high-potential/${token.slug}`}>
          <TokenCard token={token} />
        </Link>
      ))}
    </div>
  );
};

export default HighPotentialContainer;
