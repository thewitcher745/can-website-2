import { TokenCardData } from "./HighPotentialContainer";

const TokenCard = ({ token }: { token: TokenCardData }) => {
  return (
    <div className="w-40 h-full overflow-hidden rounded-xl shadow-xl border flex flex-col justify-center items-center border-text-muted">
      <div className={`w-full h-5 mb-2 bg-${token.category}`} />
      <div className="p-2 flex flex-col items-center">
        <div className="w-15 h-15 rounded-full aspect-square overflow-hidden">
          <img
            src={token.logo}
            alt={token.name}
            className="size-full object-cover"
          />
        </div>
        <h2 className="text-text-main">{token.name}</h2>
        <p className="text-text-muted">{token.symbol.toUpperCase()}</p>
      </div>
    </div>
  );
};

export default TokenCard;
