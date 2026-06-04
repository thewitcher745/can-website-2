import Link from "next/link";
import Image from "next/image";

import { formatRelativeTime } from "@src/utils";
import { ListedArticle } from "@src/domains/articles/types";

interface TableRowProps {
  item?: ListedArticle;
  tableSlug?: string;
  placeholder?: boolean;
  i: number;
}

const TableRow = ({
  item,
  tableSlug = "news",
  placeholder = false,
  i,
}: TableRowProps) => {
  const isPlaceholder = !item || placeholder;

  return (
    <div
      key={i}
      className="flex items-center h-1/4 border-b border-border hover:bg-surface transition-all duration-200"
    >
      {!isPlaceholder ? (
        <div className="py-2 w-full">
          <Link href={`/${tableSlug}/${item.slug}`}>
            <div className="flex h-full items-center gap-2 px-1 w-full">
              <div className="h-14 min-w-20 max-w-20">
                <Image
                  width={80}
                  height={56}
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
                  {item.meta.publishedAt
                    ? formatRelativeTime(item.meta.publishedAt, "short")
                    : ""}
                </span>
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <div className="py-2 w-full">
          <div className="flex h-full items-center gap-2 px-1 w-full">
            <div className="h-14 min-w-20 max-w-20">
              <div className="rounded object-cover flex-grow h-14 w-20 bg-surface" />
            </div>

            <div className="w-5/6 flex flex-col items-start gap-1">
              <h3 className="block truncate max-w-full text-sm"></h3>
              <span className="py-1 w-1/4 text-left text-text-muted text-xs"></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableRow;
