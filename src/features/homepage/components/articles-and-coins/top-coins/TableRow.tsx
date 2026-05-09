import Caret from "@src/shared/ui/Caret";
import Logo from "@src/shared/ui/Logo";
import { WidgetTopCoin } from "@src/domains/coins/types";
import CoinLink from "@src/shared/ui/CoinLink";
import { formatPrice } from "@src/lib/utils";

interface TableRowProps {
  coin?: WidgetTopCoin;
  placeholder?: boolean;
  i: number;
}

const TableRow = ({ coin, placeholder = false, i }: TableRowProps) => {
  const isPlaceholder = !coin || placeholder;

  return (
    <tr key={i} className="border-b border-border h-1/5">
      {!isPlaceholder ? (
        <>
          <td className="px-2 py-2 w-1/2">
            <CoinLink symbol={coin.symbol}>
              <div className="flex items-center gap-3">
                <Logo symbol={coin.symbol} />
                <div className="flex flex-col truncate">
                  <h3 className="truncate font-semibold text-sm">
                    {coin.name}
                  </h3>
                  <h4 className="text-xs font-medium text-text-muted">
                    {coin.symbol}USDT
                  </h4>
                </div>
              </div>
            </CoinLink>
          </td>
          <td className="opacity-80 text-md font-light px-4 py-2 w-1/4">
            ${formatPrice(coin.price)}
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
          <td className="px-2 py-2 w-1/2">
            <div className="flex items-center gap-3">
              <Logo symbol="" />
              <div className="flex flex-col truncate">
                <h3 className="truncate font-semibold text-sm"></h3>
                <h4 className="text-xs font-medium text-text-muted"></h4>
              </div>
            </div>
          </td>
          <td className="opacity-80 text-md font-light px-4 py-2 w-1/4"></td>
          <td className={"px-4 py-2 font-bold w-1/4"}>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-nowrap"></span>
            </div>
          </td>
        </>
      )}
    </tr>
  );
};

export default TableRow;
