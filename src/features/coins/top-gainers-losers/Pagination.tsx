import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { GainerLoser } from "@src/types";

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
  indexOfFirstItem,
  indexOfLastItem,
  allData,
}: {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  indexOfFirstItem: number;
  indexOfLastItem: number;
  allData: GainerLoser[];
}) => {
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev: number) => prev + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev: number) => prev - 1);
  };
  const firstPage = () => setCurrentPage(1);
  const lastPage = () => setCurrentPage(totalPages);

  return (
    totalPages > 1 && (
      <div className="flex justify-between items-center mt-4 px-4 flex-col sm:flex-row">
        <div className="text-sm text-text-main my-4">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, allData.length)} of {allData.length}{" "}
          entries
        </div>
        <div className="flex items-center justify-center sm:justify-end flex-wrap gap-2">
          <button
            onClick={firstPage}
            disabled={currentPage === 1}
            className="p-2 rounded-md border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-hover"
            aria-label="First page"
          >
            <ChevronsLeft className="h-4 w-4 text-text-main" />
          </button>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="p-2 rounded-md border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-hover"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4 text-text-main" />
          </button>
          {/* Page numbers */}
          <div className="flex gap-1">
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => paginate(pageNum)}
                  className={`w-8 h-8 rounded-md flex items-center text-text-main justify-center ${
                    currentPage === pageNum
                      ? "bg-primary text-white"
                      : "border border-border hover:bg-surface-hover"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="px-2 text-text-main flex items-center">...</span>
            )}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <button
                onClick={() => paginate(totalPages)}
                className={`w-8 h-8 rounded-md text-text-main flex items-center justify-center ${
                  currentPage === totalPages
                    ? "bg-primary text-white"
                    : "border border-border hover:bg-surface-hover"
                }`}
              >
                {totalPages}
              </button>
            )}
          </div>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-hover"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4 text-text-main" />
          </button>
          <button
            onClick={lastPage}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-hover"
            aria-label="Last page"
          >
            <ChevronsRight className="h-4 w-4 text-text-main" />
          </button>
        </div>
      </div>
    )
  );
};

export default Pagination;
