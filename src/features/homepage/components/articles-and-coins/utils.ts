import { ArticleItem, ArticleItemRaw } from "@src/types";

export const parseDate = (value: unknown): Date | null => {
  if (!value && value !== 0) return null;
  try {
    if (typeof value === "number") return new Date(value);
    if (typeof value === "string") {
      const num = Number(value);
      if (!Number.isNaN(num) && value.trim() !== "") {
        return new Date(num);
      }
      const d = new Date(value);
      return isNaN(d.getTime()) ? null : d;
    }
    return null;
  } catch {
    return null;
  }
};

export const normalizeItem = (raw: ArticleItemRaw): ArticleItem => {
  const publishedCandidate =
    raw.publishedAt ?? raw.time ?? raw.timestamp ?? raw.date ?? null;
  return {
    slug: raw.slug,
    thumbnail: raw.thumbnail,
    title: raw.title,
    publishedAt: parseDate(publishedCandidate as unknown)!,
  };
};
