import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import type { ProductSeries, ProductVariant } from "@/data/products";
import placeholderManifest from "@/data/placeholder-images.json";

// Server-only: reads public/ with node:fs. Sync reads complete during prerender,
// so the result is baked into the static HTML at build time.

const PRODUCTS_DIR = path.join(process.cwd(), "public", "images", "products");
const PRODUCTS_URL = "/images/products";
/** Checked in order; the first existing file wins. */
const EXTENSIONS = [".webp", ".avif", ".png", ".jpg", ".jpeg"];

export type ProductImage = {
  src: string;
  /** True when the variant has no own image and the series base image is used. */
  isFallback: boolean;
};

// Read on every call (not cached at module scope) so that images added while
// `next dev` is running show up on the next refresh.
function listProductImages(): Set<string> {
  try {
    return new Set(fs.readdirSync(PRODUCTS_DIR));
  } catch {
    return new Set();
  }
}

/**
 * True while `src` is still the untouched generated placeholder (its SHA-256 matches
 * src/data/placeholder-images.json). Replacing the file with a real image changes
 * the hash, so the real image is used without any code change.
 */
export function isPlaceholderImage(src: string): boolean {
  const expected = (placeholderManifest as Record<string, string>)[src];
  if (!expected) return false;
  try {
    const bytes = fs.readFileSync(path.join(process.cwd(), "public", src));
    return crypto.createHash("sha256").update(bytes).digest("hex") === expected;
  } catch {
    return false;
  }
}

/**
 * Pixel size of a PNG or JPEG under public/, read from the file header at build
 * time. Undefined for other formats or unreadable files.
 */
export function getImageSize(src: string): { width: number; height: number } | undefined {
  try {
    const bytes = fs.readFileSync(path.join(process.cwd(), "public", src));
    // PNG: IHDR width/height at fixed offsets.
    if (bytes.readUInt32BE(0) === 0x89504e47) {
      return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
    }
    // JPEG: walk the segments to the first start-of-frame marker.
    if (bytes.readUInt16BE(0) === 0xffd8) {
      let offset = 2;
      while (offset < bytes.length - 9) {
        const marker = bytes.readUInt16BE(offset);
        const length = bytes.readUInt16BE(offset + 2);
        if (marker >= 0xffc0 && marker <= 0xffcf && ![0xffc4, 0xffc8, 0xffcc].includes(marker)) {
          return { width: bytes.readUInt16BE(offset + 7), height: bytes.readUInt16BE(offset + 5) };
        }
        offset += 2 + length;
      }
    }
  } catch {
    // fall through
  }
  return undefined;
}

/** Whether a root-relative path under public/ (e.g. siteConfig.logo) exists. */
export function publicImageExists(src: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

/**
 * Resolves an extension-less public path (e.g. "/images/founder/founder") to the
 * first existing file in any supported format, e.g. "/images/founder/founder.png".
 */
export function resolvePublicImage(basePath: string): string | undefined {
  const ext = EXTENSIONS.find((e) => publicImageExists(`${basePath}${e}`));
  return ext ? `${basePath}${ext}` : undefined;
}

function findImage(slug: string, files: Set<string>): string | undefined {
  const ext = EXTENSIONS.find((e) => files.has(`${slug}${e}`));
  return ext ? `${PRODUCTS_URL}/${slug}${ext}` : undefined;
}

/** The series base image, e.g. /images/products/setu.png. */
export function getSeriesImage(series: ProductSeries): string | undefined {
  return findImage(series.slug, listProductImages());
}

/**
 * The variant's own image (e.g. setu-pro.png) if present, otherwise the series
 * base image (setu.png). Undefined when neither exists.
 */
export function getVariantImage(
  series: ProductSeries,
  variant: ProductVariant,
): ProductImage | undefined {
  const files = listProductImages();
  const own = findImage(variant.slug, files);
  if (own) return { src: own, isFallback: false };

  const base = findImage(series.slug, files);
  return base ? { src: base, isFallback: true } : undefined;
}
