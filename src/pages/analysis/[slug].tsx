import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

import Footer from "@shared/ui/Footer";
import { buildApiUrl } from "@src/config";
import { Article } from "@src/types";
import ChartModal from "@src/features/analysis/ChartModal";

const AnalysisPostPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [posts, setPosts] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalImgSrc, setModalImgSrc] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(buildApiUrl(`/api/analysis/${slug}`))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch analysis post");
        return res.json();
      })
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch((e) => setError(e.message))
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  const mainPost = posts[0];
  const updates = posts.slice(1);

  useEffect(() => {
    if (loading || !contentRef.current || updates.length === 0) return;

    const container = contentRef.current;
    const images = container.querySelectorAll("article img");

    const cleanupFunctions: (() => void)[] = [];

    images.forEach((img) => {
      console.log(img);
      const imgElement = img as HTMLElement;

      // Wrap image in a relative container if not already wrapped
      let wrapper = imgElement.parentElement;
      if (!wrapper?.classList.contains("img-overlay-wrapper")) {
        wrapper = document.createElement("div");
        wrapper.classList.add(
          "img-overlay-wrapper",
          "relative",
          "inline-block"
        );
        imgElement.parentNode?.insertBefore(wrapper, imgElement);
        wrapper.appendChild(imgElement);
      }

      // Create overlay
      const overlay = document.createElement("div");
      overlay.classList.add(
        "img-overlay",
        "hidden",
        "absolute",
        "w-full",
        "h-full",
        "left-0",
        "top-0",
        "pointer-events-none",
        "bg-gray-600/60",
        "justify-center",
        "items-center",
        "flex"
      );
      const overlayText = document.createElement("span");
      overlayText.classList.add("text-xl");
      overlayText.innerHTML = "Click to expand.";
      wrapper.appendChild(overlay);
      overlay.appendChild(overlayText);

      // Event handlers
      const handleClick = (event: Event) => {
        setModalImgSrc((event?.target as HTMLElement).getAttribute("src"));
        setModalVisible(true);
      };

      const handleMouseEnter = () => {
        overlay.classList.remove("hidden");
        overlay.classList.add("block");
      };

      const handleMouseLeave = () => {
        overlay.classList.add("hidden");
        overlay.classList.remove("block");
      };

      // Add listeners
      imgElement.addEventListener("click", handleClick);
      imgElement.addEventListener("mouseenter", handleMouseEnter);
      imgElement.addEventListener("mouseleave", handleMouseLeave);

      // Store cleanup function
      cleanupFunctions.push(() => {
        imgElement.removeEventListener("click", handleClick);
        imgElement.removeEventListener("mouseenter", handleMouseEnter);
        imgElement.removeEventListener("mouseleave", handleMouseLeave);
        overlay.remove();
      });
    });

    // Cleanup function
    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, [loading, posts, updates, modalVisible]); // Re-run when posts change

  if (loading)
    return (
      <>
        <Head>
          <title>CAN Trading</title>
        </Head>
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
        <Head>
          <title>Error - CAN Trading</title>
        </Head>
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

  if (!posts || posts.length === 0)
    return (
      <>
        <Head>
          <title>Post not found - CAN Trading</title>
        </Head>
        <main className="bg-background min-h-screen">
          <div className="flex flex-col items-center justify-center min-h-[40vh] bg-background">
            <span className="text-text-muted text-lg tracking-wide">
              Post not found.
            </span>
          </div>
        </main>
        <Footer />
      </>
    );

  return (
    <>
      <Head>
        <title>{mainPost.title} - CAN Trading</title>
      </Head>
      <main className="bg-background flex justify-center min-h-screen">
        <div ref={contentRef} className="max-w-4xl mx-auto py-8 px-4 pt-6">
          <Link
            href="/analysis"
            className="text-primary hover:underline text-sm"
          >
            ← Back to Analysis
          </Link>
          <div className="rounded-lg p-8 mt-4">
            <h1 className="text-xl md:text-3xl font-semibold mb-4 text-text-main hover:text-primary transition-colors">
              {mainPost.title}
            </h1>
            <div className="text-xs text-text-muted mb-4">
              {new Date(mainPost.time).toLocaleDateString(undefined, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}{" "}
              {new Date(mainPost.time).toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </div>
            <article
              className="analysis-article prose prose-invert max-w-none text-text-main"
              dangerouslySetInnerHTML={{ __html: mainPost.content_html }}
            />
          </div>

          {/* Updates feed */}
          {updates.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-primary">
                Updates
              </h2>
              <div className="flex flex-col gap-4">
                {updates.map((update, idx) => (
                  <div
                    key={idx}
                    className="border-l-4 border-primary px-6 py-3 relative"
                  >
                    <div className="text-xs text-text-muted mb-1">
                      Update at{" "}
                      {new Date(update.time).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}{" "}
                      {new Date(update.time).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </div>
                    <article
                      className="analysis-article text-text-main"
                      dangerouslySetInnerHTML={{
                        __html: update.content_html,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {modalImgSrc && modalVisible && (
          <ChartModal
            imgSrc={modalImgSrc}
            closeModal={() => setModalVisible(false)}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default AnalysisPostPage;
