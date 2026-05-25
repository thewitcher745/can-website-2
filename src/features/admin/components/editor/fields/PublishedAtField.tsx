// PublishedAtField.tsx
import { Dispatch, SetStateAction } from "react";
import { EditorPost } from "@src/domains/admin/types";

export const PublishedAtField = ({
  post,
  setPost,
  modified,
  setModified,
  error = "",
}: {
  post: EditorPost;
  setPost: Dispatch<SetStateAction<EditorPost>>;
  modified: boolean;
  setModified: Dispatch<SetStateAction<boolean>>;
  error?: string;
}) => {
  if (!post) return null;

  const formatDateForInput = (isoString: string | null) => {
    if (!isoString) return "";
    return isoString.slice(0, 16);
  };

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
        value={formatDateForInput(post.meta.publishedAt)}
        onChange={(e) => {
          if (!modified) setModified(true);
          setPost({
            ...post,
            meta: {
              ...post.meta,
              publishedAt: e.target.value
                ? new Date(e.target.value).toISOString()
                : null,
            },
          } as typeof post);
        }}
        className={`p-3 rounded-lg border ${error ? "border-error" : "border-border"} bg-background text-text-main focus:outline-none focus:border-primary`}
      />
    </div>
  );
};