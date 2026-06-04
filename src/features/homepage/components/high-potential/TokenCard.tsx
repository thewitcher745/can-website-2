import { ListedHighPotential } from "@src/domains/high-potential/types";

const TokenCard = ({ token }: { token: ListedHighPotential }) => {
  return (
    <div className="relative w-40 pt-8 overflow-hidden rounded-xl shadow-xl border flex flex-col justify-center items-center border-text-muted card-hover">
      <div
        className={`absolute top-0 w-full h-5 mb-2 ${
          token.meta.category === "gold"
            ? "bg-gold"
            : token.meta.category === "silver"
              ? "bg-silver"
              : "bg-bronze"
        }`}
      />
      <div className="p-2 flex flex-col items-center">
        <div className="w-15 h-15 rounded-full aspect-square overflow-hidden">
          <img
            src={token.meta.logo}
            alt={token.meta.title}
            className="size-full object-cover"
          />
        </div>
        <h2 className="text-text-main">{token.meta.title}</h2>
        <p className="text-text-muted">{token.meta.symbol.toUpperCase()}</p>
      </div>
    </div>
  );
};

export default TokenCard;
