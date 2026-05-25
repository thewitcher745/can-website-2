// TagsField.tsx
import { Dispatch, SetStateAction, useState } from "react";
import { EditorPost } from "@src/domains/admin/types";

export const TagsField = ({
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
  const [tagInput, setTagInput] = useState("");

  if (!post) return null;

  const addTag = () => {
    const rawTags = tagInput.trim();
    if (!rawTags) return;

    const newTags = rawTags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t && !post.meta.tags.includes(t));

    if (newTags.length === 0) return;

    if (!modified) setModified(true);
    setPost({
      ...post,
      meta: {
        ...post.meta,
        tags: [...post.meta.tags, ...newTags],
      },
    } as typeof post);
    setTagInput("");
  };

  const removeTag = (tagToRemove: string) => {
    if (!modified) setModified(true);
    setPost({
      ...post,
      meta: {
        ...post.meta,
        tags: post.meta.tags.filter((tag) => tag !== tagToRemove),
      },
    } as typeof post);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="tags" className="mb-2 text-sm text-text-muted">
        Tags
      </label>
      {error && <p className="mb-2 text-sm text-error">{error}</p>}
      <div className="flex gap-2 mb-2 flex-wrap">
        <input
          id="tags"
          name="tags"
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
          placeholder="Add a tag"
          className="flex-1 p-3 rounded-lg border border-border bg-background text-text-main focus:outline-none focus:border-primary transition-all"
        />
        <button
          type="button"
          onClick={addTag}
          className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {post.meta.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:text-error transition-colors"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};