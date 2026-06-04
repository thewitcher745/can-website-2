import Head from "next/head";
import { useRouter } from "next/router";

interface MetaTagsProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  noIndex?: boolean;
}

const MetaTags = ({
  title,
  description,
  canonicalUrl,
  image = "/images/showcase/can-banner.png",
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  tags,
  noIndex = false,
}: MetaTagsProps) => {
  const router = useRouter();
  const siteUrl = "https://can-trading.com";
  const fullUrl = canonicalUrl || `${siteUrl}${router.asPath}`;
  const fullImage = image.startsWith("http") ? image : `${siteUrl}${image}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "WebSite",
    headline: title,
    description: description,
    url: fullUrl,
    image: fullImage,
    ...(type === "article" && {
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      author: { "@type": "Person", name: author || "CAN Trading" },
    }),
  };

  return (
    <Head>
      {/* Basic */}
      <title>{`${title} | CAN Trading`}</title>
      <meta name="description" content={description} />
      {tags && <meta name="keywords" content={tags.join(", ")} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="CAN Trading" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Article specific */}
      {type === "article" && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {author && <meta property="article:author" content={author} />}
          {tags && <meta property="article:tag" content={tags.join(", ")} />}
        </>
      )}

      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
};

export default MetaTags;
