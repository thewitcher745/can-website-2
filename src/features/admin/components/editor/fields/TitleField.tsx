// TitleField.tsx
import { Dispatch, SetStateAction } from "react";
import { EditorPost } from "@src/domains/admin/types";

export const TitleField = ({
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

  return (
    <div className="flex flex-col">
      <label htmlFor="title" className="mb-2 text-sm text-text-muted">
        Title
      </label>
      {error && <p className="mb-2 text-sm text-error">{error}</p>}
      <input
        id="title"
        name="title"
        type="text"
        value={post.meta.title}
        onChange={(e) => {
          if (!modified) setModified(true);
          setPost({
            ...post,
            meta: { ...post.meta, title: e.target.value },
          } as typeof post);
        }}
        placeholder="Enter post title"
        className={`p-3 rounded-lg border ${error ? "border-error" : "border-border"} bg-background text-text-main focus:outline-none focus:border-primary transition-all placeholder:text-text-muted/50`}
      />
    </div>
  );
};