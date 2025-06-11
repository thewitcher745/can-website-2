import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

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
  const [filterTags, setFilterTags] = useState<string[] | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/blog/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blog posts");
        return res.json();
      })
      .then(setPosts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const removeTag = (tag: string) => {
    if (filterTags?.length === 1) {
      setFilterTags(null);
    } else {
      setFilterTags((prev) => prev?.filter((t) => t !== tag));
    }
  };

  const filteredPosts = filterTags
    ? posts.filter((post) => filterTags?.some((tag) => post.tags.includes(tag)))
    : posts;

  if (loading)
    return (
      <>
        <Navbar />
        <main className="bg-background min-h-screen">
          <div className="flex flex-col items-center justify-center min-h-[40vh] bg-background">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-opacity-60 mb-4"></div>
            <span className="text-text-muted text-lg tracking-wide">
              Loading...
            </span>
          </div>
        </main>
        <Footer />
      </>
    );
  if (error)
    return (
      <>
        <Navbar />
        <main className="bg-background min-h-screen">
          <div className="flex flex-col items-center justify-center min-h-[40vh] bg-background">
            <div className="mb-4">
              <svg
                className="w-12 h-12 text-error animate-pulse"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-error text-lg tracking-wide font-semibold mb-2">
              Error
            </span>
            <span className="text-text-muted text-base">{error}</span>
          </div>
        </main>
        <Footer />
      </>
    );

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="max-w-4xl mx-auto py-8 px-4 pt-24">
          <h1 className="text-3xl font-bold mb-8 text-primary">Blog</h1>
          <p className="text-text-main text-xl mb-6 px-2">
            Browse and read through the educational and informative blog posts
            made by the CAN team. Learn how we do what we do.
          </p>
          {filterTags && (
            <div className="mb-6 flex items-center gap-2 flex-wrap flex-col items-start sm:flex-row">
              {filterTags.map((tag) => (
                <button
                  onClick={() => removeTag(tag)}
                  className="bg-primary text-white text-xs px-3 py-1 rounded-full hover:bg-error-light"
                >
                  {tag}
                </button>
              ))}
              <button
                className="ml-2 text-xs text-error-light hover:text-error underline"
                onClick={() => setFilterTags(null)}
              >
                Clear Filters
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
                  <p className="text-text-muted mb-3 line-clamp-3">
                    {post.desc}
                  </p>
                  <div className="text-xs text-text-muted mb-3">
                    Posted at{" "}
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
                        onClick={() =>
                          setFilterTags((prev) =>
                            prev && prev.includes(tag)
                              ? prev
                              : [...(prev || []), tag]
                          )
                        }
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
