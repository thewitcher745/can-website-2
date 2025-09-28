const CurrencySelector = ({
  onChange,
}: {
  onChange: (value: string) => void;
}) => {
  return (
    <select
      className="my-4 px-4 text-lg text-text-main bg-background p-2 border-primary border rounded-lg"
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="btc" className="bg-background">
        Bitcoin
      </option>
      <option value="eth" className="bg-background">
        Ethereum
      </option>
      <option value="xrp" className="bg-background">
        XRP
      </option>
      <option value="bnb" className="bg-background">
        Binance Coin
      </option>
      <option value="sol">Solana</option>
      <option value="doge">Dogecoin</option>
      <option value="trx">Tron</option>
      <option value="ada">Cardano</option>
    </select>
  );
};

export default CurrencySelector;
