import { Dispatch, SetStateAction } from "react";
import dynamic from "next/dynamic";

import { Admin } from "@src/domains/admin/types";
import ImageUpload from "../ImageUpload";
import { ArticlePost } from "@src/domains/articles/types";
import { EditorJsBlock } from "@src/shared/types/posts";

// Editor.js must be loaded on the client side only
const EditorJSContainer = dynamic(() => import("./EditorJSContainer"), {
  ssr: false,
});

const ArticleForm = ({
  post,
  setPost,
  invalidFields,
  modified,
  setModified,
}: {
  post: Admin<ArticlePost>;
  setPost: Dispatch<SetStateAction<Admin<ArticlePost>>>;
  invalidFields: Record<string, string>;
  modified: boolean;
  setModified: Dispatch<SetStateAction<boolean>>;
}) => {
  if (!post) return;

  return (
    <>
      {/* Dynamic Fields Based on Article Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-border">
        <ImageUpload
          label="Thumbnail"
          value={post.meta.thumbnail}
          onChange={(url) => {
            if (!modified) setModified(true);
            setPost({ ...post, meta: { ...post.meta, thumbnail: url } });
          }}
          helperText="Small image as thumbnail"
          error={invalidFields["meta.thumbnail"] || ""}
        />
      </div>

      {/* Main Editor */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-main mb-4">Main Content</h2>
        <div className="bg-white text-black p-8 rounded-lg min-h-[400px] overflow-hidden shadow-inner ring-1 ring-border">
          <EditorJSContainer
            holder="editorjs-container"
            onChange={(e) => {
              if (!modified) setModified(true);
              setPost({
                ...post,
                content: {
                  ...post.content,
                  body: {
                    blocks: e.blocks as EditorJsBlock[],
                    time: e.time?.toString() || "",
                    version: e.version || "",
                  },
                },
              });
            }}
            data={{
              ...post.content.body,
              time: new Date(post.content.body.time).getTime(),
            }}
            error={invalidFields["content.body"] || ""}
          />
        </div>
      </div>
    </>
  );
};

export default ArticleForm;
