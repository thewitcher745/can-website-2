import { TopCoin } from "@src/types";
import Logo from "@shared/ui/Logo";
import { formatPrice } from "@src/utils";
import Caret from "@shared/ui/Caret";
import CoinLink from "@src/shared/ui/CoinLink";

export const TableRowPlaceholder = ({ pulse = true }: { pulse?: boolean }) => (
  <tr className="border-b border-border h-1/5">
    <td className="px-4 py-2 w-1/2">
      <div
        className={`h-5 bg-gray-700 rounded ${pulse ? "animate-pulse" : ""}`}
      ></div>
    </td>
    <td className="px-4 py-2 w-1/4">
      <div
        className={`h-5 bg-gray-700 rounded ${pulse ? "animate-pulse" : ""}`}
      ></div>
    </td>
    <td className="px-4 py-2 w-1/4">
      <div
        className={`h-5 bg-gray-700 rounded ${pulse ? "animate-pulse" : ""}`}
      ></div>
    </td>
  </tr>
);

const TableRow = ({ coin }: { coin: TopCoin }) => {
  const change = coin?.change ? coin?.change : coin.change_24h;
  return (
    <tr className={`${coin ? "border-b" : ""} border-border h-1/5`}>
      {coin ? (
        <>
          <td className="px-2 py-2 w-1/2">
            <CoinLink symbol={coin.symbol}>
              <div className="flex items-center gap-2">
                <Logo symbol={coin.symbol} padding="1" size="10" />
                <div className="flex flex-col truncate">
                  <span className="truncate text-text-main font-semibold text-sm">
                    {coin.name}
                  </span>
                  <span className="text-xs font-medium text-text-muted">
                    {coin.symbol}USDT
                  </span>
                </div>
              </div>
            </CoinLink>
          </td>
          <td className="opacity-80 text-text-main text-md font-light py-2 w-1/4">
            {formatPrice(coin.price)}
          </td>
          <td
            className={`py-2 font-bold w-1/4 ${
              change >= 0 ? "text-success" : "text-error"
            }`}
          >
            <div className="flex items-center gap-1">
              <Caret change={change} />
              <span className="text-sm font-semibold text-nowrap">
                {change.toFixed(2)} %
              </span>
            </div>
          </td>
        </>
      ) : (
        <>
          <TableRowPlaceholder />
        </>
      )}
    </tr>
  );
};

export default TableRow;
