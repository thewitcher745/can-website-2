// PublishedAtField.tsx
import { Dispatch, SetStateAction } from "react";
import { EditorPost } from "@src/domains/admin/types";

export const PublishedAtField = ({
  post,
  modifyPost,
  error = "",
}: {
  post: EditorPost;
  modifyPost: (callback: SetStateAction<EditorPost>) => void;
  error?: string;
}) => {
  if (!post) return null;

  return (
    <div className="flex flex-col">
      <label htmlFor="publishedAt" className="mb-2 text-sm text-text-muted">
        Publish time
      </label>
      {error && <p className="mb-2 text-sm text-error">{error}</p>}
      <input
        id="publishedAt"
        name="publishedAt"
        type="datetime-local"
        value={post.meta.publishedAt ? post.meta.publishedAt.slice(0, 16) : ""}
        onChange={(e) => {
          modifyPost((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              meta: {
                ...prev.meta,
                publishedAt: e.target.value
                  ? new Date(e.target.value).toISOString()
                  : null,
              },
            } as typeof prev;
          });
        }}
        className={`p-3 rounded-lg border ${error ? "border-error" : "border-border"} bg-background text-text-main focus:outline-none focus:border-primary`}
      />
    </div>
  );
};
