import { useEffect, useRef, useState } from "react";
import { PiEmpty } from "react-icons/pi";

import { GainerLoser } from "@src/types";
import TableRow, { TableRowPlaceholder } from "./TableRow";
import Pagination from "./Pagination";
import { GenericLoader } from "@src/shared/ui/loaders";
import GenericError from "@src/shared/ui/GenericError";

const TableHead = ({ isScrolled }: { isScrolled: boolean }) => {
  return (
    <thead>
      <tr>
        <th
          className={`sticky bg-background left-0 px-6 py-2 text-start w-[30%] ${
            isScrolled ? "sticky-shadow-visible" : ""
          }`}
        >
          Name/Symbol
        </th>
        <th className="px-6 py-4 text-start w-[20%] min-w-sm">Price</th>
        <th className="px-6 py-4 text-start w-[20%] min-w-sm">Change</th>
        <th className="px-6 py-4 text-start w-[20%] min-w-sm">Volume</th>
      </tr>
    </thead>
  );
};

const Table = ({
  allData,
  maxRows = 10,
  loading,
  error,
}: {
  allData: GainerLoser[];
  maxRows?: number;
  loading?: boolean;
  error?: string | null;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(maxRows);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allData.length / itemsPerPage);

  useEffect(() => {
    const tableContainer = tableContainerRef.current;

    const handleScroll = () => {
      if (tableContainer) {
        setIsScrolled(tableContainer.scrollLeft > 0);
      }
    };

    if (tableContainer) {
      tableContainer.addEventListener("scroll", handleScroll);
      // Initial check in case the table is already scrolled on load
      handleScroll();
    }

    return () => {
      if (tableContainer) {
        tableContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="relative">
        <table className="text-text-main w-full min-w-lg table-fixed">
          <TableHead isScrolled={isScrolled} />
          <tbody className="w-full blur-sm">
            {[...Array(10)].map((_, i) => (
              <TableRowPlaceholder key={i} />
            ))}
          </tbody>
        </table>
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <GenericLoader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative">
        <table className="text-text-main w-full min-w-lg table-fixed">
          <TableHead isScrolled={isScrolled} />
          <tbody className="w-full blur-sm">
            {[...Array(10)].map((_, i) => (
              <TableRowPlaceholder pulse={false} key={i} />
            ))}
          </tbody>
        </table>
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <GenericError message={error} />
        </div>
      </div>
    );
  }

  if (allData?.length === 0) {
    return (
      <div className="relative">
        <table className="text-text-main w-full min-w-lg table-fixed">
          <TableHead isScrolled={isScrolled} />
          <tbody className="w-full blur-sm">
            {[...Array(10)].map((_, i) => (
              <TableRowPlaceholder pulse={false} key={i} />
            ))}
          </tbody>
        </table>
        <div className="absolute size-full rounded-xl top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-2 flex-nowrap">
          <PiEmpty className="text-text-muted text-2xl text-center" />
          <h2 className="text-text-muted text-2xl text-center font-semibold">
            No market data available!
          </h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <div ref={tableContainerRef} className="overflow-x-auto relative">
        <table className="text-text-main w-full min-w-lg table-fixed">
          <TableHead isScrolled={isScrolled} />
          <tbody>
            {currentItems.map((coin, index) => (
              <TableRow key={index} coin={coin} isScrolled={isScrolled} />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        indexOfFirstItem={indexOfFirstItem}
        indexOfLastItem={indexOfLastItem}
        allData={allData}
      />
    </>
  );
};

export default Table;
