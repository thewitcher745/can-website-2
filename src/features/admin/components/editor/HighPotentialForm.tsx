import { SetStateAction } from "react";
import dynamic from "next/dynamic";

import { Admin } from "@src/domains/admin/types";
import ImageUpload from "../ImageUpload";
import {
  HighPotentialCategory,
  HighPotentialPost,
} from "@src/domains/high-potential/types";
import { EditorJsBlock } from "@src/shared/types/posts";

// Editor.js must be loaded on the client side only
const EditorJSContainer = dynamic(() => import("./EditorJSContainer"), {
  ssr: false,
});

const HighPotentialForm = ({
  post,
  modifyPost,
  invalidFields,
}: {
  post: Admin<HighPotentialPost>;
  modifyPost: (callback: SetStateAction<Admin<HighPotentialPost>>) => void;
  invalidFields: Record<string, string>;
}) => {
  if (!post) return;

  return (
    <>
      {/* Dynamic Fields Based on Article Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-border">
        <div className="flex flex-col">
          <label htmlFor="symbol" className="mb-2 text-sm text-text-muted">
            Symbol
          </label>
          {invalidFields["meta.symbol"] && (
            <p className="mb-2 text-sm text-error">
              {invalidFields["meta.symbol"]}
            </p>
          )}
          <input
            id="symbol"
            name="symbol"
            type="text"
            value={post.meta.symbol}
            onChange={(e) => {
              modifyPost((prev) => {
                if (!prev) return prev;
                return {
                  ...prev,
                  meta: { ...prev.meta, symbol: e.target.value },
                };
              });
            }}
            placeholder="Enter symbol (e.g. BTC)"
            className={`p-3 rounded-lg border ${
              invalidFields["meta.symbol"] ? "border-error" : "border-border"
            } bg-background text-text-main focus:outline-none focus:border-primary transition-all placeholder:text-text-muted/50`}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="type" className="mb-2 text-sm text-text-muted">
            Category
          </label>
          <select
            value={post.meta.category}
            onChange={(e) => {
              modifyPost((prev) => {
                if (!prev) return prev;
                return {
                  ...prev,
                  meta: {
                    ...prev.meta,
                    category: e.target.value as HighPotentialCategory,
                  },
                };
              });
            }}
            className="p-3 rounded-lg border border-border bg-background text-text-main focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer"
          >
            <option value="bronze">
              <div className="w-5 h-5 bg-bronze" />
              Bronze
            </option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
          </select>
        </div>

        <div className="grid gap-6 pb-8">
          <ImageUpload
            label="Logo"
            value={post.meta.logo}
            onChange={(url) => {
              modifyPost((prev) => ({
                ...prev,
                meta: { ...prev.meta, logo: url },
              }));
            }}
            helperText="Link to the logo of the token"
            error={invalidFields["meta.logo"] || ""}
          />
        </div>
        <div className="grid gap-6 pb-8">
          <ImageUpload
            label="Image"
            value={post.meta.image}
            onChange={(url) => {
              modifyPost((prev) => ({
                ...prev,
                meta: { ...prev.meta, image: url },
              }));
            }}
            helperText="An image for te token post page"
          />
        </div>
      </div>

      {/* Main Editor */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-main mb-4">Main Content</h2>
        <div className="bg-white text-black p-8 rounded-lg min-h-[400px] overflow-hidden shadow-inner ring-1 ring-border">
          <EditorJSContainer
            holder="editorjs-container"
            onChange={(e) => {
              modifyPost((prev) => {
                if (!prev) return prev;
                return {
                  ...prev,
                  content: {
                    ...prev.content,
                    body: {
                      blocks: e.blocks as EditorJsBlock[],
                      time: e.time?.toString() || "",
                      version: e.version || "",
                    },
                  },
                };
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

export default HighPotentialForm;
