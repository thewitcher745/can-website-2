import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import withAuth from "@src/features/admin/withAuth";
import { ListedHighPotential } from "@src/domains/high-potential/types";
import { ListedArticle } from "@src/domains/articles/types";
import { ListedAnalysis } from "@src/domains/analysis/types";
import { Admin } from "@src/domains/admin/types";
import { deletePost, getPostsAdmin } from "@src/domains/admin/api";
import { PostType } from "@src/shared/types/posts";

type Post =
  | Admin<ListedAnalysis>
  | Admin<ListedArticle>
  | Admin<ListedHighPotential>;

type SortField =
  | "title"
  | "createdAt"
  | "publishedAt"
  | "lastModifiedAt"
  | "type";

type SortOrder = "asc" | "desc";

const AdminDashboard = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>("lastModifiedAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const res = await getPostsAdmin();

      const allPosts = res.data as Post[];

      setPosts(allPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const sortedPosts = [...posts].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    if (sortField === "publishedAt") {
      aValue = new Date(a.meta.publishedAt || 0).getTime();
      bValue = new Date(b.meta.publishedAt || 0).getTime();
    } else if (sortField === "createdAt") {
      aValue = new Date(a.meta.createdAt || 0).getTime();
      bValue = new Date(b.meta.createdAt || 0).getTime();
    } else if (sortField === "type") {
      aValue = a.type.toLowerCase();
      bValue = b.type.toLowerCase();
    } else {
      aValue = a.meta.title.toLowerCase();
      bValue = b.meta.title.toLowerCase();
    }

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field)
      return <span className="text-text-muted ml-1">⇅</span>;
    return (
      <span className="text-primary ml-1">
        {sortOrder === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  const handleDelete = async (slug: string, type: PostType) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(type, slug);

        alert("Post deleted successfully");
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Error deleting post");
      }
    }
  };

  return (
    <div className="pt-20 bg-surface text-text-main rounded-xl shadow-xl border border-border flex justify-center min-h-lvh">
      <div className="max-w-custom w-full px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="m-0 text-2xl font-bold text-primary">
            Content Dashboard
          </h1>
          <button
            className="px-6 py-3 bg-primary hover:bg-primary-dark text-black rounded-lg font-bold cursor-pointer transition-colors"
            onClick={() => router.push("/admin/create")}
          >
            + New Post
          </button>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-text-muted">Loading posts...</p>
          ) : (
            <table className="w-full border-collapse mt-4">
              <thead>
                <tr className="bg-background text-text-muted text-xs font-semibold uppercase">
                  <th
                    className="p-4 text-left border-b border-border cursor-pointer hover:text-primary transition-colors"
                    onClick={() => handleSort("title")}
                  >
                    Title
                    <SortIcon field="title" />
                  </th>
                  <th
                    className="p-4 text-left border-b border-border cursor-pointer hover:text-primary transition-colors"
                    onClick={() => handleSort("type")}
                  >
                    Type
                    <SortIcon field="type" />
                  </th>
                  <th
                    className="p-4 text-left border-b border-border cursor-pointer hover:text-primary transition-colors"
                    onClick={() => handleSort("publishedAt")}
                  >
                    Publish time
                    <SortIcon field="publishedAt" />
                  </th>
                  <th
                    className="p-4 text-left border-b border-border cursor-pointer hover:text-primary transition-colors"
                    onClick={() => handleSort("lastModifiedAt")}
                  >
                    Last modified time
                    <SortIcon field="lastModifiedAt" />
                  </th>
                  <th className="p-4 text-left border-b border-border">
                    Status
                  </th>
                  <th className="p-4 text-left border-b border-border">VIP</th>
                  <th className="p-4 text-left border-b border-border">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedPosts.map((post) => (
                  <tr
                    key={post.slug}
                    className="hover:bg-background/50 transition-colors"
                  >
                    <td className="p-4 border-b border-border">
                      {post.meta.title}
                    </td>
                    <td className="p-4 border-b border-border">
                      <span className="capitalize">
                        {post.type.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-4 border-b border-border">
                      {new Date(
                        post.meta.publishedAt || "",
                      ).toLocaleDateString()}{" "}
                      {new Date(post.meta.publishedAt || "").toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </td>
                    <td className="p-4 border-b border-border">
                      {new Date(
                        post.meta.lastModifiedAt || "",
                      ).toLocaleDateString()}{" "}
                      {new Date(
                        post.meta.lastModifiedAt || "",
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="p-4 border-b border-border">
                      <span
                        className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                          post.status === "published"
                            ? "bg-success/20 text-success border border-success/30"
                            : "bg-primary-dark/20 text-primary-dark border border-primary-dark/30"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="p-4 border-b border-border">
                      {(post as Admin<ListedAnalysis>).meta?.isVip === true ? (
                        <span className="text-primary font-bold">YES</span>
                      ) : (post as Admin<ListedAnalysis>).meta?.isVip ===
                        false ? (
                        <span className="text-text-muted">NO</span>
                      ) : (
                        <span className="text-text-muted italic">-</span>
                      )}
                    </td>
                    <td className="p-4 border-b border-border">
                      <div className="flex gap-2">
                        <button
                          className="px-3 py-1.5 bg-secondary hover:bg-secondary-light hover:text-black text-white text-sm rounded transition-colors"
                          onClick={() =>
                            router.push(
                              `/admin/edit?slug=${post.slug}&type=${post.type}`,
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1.5 bg-error hover:bg-error-light hover:text-black text-white text-sm rounded transition-colors"
                          onClick={() => handleDelete(post.slug, post.type)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuth(AdminDashboard);
