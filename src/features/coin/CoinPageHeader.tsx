import { CoinMetaInfo } from "@src/types";

type CoinPageHeaderProps = {
  symbol: string;
  meta: CoinMetaInfo | null;
};

const CoinPageHeader = ({ symbol, meta }: CoinPageHeaderProps) => (
  <div className="space-y-1">
    <p className="text-sm uppercase tracking-[0.3em] text-primary-soft">
      Coin Overview
    </p>
    <h1 className="text-3xl md:text-4xl font-bold text-white">
      {meta?.name ?? symbol?.toUpperCase()}{" "}
      <span className="text-primary">({symbol?.toUpperCase()})</span>
    </h1>
  </div>
);

export default CoinPageHeader;
