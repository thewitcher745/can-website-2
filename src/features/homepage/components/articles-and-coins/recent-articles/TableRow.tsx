import Link from "next/link";

import { ListedArticle } from "@src/types";
import { formatRelativeTime } from "@src/utils";

const TableRow = ({
  item,
  tableSlug = "news",
}: {
  item: ListedArticle;
  tableSlug: string;
}) => {
  return (
    <div
      key={tableSlug}
      className="flex items-center h-1/4 border-b border-border hover:bg-surface transition-all duration-200"
    >
      {item ? (
        <div className="py-2 w-full">
          <Link href={`/${tableSlug}/${item.slug}`}>
            <div className="flex h-full items-center gap-2 px-1 w-full">
              <div className="h-14 min-w-20 max-w-20">
                <img
                  src={
                    item.meta.thumbnail
                      ? item.meta.thumbnail
                      : `http://static.photos/finance/320x240/${item.slug}`
                  }
                  className="rounded object-cover flex-grow h-14 w-20"
                  alt={item.meta.title}
                />
              </div>

              <div className="w-5/6 flex flex-col items-start gap-1">
                <h3
                  className="block truncate max-w-full text-sm"
                  title={item.meta.title}
                >
                  {item.meta.title}
                </h3>
                <span className="py-1 w-1/4 text-left text-text-muted text-xs">
                  {formatRelativeTime(item.meta.time, "short")}
                </span>
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <>
          <td className="px-4 py-2 w-3/4">&nbsp;</td>
          <td className="px-4 py-2 w-1/4">&nbsp;</td>
        </>
      )}
    </div>
  );
};

export default TableRow;
