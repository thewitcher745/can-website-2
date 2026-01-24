import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import withAuth from "@src/features/admin/withAuth";
import { buildApiUrl } from "@src/config";

interface Post {
  id: string;
  title: string;
  slug: string;
  status: "published" | "draft";
  author: string;
  publishDate: string;
  category: string;
}

const AdminDashboard = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        // Simulate fetching posts from Flask API
        const mockPosts: Post[] = [
          {
            id: "1",
            title: "Bitcoin Market Analysis Q1 2024",
            slug: "bitcoin-market-analysis-q1-2024",
            status: "published",
            author: "Admin",
            publishDate: "2024-01-15",
            category: "analysis",
          },
          {
            id: "2",
            title: "Top 5 High Potential Altcoins",
            slug: "top-5-high-potential-altcoins",
            status: "draft",
            author: "Admin",
            publishDate: "2024-02-10",
            category: "high-potential",
          },
        ];

        setTimeout(() => {
          if (cancelled) return;
          setPosts(mockPosts);
          setLoading(false);
        }, 800);
      } catch {
        if (cancelled) return;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((post) => post.id !== id));
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
                  <th className="p-4 text-left border-b border-border">
                    Author
                  </th>
                  <th className="p-4 text-left border-b border-border">
                    Category
                  </th>
                  <th className="p-4 text-left border-b border-border">Date</th>
                  <th className="p-4 text-left border-b border-border">
                    Status
                  </th>
                  <th className="p-4 text-left border-b border-border">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-background/50 transition-colors"
                  >
                    <td className="p-4 border-b border-border">{post.title}</td>
                    <td className="p-4 border-b border-border">
                      {post.author}
                    </td>
                    <td className="p-4 border-b border-border">
                      {post.category}
                    </td>
                    <td className="p-4 border-b border-border">
                      {post.publishDate}
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
                      <div className="flex gap-2">
                        <button
                          className="px-3 py-1.5 bg-secondary hover:bg-secondary-light hover:text-black text-white text-sm rounded transition-colors"
                          onClick={() =>
                            router.push(`/admin/edit/${post.slug}`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1.5 bg-error hover:bg-error-light hover:text-black text-white text-sm rounded transition-colors"
                          onClick={() => handleDelete(post.id)}
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
