/**
 * Loader de imagens para `next/image` em exportação estática.
 * As fotografias Unsplash são redimensionadas e convertidas (AVIF/WebP) pelo CDN do Unsplash (imgix).
 * Em produção, substituir pelo CDN do CMS de viaturas (ex: Cloudinary, imgix, Sanity).
 */
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("https://images.unsplash.com")) {
    const url = new URL(src);
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 70));
    return url.toString();
  }
  return src;
}
