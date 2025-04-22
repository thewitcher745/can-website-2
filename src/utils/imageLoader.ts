/**
 * Custom image loader for Next.js images
 * Needed for deployment on Netlify with the Next.js Image component
 */
export const imageLoader = ({ src, width, quality }: {
  src: string;
  width: number;
  quality?: number;
}) => {
  // For absolute URLs (external images)
  if (src.startsWith('http')) {
    return src;
  }
  
  // For local images
  return `${process.env.NEXT_PUBLIC_SITE_URL || ''}${src}?w=${width}&q=${quality || 75}`;
}; 