import { HighPotentialArticleMeta } from "@src/types";

const TokenCard = ({ tokenMeta }: { tokenMeta: HighPotentialArticleMeta }) => {
  return (
    <div className="w-40 h-full overflow-hidden rounded-xl shadow-xl border flex flex-col justify-center items-center border-text-muted card-hover">
      <div
        className={`w-full h-5 mb-2 ${
          tokenMeta.category === "Gold"
            ? "bg-gold"
            : tokenMeta.category === "Silver"
              ? "bg-silver"
              : "bg-bronze"
        }`}
      />
      <div className="p-2 flex flex-col items-center">
        <div className="w-15 h-15 rounded-full aspect-square overflow-hidden">
          <img
            src={tokenMeta.logo}
            alt={tokenMeta.title}
            className="size-full object-cover"
          />
        </div>
        <h2 className="text-text-main">{tokenMeta.title}</h2>
        <p className="text-text-muted">{tokenMeta.symbol.toUpperCase()}</p>
      </div>
    </div>
  );
};

export default TokenCard;
