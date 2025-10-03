import { longShortItem } from "@src/types";
import ListItem from "./ListItem";

const exchangeList = [
  { id: "binance", name: "Binance", logo: "/images/logos/binance.png" },
  { id: "bybit", name: "Bybit", logo: "/images/logos/bybit.png" },
  { id: "okx", name: "OKX", logo: "/images/logos/okx.png" },
  { id: "bitget", name: "Bitget", logo: "/images/logos/bitget.png" },
  { id: "kraken", name: "Kraken", logo: "/images/logos/kraken.png" },
];

const List = ({
  longShortData,
  loading,
  error,
}: {
  longShortData: longShortItem;
  loading: boolean;
  error: string | null;
}) => {
  return (
    <table className="w-full gap-2 py-4">
      <tbody>
        {!loading &&
          !error &&
          exchangeList.map((exchange) => (
            <ListItem
              exchange={exchange}
              longShortData={longShortData[exchange.id]}
            />
          ))}
      </tbody>
    </table>
  );
};

export default List;
