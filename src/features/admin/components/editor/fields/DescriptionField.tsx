import { Dispatch, SetStateAction } from "react";

import { EditorPost } from "@src/domains/admin/types";

export const DescriptionField = ({
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
      <label htmlFor="description" className="mb-2 text-sm text-text-muted">
        Description
      </label>
      <label htmlFor="description" className="mb-2 text-sm text-error">
        {error}
      </label>
      <textarea
        id="description"
        name="description"
        value={post.meta.description}
        onChange={(e) => {
          if (!modified) setModified(true);
          setPost({
            ...post,
            meta: { ...post.meta, description: e.target.value },
          } as typeof post);
        }}
        placeholder="Enter short description"
        rows={3}
        className={`p-3 rounded-lg border ${!error ? "border-border" : "border-error"} bg-background text-text-main focus:outline-none focus:border-primary transition-all placeholder:text-text-muted/50 resize-y`}
      />
    </div>
  );
};
