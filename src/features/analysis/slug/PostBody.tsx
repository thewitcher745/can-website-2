import { ArticleBody, ArticleBlock } from "@src/types";

import Image from "next/image";

const renderBlock = (block: ArticleBlock, index: number) => {
  switch (block.type) {
    case "header": {
      const { level, text } = block.data;
      const headerClasses = "font-bold mt-6 mb-2";

      switch (level) {
        case 1:
          return (
            <h1 key={index} className={headerClasses}>
              {text}
            </h1>
          );
        case 2:
          return (
            <h2 key={index} className={headerClasses}>
              {text}
            </h2>
          );
        case 3:
          return (
            <h3 key={index} className={headerClasses}>
              {text}
            </h3>
          );
        case 4:
          return (
            <h4 key={index} className={headerClasses}>
              {text}
            </h4>
          );
        case 5:
          return (
            <h5 key={index} className={headerClasses}>
              {text}
            </h5>
          );
        case 6:
          return (
            <h6 key={index} className={headerClasses}>
              {text}
            </h6>
          );
        default:
          return (
            <h2 key={index} className={headerClasses}>
              {text}
            </h2>
          );
      }
    }

    case "paragraph":
      return (
        <p
          key={index}
          className="mb-4 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: block.data.text }}
        />
      );

    case "list": {
      const ListTag = block.data.style === "ordered" ? "ol" : "ul";
      return (
        <ListTag key={index} className="mb-4 ml-6 list-disc">
          {block.data.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item.content }} />
          ))}
        </ListTag>
      );
    }

    case "table":
      // Table with headings
      if (block.data.withHeadings) {
        return (
          <div key={index} className="overflow-x-auto my-6">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr>
                  {/* Headers */}
                  {block.data.content[0].map((header, headerIndex) => (
                    <th className="border px-3 py-4" key={headerIndex}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.data.content
                  .slice(1, block.data.content.length - 1)
                  .map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border px-3 py-2"
                          dangerouslySetInnerHTML={{ __html: cell }}
                        />
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        );
      }

      return (
        <div key={index} className="overflow-x-auto my-6">
          <table className="min-w-full border border-gray-300">
            <tbody>
              {block.data.content.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="border px-3 py-2"
                      dangerouslySetInnerHTML={{ __html: cell }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "image":
      return (
        <figure key={index} className="my-6">
          <Image
            src={block.data.file.url}
            alt={block.data.caption || ""}
            width={800}
            height={500}
            className="rounded"
          />
          {block.data.caption && (
            <figcaption className="text-sm text-gray-500 mt-2">
              {block.data.caption}
            </figcaption>
          )}
        </figure>
      );

    default:
      return null;
  }
};

const PostBody = ({ postBody }: { postBody: ArticleBody }) => {
  return (
    <article className="analysis-article prose max-w-none">
      {postBody.blocks.map(renderBlock)}
    </article>
  );
};

export default PostBody;
