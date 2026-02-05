import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import withAuth from "@src/features/admin/withAuth";
import { buildApiUrl } from "@src/config";

interface Post {
  slug: string;
  type: string;
  status: "published" | "draft";
  time: string;
  lastModifiedTime: number;
  title: string;
  isVip: boolean | null;
}

const AdminDashboard = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(buildApiUrl("/api/admin/articles"), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });
      const data = await response.json();
      if (data.ok) {
        setPosts(data.items);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string, type: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(
          buildApiUrl(`/api/admin/deleteArticle?type=${type}&slug=${slug}`),
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
            },
          },
        );
        if (response.ok) {
          setPosts(posts.filter((post) => post.slug !== slug));
          alert("Post deleted successfully");
        } else {
          alert("Failed to delete post");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Error deleting post");
      }
    }
  };

  return (
    <div className="pt-20 bg-surface text-text-main rounded-xl shadow-xl border border-border flex justify-center min-h-lvh">
      <div className="max-w-custom w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="m-0 text-2xl font-bold text-primary">
            Content Dashboard
          </h1>
          <button
            className="px-6 py-3 bg-primary hover:bg-primary-dark text-black rounded-lg font-bold cursor-pointer transition-colors"
            onClick={() => router.push("/admin/edit/new")}
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
                  <th className="p-4 text-left border-b border-border">
                    Title
                  </th>
                  <th className="p-4 text-left border-b border-border">Type</th>
                  <th className="p-4 text-left border-b border-border">
                    Last modified time
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
                {posts.map((post) => (
                  <tr
                    key={post.slug}
                    className="hover:bg-background/50 transition-colors"
                  >
                    <td className="p-4 border-b border-border">{post.title}</td>
                    <td className="p-4 border-b border-border">
                      <span className="capitalize">
                        {post.type.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-4 border-b border-border">
                      {new Date(post.lastModifiedTime).toLocaleDateString()}{" "}
                      {new Date(post.lastModifiedTime).toLocaleTimeString([], {
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
                      {post.isVip === true ? (
                        <span className="text-primary font-bold">YES</span>
                      ) : post.isVip === false ? (
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
                              `/admin/edit/${post.slug}?type=${post.type}`,
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
