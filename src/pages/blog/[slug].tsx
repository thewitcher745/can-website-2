import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface BlogPost {
  author: string;
  content_html: string;
  date: string;
  slug: string;
  tags: string[];
  title: string;
}

const BlogPostPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`https://can.up.railway.app/api/blog/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blog post");
        return res.json();
      })
      .then(setPost)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-error">{error}</div>;
  if (!post) return <div className="p-8 text-center">Post not found.</div>;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <Link href="/blog" className="text-secondary hover:underline text-sm">
        ← Back to Blog
      </Link>
      <h1 className="text-3xl font-bold mb-2 mt-4">{post.title}</h1>
      <div className="text-sm text-text-muted mb-2">
        {new Date(post.date).toLocaleDateString()} by {post.author}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <span key={tag} className="bg-surface text-xs px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
      <article
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content_html }}
      />
    </div>
  );
};

export default BlogPostPage;
