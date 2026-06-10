import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";

import withAuth from "../../withAuth";
import { PostStatus, PostType } from "@src/shared/types/posts";
import { Admin, EditorPost } from "@src/domains/admin/types";
import { AnalysisPost } from "@src/domains/analysis/types";
import { createPost, getPostAdmin, updatePost } from "@src/domains/admin/api";
import { createEmptyPost } from "@src/domains/admin/utils";
import AnalysisForm from "./AnalysisForm";
import { TitleField } from "./fields/TitleField";
import { AuthorField } from "./fields/AuthorField";
import { PublishedAtField } from "./fields/PublishedAtField";
import { DescriptionField } from "./fields/DescriptionField";
import { TagsField } from "./fields/TagsField";
import ArticleForm from "./ArticleForm";
import { ArticlePost } from "@src/domains/articles/types";
import { HighPotentialPost } from "@src/domains/high-potential/types";
import HighPotentialForm from "./HighPotentialForm";

const PostEditor = ({ mode }: { mode: "edit" | "create" }) => {
  const router = useRouter();
  const isEditing = mode == "edit";
  const [loading, setLoading] = useState(false);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [modified, setModified] = useState(false);
  const [loadedFromCache, setLoadedFromCache] = useState(false);
  const [post, setPost] = useState<EditorPost>(() => {
    if (mode === "create") {
      return createEmptyPost("analysis");
    }
    return null;
  });

  const [invalidFields, setInvalidFields] = useState<Record<string, string>>(
    {}
  );

  const modifyPost = (callback: SetStateAction<EditorPost>) => {
    if (!modified) setModified(true);

    // Save post to local storage on every modification
    if (post && modified) {
      if (isEditing)
        localStorage.setItem(`latest_edit_${post.slug}`, JSON.stringify(post));
      else localStorage.setItem("latest_create", JSON.stringify(post));
    }

    setPost(callback);
  };

  const slug = isEditing ? (router.query.slug as string) : undefined;
  const postType = isEditing ? (router.query.type as PostType) : post?.type;

  // Load from storage
  useEffect(() => {
    let saved;
    if (post) {
      if (isEditing) saved = localStorage.getItem(`latest_edit_${post.slug}`);
      else saved = localStorage.getItem("latest_create");
    }

    if (saved) {
      console.log("Loading from storage");
      const parsed = JSON.parse(saved);
      setPost(parsed);
      setModified(true);
      setLoadedFromCache(true);
    }
  }, []);

  const handleSubmit = async () => {
    if (!post) return;

    try {
      if (isEditing) {
        await updatePost(post.type, post.slug, post);

        localStorage.removeItem(`latest_edit_${post.slug}`);

        alert("Post updated successfully.");
      } else {
        await createPost(post.type, post.slug, post);

        localStorage.removeItem("latest_create");

        alert("Post created successfully.");
      }
      router.push("/admin/dashboard");
    } catch (error) {
      let errorData;
      try {
        errorData = JSON.parse((error as Error).message || "");
      } catch {
        alert("Error saving post.");
        return;
      }

      // For validation errors, capture which fields are invalid.
      if (errorData.error === "validation_error") {
        const newErrors: Record<string, string> = {};
        const errorMessages: string[] = [];

        errorData.details.forEach((e: any) => {
          newErrors[e.field] = e.message;
          errorMessages.push(e.message);
        });

        setInvalidFields(newErrors);
      } else {
        alert("Error saving post.");
      }
    }
  };

  const fetchPostData = async (postType: PostType, postSlug: string) => {
    setLoading(true);
    try {
      const res = await getPostAdmin<EditorPost>(postType, postSlug);
      console.log(res.data);
      setPost(res.data);
    } catch (error) {
      console.error("Error fetching post:", error);
      alert("Error loading post data.");
    } finally {
      setLoading(false);
    }
  };

  const handlePostTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value as PostType;
    setPost(createEmptyPost(type));
  };

  useEffect(() => {
    if (!loadedFromCache && isEditing && slug && postType)
      fetchPostData(postType, slug);
  }, [slug, postType]);

  useEffect(() => {
    if (!isEditing && !isSlugManuallyEdited && post?.meta.title) {
      const generatedSlug = post.meta.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      if (generatedSlug !== post.slug) {
        setPost((prev) => (prev ? { ...prev, slug: generatedSlug } : prev));
      }
    }
  }, [post?.meta.title, isEditing, isSlugManuallyEdited]);

  useEffect(() => {
    setIsSlugManuallyEdited(false);
  }, [post?.type]);

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="relative mx-auto max-w-6xl">
        {/* Top title */}
        <div className="fixed z-2 w-full px-8 py-4 bg-background mx-auto max-w-6xl border-b-1 border-primary flex flex-col gap-4 sm:gap-0 sm:flex-row items-center justify-between">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-text-main">
            {isEditing ? "Edit Post" : "Create New Post"}
          </h1>
          <button
            onClick={handleSubmit}
            disabled={loading || !modified}
            className="px-6 py-1 sm:py-3 rounded-lg cursor-pointer bg-primary hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? "Saving..." : isEditing ? "Update Post" : "Create Post"}
          </button>
        </div>
        <div className="px-4">
          {/* Status and Actions */}
          <div className="flex items-center justify-between mb-8 pt-32 pb-6 border-b border-border">
            <div className="flex flex-wrap gap-4 flex-col sm:flex-row w-full">
              {/* Post type */}
              <div className="flex flex-col flex-grow">
                {isEditing ? (
                  <label
                    htmlFor="type"
                    className="mb-2 text-sm text-text-muted"
                  >
                    Post Type:
                  </label>
                ) : (
                  <label
                    htmlFor="type"
                    className="mb-2 text-sm text-text-muted"
                  >
                    Select Post Type:
                  </label>
                )}
                <select
                  disabled={isEditing}
                  value={post?.type || "analysis"}
                  onChange={handlePostTypeChange}
                  className="p-2 rounded-lg border border-border bg-background text-text-main focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer"
                >
                  <option value="analysis">Technical Analysis</option>
                  <option value="blog">CAN Magazine</option>
                  <option value="news">News</option>
                  <option value="high-potential">High Potential</option>
                </select>
              </div>

              {/* Post publish status */}
              {post && (
                <div className="flex flex-col flex-grow">
                  <label
                    htmlFor="type"
                    className="mb-2 text-sm text-text-muted"
                  >
                    Select publish status:
                  </label>
                  <select
                    value={post?.status || "draft"}
                    onChange={(e) => {
                      modifyPost(
                        (prev) =>
                          ({
                            ...prev,
                            status: e.target.value as PostStatus,
                          } as typeof prev)
                      );
                    }}
                    className="p-2 rounded-lg border border-border bg-background text-text-main focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              )}

              {/* Slug */}
              {post && (
                <div className="flex flex-col flex-grow">
                  <label
                    htmlFor="slug"
                    className="mb-2 text-sm text-text-muted"
                  >
                    Slug (URL)
                  </label>
                  {invalidFields["slug"] && (
                    <p className="mb-2 text-sm text-error">
                      {invalidFields["slug"]}
                    </p>
                  )}
                  <input
                    id="slug"
                    name="slug"
                    type="text"
                    value={post?.slug}
                    onChange={(e) => {
                      setIsSlugManuallyEdited(true);
                      modifyPost(
                        (prev) =>
                          ({
                            ...prev,
                            slug: e.target.value,
                          } as typeof prev)
                      );
                    }}
                    placeholder="post-url-slug"
                    className={`p-2 w-full rounded-lg border ${
                      invalidFields["slug"] ? "border-error" : "border-border"
                    } bg-background text-text-main focus:outline-none focus:border-primary transition-all placeholder:text-text-muted/50`}
                    readOnly={isEditing}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Basic Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-border">
            <TitleField
              post={post}
              modifyPost={modifyPost}
              error={invalidFields["meta.title"] || ""}
            />
            <AuthorField
              post={post}
              modifyPost={modifyPost}
              error={invalidFields["meta.author"] || ""}
            />
            <PublishedAtField
              post={post}
              modifyPost={modifyPost}
              error={invalidFields["meta.publishedAt"] || ""}
            />
            <TagsField
              post={post}
              modifyPost={modifyPost}
              error={invalidFields["meta.tags"] || ""}
            />
            <DescriptionField
              post={post}
              modifyPost={modifyPost}
              error={invalidFields["meta.description"] || ""}
            />
          </div>

          {/* Dynamically set fields based on post type */}
          {postType == "analysis" && (
            <AnalysisForm
              post={post as Admin<AnalysisPost>}
              modifyPost={
                modifyPost as (
                  callback: SetStateAction<Admin<AnalysisPost>>
                ) => void
              }
              invalidFields={invalidFields}
            />
          )}
          {(postType == "blog" || postType == "news") && (
            <ArticleForm
              post={post as Admin<ArticlePost>}
              modifyPost={
                modifyPost as (
                  callback: SetStateAction<Admin<ArticlePost>>
                ) => void
              }
              invalidFields={invalidFields}
            />
          )}
          {postType == "high-potential" && (
            <HighPotentialForm
              post={post as Admin<HighPotentialPost>}
              modifyPost={
                modifyPost as (
                  callback: SetStateAction<Admin<HighPotentialPost>>
                ) => void
              }
              invalidFields={invalidFields}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuth(PostEditor);
