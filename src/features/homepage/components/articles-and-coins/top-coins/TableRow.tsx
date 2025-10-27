import Caret from "@src/shared/ui/Caret";
import Logo from "@src/shared/ui/Logo";
import { TopCoin } from "@src/types";

const TableRow = ({ coin }: { coin: TopCoin }) => {
  return (
    <tr key={coin.symbol} className="border-b border-border h-1/5">
      {coin ? (
        <>
          <td className="px-2 py-2 w-1/2">
            <div className="flex items-center gap-3">
              <Logo symbol={coin.symbol} />
              <div className="flex flex-col truncate">
                <span className="truncate font-semibold text-sm">
                  {coin.name}
                </span>
                <span className="text-xs font-medium text-text-muted">
                  {coin.symbol}USDT
                </span>
              </div>
            </div>
          </td>
          <td className="opacity-80 text-md font-light px-4 py-2 w-1/4">
            ${coin.price}
          </td>
          <td
            className={`px-4 py-2 font-bold w-1/4 ${
              coin.change >= 0 ? "text-success" : "text-error"
            }`}
          >
            <div className="flex items-center gap-1">
              <Caret change={coin.change} />
              <span className="text-sm font-semibold text-nowrap">
                {Math.abs(coin.change).toFixed(2)} %
              </span>
            </div>
          </td>
        </>
      ) : (
        <>
          <td className="px-4 py-2 w-1/2">&nbsp;</td>
          <td className="px-4 py-2 w-1/4">&nbsp;</td>
          <td className="px-4 py-2 w-1/4">&nbsp;</td>
        </>
      )}
    </tr>
  );
};

export default TableRow;
