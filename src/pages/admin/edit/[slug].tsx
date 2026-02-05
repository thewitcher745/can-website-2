import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import withAuth from "../../../features/admin/withAuth";
import { ArticleType, EditorMetadata } from "../../../types";
import ImageUpload from "../../../features/admin/components/ImageUpload";
import { buildApiUrl } from "@src/config";

// Editor.js must be loaded on the client side only
const Editor = dynamic(
  () => import("../../../features/admin/components/Editor"),
  {
    ssr: false,
  },
);

const EditPost = () => {
  const router = useRouter();
  const { slug: slugParam } = router.query;
  const isEditing = slugParam !== "new";

  const [metadata, setMetadata] = useState<EditorMetadata>({
    type: "blog",
    title: "",
    slug: "",
    author: "",
    tags: "",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    status: "draft",
  });

  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (isEditing && slugParam) {
      fetchPostData();
    }
  }, [isEditing, slugParam]);

  const fetchPostData = async () => {
    setLoading(true);
    try {
      const type = router.query.type;

      const response = await fetch(
        buildApiUrl(`/api/admin/getArticle?type=${type}&slug=${slugParam}`),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch post data");
      }
      const data = (await response.json()).data;
      // Expecting data to have metadata and body (which we'll set to content)
      if (data.meta) {
        const { time, ...restMetadata } = data.meta;

        // Handle ISO format: 2025-11-26T12:45:00+03:30
        const [datePart, fullTimePart] = time.split("T");
        // fullTimePart could be "12:45:00+03:30" or just "12:45:00"
        const [timePart] = fullTimePart.split(/[+-]/); // Split by + or - to remove timezone
        const [hours, minutes] = timePart.split(":");

        setMetadata({
          ...restMetadata,
          date: datePart,
          time: `${hours}:${minutes}`,
        });
      }
      if (data.body) {
        setContent(data.body);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      alert("Error loading post data.");
    } finally {
      setLoading(false);
    }
  };

  const fillSampleData = () => {
    const sampleBody = {
      time: Date.now(),
      blocks: [
        {
          type: "header",
          data: {
            text: "Understanding the Future of Crypto",
            level: 2,
          },
        },
        {
          type: "paragraph",
          data: {
            text: "The landscape of digital assets is evolving rapidly. In this article, we explore the key trends shaping the industry in 2026.",
          },
        },
        {
          type: "list",
          data: {
            style: "unordered",
            items: ["DeFi Adoption", "Layer 2 Scaling", "Regulatory Clarity"],
          },
        },
      ],
      version: "2.29.0",
    };

    if (metadata.type === "high_potential") {
      setMetadata((prev) => ({
        ...prev,
        title: "Solana",
        symbol: "SOL",
        slug: "solana-potential",
        author: "Admin",
        tags: "solana, layer1, scalability",
        description:
          "An analysis of Solana's ecosystem growth and future potential.",
        category: "Gold",
        logo: "https://cryptologos.cc/logos/solana-sol-logo.png",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0",
      }));
    } else if (metadata.type === "analysis") {
      setMetadata((prev) => ({
        ...prev,
        title: "Bitcoin Technical Analysis - Q1 2026",
        slug: "btc-analysis-q1-2026",
        author: "Lead Analyst",
        tags: "btc, technical-analysis, macro",
        description: "Breaking down the latest price action for Bitcoin.",
        thumbnail:
          "https://images.unsplash.com/photo-1518546305927-5a555bb7020d",
        image: "https://images.unsplash.com/photo-1642104704074-907c0698bcd9",
        coins: "BTC, USDT",
        isVip: true,
      }));
    } else {
      setMetadata((prev) => ({
        ...prev,
        title: `Sample ${metadata.type.charAt(0).toUpperCase() + metadata.type.slice(1)} Post`,
        slug: `sample-${metadata.type}-post`,
        author: "Editor",
        tags: "crypto, news, updates",
        description: "This is a sample post generated for testing purposes.",
        thumbnail:
          "https://images.unsplash.com/photo-1621761191319-c6fb62004040",
      }));
    }
    setContent(sampleBody);
  };

  const handleMetadataChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    // If in editing mode, make slug and type unchangable.
    if (name !== "slug") {
      setMetadata((prev) => {
        const next = {
          ...prev,
          [name]: val,
          // Auto-generate slug from title if it's a new post, or from symbol if high_potential
          slug:
            name === "title" &&
            !isEditing &&
            typeof val === "string" &&
            metadata.type !== "high_potential"
              ? val
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^\w-]+/g, "")
              : name === "symbol" &&
                  !isEditing &&
                  typeof val === "string" &&
                  metadata.type === "high_potential"
                ? val
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w-]+/g, "")
                : prev.slug,
        };
        console.log(next);
        return next;
      });
    } else {
      setMetadata((prev) => {
        const next = {
          ...prev,
          [name]: typeof val === "string" ? val : String(val),
        };
        console.log(next);
        return next;
      });
    }
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as ArticleType;
    setMetadata((prev) => {
      const base = {
        ...prev,
        type: newType,
      };

      // Reset type-specific fields or set defaults
      if (newType === "high_potential") {
        return {
          ...base,
          title: "",
          symbol: "",
          category: "Bronze",
          logo: "",
          image: "",
        };
      } else if (newType === "analysis") {
        return {
          ...base,
          isVip: false,
          image: "",
          coins: "",
        };
      }
      return base;
    });
  };

  const handleSave = async (status: string) => {
    setLoading(true);

    // Combine publishDate and time into ISO 8601 with timezone (e.g., 2025-11-26T12:45:17+03:30)
    const timezoneOffset = "+03:30"; // USER specified offset
    const combinedDateTime = `${metadata.date}T${metadata.time}:00${timezoneOffset}`;

    const { date, time, ...restMetadata } = metadata;

    const postData = {
      ...restMetadata,
      time: combinedDateTime,
      status,
      body: content,
    };

    console.log(postData);

    try {
      const url = buildApiUrl("/api/admin/postNewArticle");

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`Failed to save post: ${response.statusText}`);
      }

      alert(
        `Post ${status === "published" ? "published" : "saved as draft"} successfully!`,
      );
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Error saving post. Please check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 bg-surface text-text-main rounded-xl shadow-xl border border-border flex justify-center">
      <div className="w-full max-w-custom px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="m-0 text-2xl font-bold text-primary">
            {isEditing ? "Edit Post" : "Create New Post"}
          </h1>
          <div className="flex flex-wrap gap-4">
            <button
              className="px-6 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-lg font-semibold transition-colors"
              onClick={fillSampleData}
            >
              Fill Sample Data
            </button>
            <button
              className="px-6 py-2 bg-surface hover:bg-background text-text-main border border-border rounded-lg font-semibold transition-colors"
              onClick={() => router.push("/admin/dashboard")}
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 bg-surface hover:bg-background text-text-main border border-border rounded-lg font-semibold transition-colors"
              onClick={() => handleSave("draft")}
              disabled={loading}
            >
              Save Draft
            </button>
            <button
              className="px-6 py-2 bg-primary hover:bg-primary-dark text-black rounded-lg font-semibold transition-colors shadow-lg shadow-primary/20"
              onClick={() => handleSave("published")}
              disabled={loading}
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-border">
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="type" className="mb-2 text-sm text-text-muted">
              Content Type
            </label>
            <select
              id="type"
              name="type"
              value={metadata.type}
              onChange={handleTypeChange}
              className={`p-3 rounded-lg border border-border bg-background text-text-main focus:outline-none focus:border-primary transition-all appearance-none cursor-${
                isEditing ? "not-allowed" : "pointer"
              } font-bold text-lg`}
              disabled={isEditing}
              onClick={(e) => {
                if (isEditing) {
                  e.preventDefault();
                }
              }}
            >
              <option value="blog">Blog Article</option>
              <option value="analysis">Technical Analysis</option>
              <option value="news">News</option>
              <option value="high_potential">High Potential Token</option>
            </select>
          </div>

          {/* Standard Fields for Blog, Analysis, News */}
          {metadata.type !== "high_potential" && (
            <div className="flex flex-col md:col-span-2">
              <label htmlFor="title" className="mb-2 text-sm text-text-muted">
                Post Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={metadata.title}
                onChange={handleMetadataChange}
                placeholder="Enter post title..."
                className="p-3 rounded-lg border border-border bg-background text-text-main text-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-text-muted/50"
                required
              />
            </div>
          )}

          {/* High Potential Specific Fields (No Title) */}
          {metadata.type === "high_potential" && (
            <>
              <div className="flex flex-col">
                <label htmlFor="title" className="mb-2 text-sm text-text-muted">
                  Title (Token Name i.e. HYPEUSDT)
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={metadata.title || ""}
                  onChange={handleMetadataChange}
                  placeholder="Bitcoin"
                  className="p-3 rounded-lg border border-border bg-background text-text-main focus:outline-none focus:border-primary transition-all"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="symbol"
                  className="mb-2 text-sm text-text-muted"
                >
                  Symbol (i.e. HYPE)
                </label>
                <input
                  id="symbol"
                  name="symbol"
                  type="text"
                  value={metadata.symbol || ""}
                  onChange={handleMetadataChange}
                  placeholder="BTC"
                  className="p-3 rounded-lg border border-border bg-background text-text-main focus:outline-none focus:border-primary transition-all"
                />
              </div>
            </>
          )}

          {!isEditing && (
            <div className="flex flex-col">
              <label htmlFor="slug" className="mb-2 text-sm text-text-muted">
                Slug (URL)
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                value={metadata.slug}
                onChange={handleMetadataChange}
                placeholder="post-url-slug"
                className="p-3 rounded-lg border border-border bg-background text-text-main focus:outline-none focus:border-primary transition-all placeholder:text-text-muted/50"
                readOnly={isEditing}
              />
            </div>
          )}

          <div className="flex flex-col">
            <label htmlFor="author" className="mb-2 text-sm text-text-muted">
              Author
            </label>
            <input
              id="author"
              name="author"
              type="text"
              value={metadata.author}
              onChange={handleMetadataChange}
              placeholder="Author name"
              className="p-3 rounded-lg border border-border bg-background text-text-main focus:outline-none focus:border-primary transition-all placeholder:text-text-muted/50"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="date" className="mb-2 text-sm text-text-muted">
              Publish Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={metadata.date}
              onChange={handleMetadataChange}
              className="p-3 rounded-lg border border-border bg-background text-text-main focus:outline-none focus:border-primary transition-all [color-scheme:dark]"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="time" className="mb-2 text-sm text-text-muted">
              Publish Time
            </label>
            <input
              id="time"
              name="time"
              type="time"
              value={metadata.time || ""}
              onChange={handleMetadataChange}
              className="p-3 rounded-lg border border-border bg-background text-text-main focus:outline-none focus:border-primary transition-all [color-scheme:dark]"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label
              htmlFor="description"
              className="mb-2 text-sm text-text-muted"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={metadata.description || ""}
              onChange={handleMetadataChange}
              placeholder="Enter a brief description..."
              className="p-3 rounded-lg border border-border bg-background text-text-main focus:outline-none focus:border-primary transition-all placeholder:text-text-muted/50 min-h-[100px]"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label htmlFor="tags" className="mb-2 text-sm text-text-muted">
              Tags (comma separated)
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              value={metadata.tags}
              onChange={handleMetadataChange}
              placeholder="crypto, bitcoin, analysis"
              className="p-3 rounded-lg border border-border bg-background text-text-main focus:outline-none focus:border-primary transition-all placeholder:text-text-muted/50"
            />
          </div>
        </div>

        {/* Dynamic Fields Based on Article Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-border">
          {(metadata.type === "blog" ||
            metadata.type === "news" ||
            metadata.type === "analysis") && (
            <ImageUpload
              label="Thumbnail"
              value={metadata.thumbnail}
              onChange={(url) => {
                setMetadata((prev) => ({ ...prev, thumbnail: url }));
              }}
              helperText="Recommended: 1200x630px"
            />
          )}

          {metadata.type === "analysis" && (
            <>
              <ImageUpload
                label="Main Image"
                value={metadata.image}
                onChange={(url) => {
                  setMetadata((prev) => ({ ...prev, image: url }));
                }}
                helperText="High quality analysis chart/image"
              />
              <div className="flex flex-col">
                <label htmlFor="coins" className="mb-2 text-sm text-text-muted">
                  Coins (comma separated)
                </label>
                <input
                  id="coins"
                  name="coins"
                  type="text"
                  value={metadata.coins || ""}
                  onChange={handleMetadataChange}
                  placeholder="BTC, ETH"
                  className="p-3 rounded-lg border border-border bg-background text-text-main focus:outline-none focus:border-primary transition-all"
                />
              </div>
              <div className="flex items-center gap-2 mt-6">
                <input
                  id="isVip"
                  name="isVip"
                  type="checkbox"
                  checked={metadata.isVip || false}
                  onChange={handleMetadataChange}
                  className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-primary cursor-pointer"
                />
                <label
                  htmlFor="isVip"
                  className="text-sm text-text-main cursor-pointer"
                >
                  VIP Analysis
                </label>
              </div>
            </>
          )}

          {metadata.type === "high_potential" && (
            <>
              <div className="flex flex-col">
                <label
                  htmlFor="category"
                  className="mb-2 text-sm text-text-muted"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={metadata.category || "Bronze"}
                  onChange={handleMetadataChange}
                  className="p-3 rounded-lg border border-border bg-background text-text-main focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer"
                >
                  <option value="Bronze">Bronze</option>
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                </select>
              </div>
              <ImageUpload
                label="Logo"
                value={metadata.logo}
                onChange={(url) => {
                  setMetadata((prev) => ({ ...prev, logo: url }));
                }}
                helperText="Token logo (SVG or PNG preferred)"
              />
              <ImageUpload
                label="Main Image"
                value={metadata.image}
                onChange={(url) => {
                  setMetadata((prev) => ({ ...prev, image: url }));
                }}
                helperText="High potential token showcase image"
                className="md:col-span-2"
              />
            </>
          )}
        </div>

        <div className="bg-white text-black p-8 rounded-lg min-h-[400px] mb-8 overflow-hidden shadow-inner ring-1 ring-border">
          <Editor
            holder="editorjs-container"
            onChange={setContent}
            data={content}
          />
        </div>
      </div>
    </div>
  );
};

export default withAuth(EditPost);
