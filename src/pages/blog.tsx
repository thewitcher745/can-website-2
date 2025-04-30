import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface BlogPostMeta {
  author: string;
  time: string;
  slug: string;
  tags: string[];
  title: string;
  desc: string;
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterTag, setFilterTag] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://can.up.railway.app/api/blog/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blog posts");
        return res.json();
      })
      .then(setPosts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = filterTag
    ? posts.filter((post) => post.tags.includes(filterTag))
    : posts;

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-error">{error}</div>;

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="max-w-2xl mx-auto py-8 px-4 pt-24">
          <h1 className="text-3xl font-bold mb-8 text-primary">Blog</h1>
          {filterTag && (
            <div className="mb-6 flex items-center gap-2">
              <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">
                {filterTag}
              </span>
              <button
                className="ml-2 text-xs text-error-light hover:text-error underline"
                onClick={() => setFilterTag(null)}
              >
                Clear Filter
              </button>
            </div>
          )}
          <div className="space-y-8">
            {filteredPosts.length === 0 ? (
              <div className="text-center text-text-muted">No posts found.</div>
            ) : (
              filteredPosts.map((post) => (
                <div
                  key={post.slug}
                  className="bg-surface border border-border rounded-lg p-6 shadow transition hover:shadow-lg"
                >
                  <h2 className="text-2xl font-semibold mb-2 text-text-main hover:text-primary transition-colors">
  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
</h2>
<p className="text-text-muted mb-3 line-clamp-3">{post.desc}</p>
                  <div className="text-xs text-text-muted mb-3">
                    {new Date(post.time).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}{" "}
                    {new Date(post.time).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <button
                        key={tag}
                        className={`bg-secondary-light text-secondary hover:bg-secondary hover:text-white text-xs px-2 py-1 rounded transition`}
                        onClick={() => setFilterTag(tag)}
                        type="button"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm text-primary underline hover:text-primary-soft transition"
                  >
                    Read more →
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
