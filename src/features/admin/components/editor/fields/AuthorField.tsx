import { SetStateAction } from "react";
import { EditorPost } from "@src/domains/admin/types";

export const AuthorField = ({
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
      <label htmlFor="author" className="mb-2 text-sm text-text-muted">
        Author
      </label>
      {error && <p className="mb-2 text-sm text-error">{error}</p>}
      <input
        id="author"
        name="author"
        type="text"
        value={post.meta.author}
        onChange={(e) => {
          modifyPost((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              meta: { ...prev.meta, author: e.target.value },
            } as typeof prev;
          });
        }}
        placeholder="Enter author name"
        className={`p-3 rounded-lg border ${error ? "border-error" : "border-border"} bg-background text-text-main focus:outline-none focus:border-primary transition-all placeholder:text-text-muted/50`}
      />
    </div>
  );
};
