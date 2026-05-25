// CoinsField.tsx
import { Dispatch, SetStateAction, useState } from "react";
import { AnalysisPost } from "@src/domains/analysis/types";
import { Admin } from "@src/domains/admin/types";

export const CoinsField = ({
  post,
  setPost,
  modified,
  setModified,
  error = "",
}: {
  post: Admin<AnalysisPost>;
  setPost: Dispatch<SetStateAction<Admin<AnalysisPost>>>;
  modified: boolean;
  setModified: Dispatch<SetStateAction<boolean>>;
  error?: string;
}) => {
  const [coinInput, setCoinInput] = useState("");

  if (!post) return null;

  const addCoin = () => {
    const rawCoins = coinInput.trim();
    if (!rawCoins) return;

    const newCoins = rawCoins
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c && !post.meta.coins.includes(c));

    if (newCoins.length === 0) return;

    if (!modified) setModified(true);
    setPost({
      ...post,
      meta: {
        ...post.meta,
        coins: [...post.meta.coins, ...newCoins],
      },
    } as typeof post);
    setCoinInput("");
  };

  const removeCoin = (coinToRemove: string) => {
    if (!modified) setModified(true);
    setPost({
      ...post,
      meta: {
        ...post.meta,
        coins: post.meta.coins.filter((coin) => coin !== coinToRemove),
      },
    } as typeof post);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="coins" className="mb-2 text-sm text-text-muted">
        Coins
      </label>
      {error && <p className="mb-2 text-sm text-error">{error}</p>}
      <div className="flex gap-2 mb-2 flex-wrap">
        <input
          id="coins"
          name="coins"
          type="text"
          value={coinInput}
          onChange={(e) => setCoinInput(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && (e.preventDefault(), addCoin())
          }
          placeholder="BTC, ETH, SOL"
          className={`flex-1 p-3 rounded-lg border ${error ? "border-error" : "border-border"} bg-background text-text-main focus:outline-none focus:border-primary transition-all`}
        />
        <button
          type="button"
          onClick={addCoin}
          className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {post.meta.coins.map((coin) => (
          <span
            key={coin}
            className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2"
          >
            {coin}
            <button
              type="button"
              onClick={() => removeCoin(coin)}
              className="hover:text-error transition-colors"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};