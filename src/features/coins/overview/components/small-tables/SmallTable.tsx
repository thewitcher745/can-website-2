import React from "react";
import { PiEmpty } from "react-icons/pi";

import { TopCoin } from "@src/types";
import TableRow from "./TableRow";
import { TableRowPlaceholder } from "./TableRow";
import { GenericLoader } from "@src/shared/ui/loaders";

const SmallTable = ({
  coins,
  dataLoading,
}: {
  coins?: TopCoin[] | null;
  dataLoading?: boolean;
}) => {
  const TablePlaceholder = ({ pulse = true }: { pulse?: boolean }) => {
    return (
      <>
        <TableRowPlaceholder pulse={pulse} />
        <TableRowPlaceholder pulse={pulse} />
        <TableRowPlaceholder pulse={pulse} />
        <TableRowPlaceholder pulse={pulse} />
        <TableRowPlaceholder pulse={pulse} />
      </>
    );
  };

  const NoDataPlaceholder = () => {
    return (
      <div className="relative size-full min-h-65">
        <table className="size-full blur-sm">
          <tbody>
            <TablePlaceholder pulse={false} />
          </tbody>
        </table>
        <div className="absolute size-full rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-2 flex-nowrap">
          <PiEmpty className="text-text-muted text-2xl text-center" />
          <h2 className="text-text-muted text-xl text-center font-semibold">
            No market data available!
          </h2>
        </div>
      </div>
    );
  };

  const LoadingPlaceholder = () => {
    return (
      <div className="relative size-full min-h-65">
        <table className="size-full blur-sm">
          <tbody>
            <TablePlaceholder />
          </tbody>
        </table>
        <div className="absolute size-full rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-2 flex-nowrap">
          <GenericLoader />
        </div>
      </div>
    );
  };

  if (dataLoading) {
    return <LoadingPlaceholder />;
  }

  if (coins?.length === 0) {
    return <NoDataPlaceholder />;
  }

  return (
    <table className="size-full">
      <tbody>
        {coins?.map((coin) => {
          return <TableRow coin={coin} />;
        })}
      </tbody>
    </table>
  );
};

export default SmallTable;
