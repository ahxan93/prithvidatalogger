import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type BuildMetadataInput = {
  title: string;
  description: string;
  /** Path relative to the site root, e.g. "/products/setu". Used for the canonical URL. */
  path: string;
  /**
   * Absolute or root-relative OG image path. Defaults to the site OG image.
   * Pass `null` for a route that has its own `opengraph-image` file
   * convention (e.g. `/products/[slug]`) — setting an explicit image here
   * would make Next.js skip the generated file entirely.
   */
  image?: string | null;
  /** Skip the "| Prithvi Data Loggers" title suffix (used on the home page). */
  absoluteTitle?: boolean;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  image = siteConfig.ogImage,
  absoluteTitle = false,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  // Title limit is 60 chars (CLAUDE.md): drop the brand suffix when it would overflow.
  const suffixed = `${title} | ${siteConfig.name}`;
  const useSuffix = !absoluteTitle && suffixed.length <= 60;
  const fullTitle = useSuffix ? suffixed : title;

  // Surfaced in dev and build output.
  if (fullTitle.length > 60) {
    console.warn(`[seo] Title over 60 chars (${fullTitle.length}) on ${path}: "${fullTitle}"`);
  }
  if (description.length > 155) {
    console.warn(`[seo] Description over 155 chars (${description.length}) on ${path}`);
  }

  return {
    title: useSuffix ? title : { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url,
      title: fullTitle,
      description,
      ...(image !== null && { images: [{ url: image, width: 1200, height: 630, alt: fullTitle }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(image !== null && { images: [image] }),
    },
    ...(noIndex && { robots: { index: false, follow: true } }),
  };
}
