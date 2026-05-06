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
  const [updates, setUpdates] = useState<any[]>([]);
  const [updateDates, setUpdateDates] = useState<string[]>([]);
  const [updateTimes, setUpdateTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSlugExists, setIsSlugExists] = useState(false);

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
      // Load existing updates if they exist
      if (data.updates && Array.isArray(data.updates)) {
        setUpdates(data.updates);
        // Extract times from existing updates
        const dates: string[] = [];
        const times = data.updates.map((update: any) => {
          if (update.time) {
            const date = new Date(update.time);
            dates.push(date.toISOString().split("T")[0]);
            return date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });
          }
          dates.push(new Date().toISOString().split("T")[0]);
          return new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
        });
        setUpdateDates(dates);
        setUpdateTimes(times);
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
                  .replace(/[^a-zA-Z0-9\s]/g, "")
                  .toLowerCase()
                  .replace(/\s+/g, "-")
              : name === "symbol" &&
                  !isEditing &&
                  typeof val === "string" &&
                  metadata.type === "high_potential"
                ? val
                    .replace(/[^a-zA-Z0-9\s]/g, "")
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                : prev.slug,
        };
        return next;
      });
    } else {
      setMetadata((prev) => {
        const next = {
          ...prev,
          [name]: typeof val === "string" ? val : String(val),
        };
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
          image: "",
          coins: "",
          isVip: false,
        };
      } else {
        return {
          ...base,
          thumbnail: "",
        };
      }
    });
  };

  const handleAddUpdate = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    setUpdateDates((prev) => [...prev, currentDate]);
    setUpdateTimes((prev) => [...prev, currentTime]);
    setUpdates((prev) => [
      ...prev,
      {
        time: new Date().getTime(),
        blocks: [],
        version: "2.31.3",
      },
    ]);
  };

  const handleUpdateDateChange = (index: number, date: string) => {
    setUpdateDates((prev) => {
      const newDates = [...prev];
      newDates[index] = date;
      return newDates;
    });

    // Update the actual update time based on the date and time inputs
    setUpdates((prev) => {
      const newUpdates = [...prev];
      const [hours, minutes] = (updateTimes[index] || "00:00").split(":");
      const dateTime = new Date(date);
      dateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      newUpdates[index] = {
        ...newUpdates[index],
        time: dateTime.getTime(),
      };
      return newUpdates;
    });
  };

  const handleUpdateTimeChange = (index: number, time: string) => {
    setUpdateTimes((prev) => {
      console.log(time);
      const newTimes = [...prev];
      newTimes[index] = time;
      return newTimes;
    });

    // Update the actual update time based on the input
    setUpdates((prev) => {
      const newUpdates = [...prev];
      const [hours, minutes] = time.split(":");
      const now = new Date(
        updateDates[index] || new Date().toISOString().split("T")[0],
      );
      now.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      newUpdates[index] = {
        ...newUpdates[index],
        time: now.getTime(),
      };
      return newUpdates;
    });
  };

  const handleUpdateChange = (index: number, data: any) => {
    setUpdates((prev) => {
      const newUpdates = [...prev];
      newUpdates[index] = data;
      console.log(newUpdates);
      return newUpdates;
    });
  };

  const handleRemoveUpdate = (index: number) => {
    if (confirm("Are you sure you want to remove this update?")) {
      setUpdates((prev) => prev.filter((_, i) => i !== index));
      setUpdateDates((prev) => prev.filter((_, i) => i !== index));
      setUpdateTimes((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const checkSlugExists = async () => {
    if (!metadata.slug || isEditing) {
      setIsSlugExists(false);
      return;
    }

    try {
      const response = await fetch(
        buildApiUrl(`/api/admin/checkSlug?slug=${metadata.slug}`),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
        },
      );
      const data = await response.json();
      setIsSlugExists(data.exists || false);
    } catch (error) {
      console.error("Error checking slug:", error);
    }
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      checkSlugExists();
    }, 500);
    return () => clearTimeout(timeout);
  }, [metadata.slug]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Basic validation
      if (!metadata.title || !metadata.slug || !metadata.author) {
        alert("Please fill in all required fields.");
        setLoading(false);
        return;
      }

      const endpoint = isEditing
        ? buildApiUrl(`/api/admin/postNewArticle?edit=true`)
        : buildApiUrl("/api/admin/postNewArticle");

      // Build the payload
      const payload: any = {
        slug: metadata.slug,
        type: metadata.type,
        title: metadata.title,
        author: metadata.author,
        description: metadata.description || "",
        tags: metadata.tags,
        time: `${metadata.date}T${metadata.time}+03:30`,
        status: metadata.status,
        lastModifiedTime: Date.now(),
        body: content,
      };

      // Add updates array for analysis posts
      if (metadata.type === "analysis") {
        payload.updates = updates;
      }

      // Type-specific fields
      if (metadata.type === "blog" || metadata.type === "news") {
        payload.thumbnail = metadata.thumbnail;
      }

      if (metadata.type === "analysis") {
        payload.image = metadata.image;
        payload.coins = metadata.coins ? metadata.coins : [];
        payload.isVip = metadata.isVip || false;
      }

      if (metadata.type === "high_potential") {
        payload.symbol = metadata.symbol;
        payload.category = metadata.category;
        payload.logo = metadata.logo;
        payload.image = metadata.image;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save post");
      }

      alert(
        isEditing ? "Post updated successfully!" : "Post created successfully!",
      );
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error saving post:", error);
      alert(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-text-muted">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-text-main">
            {isEditing ? "Edit Post" : "Create New Post"}
          </h1>
          <button
            onClick={fillSampleData}
            className="px-4 py-2 rounded-lg bg-secondary text-text-main hover:bg-secondary/80 transition-colors"
          >
            Fill Sample Data
          </button>
        </div>

        {/* Status and Actions */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
          <div className="flex items-center gap-4">
            <label htmlFor="status" className="text-sm text-text-muted">
              Status:
            </label>
            <select
              id="status"
              name="status"
              value={metadata.status}
              onChange={handleMetadataChange}
              className="p-2 rounded-lg border border-border bg-background text-text-main focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading || isSlugExists}
            className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? "Saving..." : isEditing ? "Update Post" : "Create Post"}
          </button>
        </div>

        {/* Basic Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-border">
          <div className="flex flex-col">
            <label htmlFor="type" className="mb-2 text-sm text-text-muted">
              Post Type
            </label>
            <select
              id="type"
              name="type"
              value={metadata.type}
              onChange={handleTypeChange}
              className={`p-3 rounded-lg border border-border bg-background text-text-main focus:outline-none focus:border-primary transition-all appearance-none ${
                isEditing
                  ? "pointer-events-none cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              disabled={isEditing}
            >
              <option value="analysis">Technical Analysis</option>
              <option value="blog">Blog</option>
              <option value="news">News</option>
              <option value="high_potential">High Potential</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="title" className="mb-2 text-sm text-text-muted">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={metadata.title}
              onChange={handleMetadataChange}
              placeholder="Enter post title"
              className="p-3 rounded-lg border border-border bg-background text-text-main focus:outline-none focus:border-primary transition-all placeholder:text-text-muted/50"
            />
          </div>

          {metadata.type === "high_potential" && (
            <>
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

          <div className="flex flex-col">
            <label htmlFor="slug" className="mb-2 text-sm text-text-muted">
              Slug (URL)
              {isSlugExists && (
                <span className="mb-2 ml-4 text-sm text-error">
                  This slug already exists.
                </span>
              )}
            </label>

            <input
              id="slug"
              name="slug"
              type="text"
              value={metadata.slug}
              onChange={handleMetadataChange}
              placeholder="post-url-slug"
              className={`p-3 rounded-lg border bg-background text-text-main focus:outline-none focus:border-primary transition-all placeholder:text-text-muted/50 ${
                isEditing ? "pointer-events-none" : "pointer"
              } ${isSlugExists ? "border-error" : "border-border"}`}
              readOnly={isEditing}
            />
          </div>

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
          {(metadata.type === "blog" || metadata.type === "news") && (
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

        {/* Main Editor */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-main mb-4">
            Main Content
          </h2>
          <div className="bg-white text-black p-8 rounded-lg min-h-[400px] overflow-hidden shadow-inner ring-1 ring-border">
            <Editor
              holder="editorjs-container"
              onChange={setContent}
              data={content}
            />
          </div>
        </div>

        {/* Updates Section - Only for Analysis Posts */}
        {metadata.type === "analysis" && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-text-main">
                Updates {updates.length > 0 && `(${updates.length})`}
              </h2>
              <button
                onClick={handleAddUpdate}
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors font-medium"
              >
                + Add Update
              </button>
            </div>

            {updates.length === 0 && (
              <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                <p className="text-text-muted mb-4">
                  No updates yet. Add an update to keep your analysis current.
                </p>
              </div>
            )}

            {updates.map((update, index) => (
              <div
                key={index}
                className="mb-6 p-6 border border-border rounded-lg bg-background/50"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-main">
                    Update #{index + 1}
                  </h3>
                  <button
                    onClick={() => handleRemoveUpdate(index)}
                    className="px-3 py-1 rounded text-sm bg-error/10 text-error hover:bg-error/20 transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col">
                    <label
                      htmlFor={`update-date-${index}`}
                      className="mb-2 text-sm text-text-muted"
                    >
                      Update Date
                    </label>
                    <input
                      id={`update-date-${index}`}
                      type="date"
                      value={updateDates[index] || ""}
                      onChange={(e) =>
                        handleUpdateDateChange(index, e.target.value)
                      }
                      className="p-3 rounded-lg border border-border bg-background text-text-main focus:outline-none focus:border-primary transition-all [color-scheme:dark]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor={`update-time-${index}`}
                      className="mb-2 text-sm text-text-muted"
                    >
                      Update Time
                    </label>
                    <input
                      id={`update-time-${index}`}
                      type="time"
                      value={updateTimes[index] || ""}
                      onChange={(e) =>
                        handleUpdateTimeChange(index, e.target.value)
                      }
                      className="p-3 rounded-lg border border-border bg-background text-text-main focus:outline-none focus:border-primary transition-all [color-scheme:dark]"
                    />
                  </div>
                </div>
                <div className="bg-white text-black p-6 rounded-lg min-h-[300px] overflow-hidden shadow-inner ring-1 ring-border">
                  <Editor
                    holder={`update-editor-${index}`}
                    onChange={(data) => handleUpdateChange(index, data)}
                    data={update}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(EditPost);
