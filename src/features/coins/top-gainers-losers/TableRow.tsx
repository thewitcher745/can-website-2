import Logo from "@shared/ui/Logo";
import { reduceNumber } from "@src/utils";
import Caret from "@src/shared/ui/Caret";

export const TableRowPlaceholder = ({ pulse = true }: { pulse?: boolean }) => {
  return (
    <tr className="border-b border-border w-full h-20">
      <td className="px-6 py-4 w-1/4">
        <div
          className={`h-5 bg-gray-700 rounded w-full ${
            pulse ? "animate-pulse" : ""
          }`}
        ></div>
      </td>
      <td className="px-6 py-2 w-1/4">
        <div
          className={`h-5 bg-gray-700 rounded w-full ${
            pulse ? "animate-pulse" : ""
          }`}
        ></div>
      </td>
      <td className="px-6 py-4 w-1/4">
        <div
          className={`h-5 bg-gray-700 rounded w-full ${
            pulse ? "animate-pulse" : ""
          }`}
        ></div>
      </td>
      <td className="px-6 py-4 w-1/4">
        <div
          className={`h-5 bg-gray-700 rounded w-full ${
            pulse ? "animate-pulse" : ""
          }`}
        ></div>
      </td>
    </tr>
  );
};

const TableRow = ({
  key,
  coin,
  isScrolled,
}: {
  key: number;
  coin: any;
  isScrolled: boolean;
}) => {
  return (
    <tr key={key} className="border-b border-border h-20">
      <td
        className={`sticky bg-background left-0 w-150 pl-4 py-4 ${
          isScrolled ? "sticky-shadow-visible" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <Logo symbol={coin.symbol} padding="1" size="10" />
          </div>
          <div className="block lg:hidden">
            <Logo symbol={coin.symbol} padding="1" size="8" />
          </div>

          <div className="flex flex-col truncate">
            <span className="truncate font-semibold text-sm">{coin.name}</span>
            <span className="text-xs font-medium text-text-muted">
              {coin.symbol}USDT
            </span>
          </div>
        </div>
      </td>
      <td className="px-2 py-2">${coin.price}</td>
      <td className="px-2 py-4 h-full flex-col gap-2 text-success font-bold">
        <div className="flex items-center gap-1">
          <Caret change={coin.change} />
          <span
            className={`${coin.change > 0 ? "text-success" : "text-error"}`}
          >
            {coin.change}%
          </span>
        </div>
      </td>
      <td className="px-2 py-4">{reduceNumber(coin.volume)}</td>
    </tr>
  );
};

export default TableRow;
