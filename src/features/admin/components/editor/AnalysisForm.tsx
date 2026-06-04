import { SetStateAction } from "react";
import dynamic from "next/dynamic";

import { Admin } from "@src/domains/admin/types";
import { AnalysisPost } from "@src/domains/analysis/types";
import ImageUpload from "../ImageUpload";
import { CoinsField } from "./fields/CoinsField";
import { EditorJsBlock, EditorJSBody } from "@src/shared/types/posts";

// Editor.js must be loaded on the client side only
const EditorJSContainer = dynamic(() => import("./EditorJSContainer"), {
  ssr: false,
});

const AnalysisForm = ({
  post,
  modifyPost,
  invalidFields,
}: {
  post: Admin<AnalysisPost>;
  modifyPost: (callback: SetStateAction<Admin<AnalysisPost>>) => void;
  invalidFields: Record<string, string>;
}) => {
  if (!post) return;

  const updates = post.content.updates;

  const handleAddUpdate = () => {
    const newUpdate = {
      time: new Date().toISOString(),
      version: "2.31.3",
      blocks: [],
    } as EditorJSBody;

    modifyPost((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        content: {
          ...prev.content,
          updates: [...(prev.content.updates || []), newUpdate],
        },
      };
    });
  };

  const handleUpdateBodyChange = (index: number, data: EditorJSBody) => {
    modifyPost((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        content: {
          ...prev.content,
          updates: prev.content.updates.map((u, i) =>
            i === index
              ? {
                  time: u.time,
                  version: data.version || u.version,
                  blocks: data.blocks,
                }
              : u,
          ),
        },
      };
    });
  };

  const handleUpdateTimeChange = (index: number, time: string) => {
    modifyPost((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        content: {
          ...prev.content,
          updates: prev.content.updates.map((u, i) =>
            i === index ? { ...u, time } : u,
          ),
        },
      };
    });
  };

  const handleRemoveUpdate = (index: number) => {
    modifyPost((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        content: {
          ...prev.content,
          updates: prev.content.updates.filter((_, i) => i !== index),
        },
      };
    });
  };

  return (
    <>
      {/* Dynamic Fields Based on Article Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-border">
        <ImageUpload
          label="Main Image"
          value={post.meta.image}
          onChange={(url) => {
            modifyPost((prev) => ({
              ...prev,
              meta: { ...prev.meta, image: url },
            }));
          }}
          helperText="High quality analysis chart/image"
          error={invalidFields["meta.image"] || ""}
        />
        <CoinsField
          post={post}
          modifyPost={modifyPost}
          error={invalidFields["meta.coins"] || ""}
        />
        <div className="flex items-center gap-2 mt-6">
          <input
            id="isVip"
            name="isVip"
            type="checkbox"
            checked={post.meta.isVip || false}
            onChange={(e) => {
              modifyPost((prev) => {
                if (!prev) return prev;
                return {
                  ...prev,
                  meta: { ...prev.meta, isVip: e.target.checked },
                };
              });
            }}
            className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-primary cursor-pointer"
          />
          <label
            htmlFor="isVip"
            className="text-sm text-text-main cursor-pointer"
          >
            VIP Analysis
          </label>
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

      {/* Updates Section - Only for Analysis Posts */}
      <div className="my-6">
        <h2 className="text-2xl font-bold text-text-main">
          Updates {updates.length > 0 && `(${updates.length})`}
        </h2>
      </div>
      <div className="mb-8">
        {updates.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
            <p className="text-text-muted mb-4">
              No updates yet. Add an update to keep your analysis current.
            </p>
          </div>
        )}

        {updates.map((update, index) => (
          <div
            key={index}
            className="mb-6 p-6 border border-border rounded-lg bg-background/50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-main">
                Update #{index + 1}
              </h3>
              <button
                onClick={() => handleRemoveUpdate(index)}
                className="px-3 py-1 rounded text-sm bg-error/10 text-error hover:bg-error/20 transition-colors"
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col">
                <label
                  htmlFor="updatePublishTime"
                  className="mb-2 text-sm text-text-muted"
                >
                  Update time
                </label>
                <input
                  id={`updatePublishedAt-${index}`}
                  name="updatePublishTime"
                  type="datetime-local"
                  value={update.time ? update.time.slice(0, 16) : ""}
                  onChange={(e) =>
                    handleUpdateTimeChange(index, e.target.value)
                  }
                  className="p-3 rounded-lg border border-border bg-background text-text-main focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <div className="bg-white text-black p-6 rounded-lg min-h-[300px] overflow-hidden shadow-inner ring-1 ring-border">
              <EditorJSContainer
                key={`update-editor-${index}`}
                holder={`update-editor-${index}`}
                onChange={(data) =>
                  handleUpdateBodyChange(index, {
                    // Don't change the time
                    ...update,
                    blocks: data.blocks as EditorJsBlock[],
                  })
                }
                data={{
                  ...update,
                  time: new Date(update.time).getTime(),
                }}
                error={invalidFields["content.updates"] || ""}
              />
            </div>
          </div>
        ))}

        {/* Add update button */}
        <div className="flex items-center justify-between my-4">
          <button
            onClick={handleAddUpdate}
            className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 transition-colors font-medium"
          >
            + Add Update
          </button>
        </div>
      </div>
    </>
  );
};

export default AnalysisForm;
