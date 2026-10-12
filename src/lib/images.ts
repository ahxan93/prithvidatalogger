import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { cacheLife } from "next/cache";
import type { ProductSeries, ProductVariant } from "@/data/products";
import placeholderManifest from "@/data/placeholder-images.json";

// Server-only: reads public/ with node:fs. Every exported function below is
// `"use cache"` (Cache Components requires async for that), because a raw
// synchronous fs read during prerendering is flagged as unstable/non-deterministic
// IO — see https://nextjs.org/docs/messages/blocking-prerender-current-time.
// Trade-off: replacing a file under public/ while `next dev` is running may need
// a dev-server restart to show up (HMR invalidates this cache on a code edit,
// not on a bare asset swap); a fresh `next build` always reflects the real files.

const PRODUCTS_DIR = path.join(process.cwd(), "public", "images", "products");
const PRODUCTS_URL = "/images/products";
/** Checked in order; the first existing file wins. */
const EXTENSIONS = [".webp", ".avif", ".png", ".jpg", ".jpeg"];

export type ProductImage = {
  src: string;
  /** True when the variant has no own image and the series base image is used. */
  isFallback: boolean;
};

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
export async function isPlaceholderImage(src: string): Promise<boolean> {
  "use cache";
  // Images under public/ only change between deployments, and the cache key
  // already includes the build ID (so a new deploy always gets a fresh
  // result) — safe to cache for as long as "max" allows.
  cacheLife("max");
  const expected = (placeholderManifest as Record<string, string>)[src];
  if (!expected) return false;
  try {
    const bytes = fs.readFileSync(path.join(process.cwd(), "public", src));
    return crypto.createHash("sha256").update(bytes).digest("hex") === expected;
  } catch {
    return false;
  }
}

/** VP8/VP8L/VP8X sub-formats inside a RIFF/WEBP container (no AVIF support — not used on this site today). */
function webpSize(bytes: Buffer): { width: number; height: number } | undefined {
  const fourCc = bytes.toString("ascii", 12, 16);
  if (fourCc === "VP8X") {
    // 1 byte flags + 3 reserved, then 24-bit (width-1) and 24-bit (height-1), both little-endian.
    const width = (bytes[24] | (bytes[25] << 8) | (bytes[26] << 16)) + 1;
    const height = (bytes[27] | (bytes[28] << 8) | (bytes[29] << 16)) + 1;
    return { width, height };
  }
  if (fourCc === "VP8 ") {
    // Lossy: 3-byte frame tag, then a 3-byte sync code (0x9d 0x01 0x2a), then
    // 14-bit width/height (lower 14 bits of each little-endian uint16).
    const width = bytes.readUInt16LE(26) & 0x3fff;
    const height = bytes.readUInt16LE(28) & 0x3fff;
    return { width, height };
  }
  if (fourCc === "VP8L") {
    // Lossless: signature byte 0x2f, then a packed 32-bit little-endian value:
    // 14 bits (width-1), 14 bits (height-1).
    const bits = bytes.readUInt32LE(21);
    const width = (bits & 0x3fff) + 1;
    const height = ((bits >> 14) & 0x3fff) + 1;
    return { width, height };
  }
  return undefined;
}

/**
 * Pixel size of a PNG, JPEG or WebP under public/, read from the file header
 * at build time. Undefined for other formats (e.g. AVIF, not used on this
 * site today) or unreadable files.
 */
export async function getImageSize(src: string): Promise<{ width: number; height: number } | undefined> {
  "use cache";
  // Images under public/ only change between deployments, and the cache key
  // already includes the build ID (so a new deploy always gets a fresh
  // result) — safe to cache for as long as "max" allows.
  cacheLife("max");
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
    // WebP: "RIFF" .... "WEBP".
    if (bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP") {
      return webpSize(bytes);
    }
  } catch {
    // fall through
  }
  return undefined;
}

/**
 * Case-safe existence check for a root-relative path under public/. Windows'
 * filesystem is case-insensitive, so `fs.existsSync` alone would happily find
 * "founder.PNG" when the code asks for "founder.png" — then 404 for real once
 * deployed to Linux (Vercel), which is case-sensitive. This lists the actual
 * directory and compares names case-insensitively instead, so a mismatch
 * behaves identically (and is caught) on every platform.
 */
export async function publicImageExists(src: string): Promise<boolean> {
  "use cache";
  // Images under public/ only change between deployments, and the cache key
  // already includes the build ID (so a new deploy always gets a fresh
  // result) — safe to cache for as long as "max" allows.
  cacheLife("max");
  return findActualCase(src) !== undefined;
}

function findActualCase(src: string): string | undefined {
  const abs = path.join(process.cwd(), "public", src);
  const dir = path.dirname(abs);
  const base = path.basename(abs);
  let entries: string[];
  try {
    entries = fs.readdirSync(dir);
  } catch {
    return undefined;
  }
  return entries.find((e) => e.toLowerCase() === base.toLowerCase());
}

/**
 * Resolves an extension-less public path (e.g. "/images/products/setu") to the
 * first existing file in any supported format, e.g. "/images/products/setu.png".
 * Matches extension case-insensitively but returns the path using the exact
 * on-disk casing, so the URL Next.js serves always matches a real file.
 */
export async function resolvePublicImage(basePath: string): Promise<string | undefined> {
  "use cache";
  // Images under public/ only change between deployments, and the cache key
  // already includes the build ID (so a new deploy always gets a fresh
  // result) — safe to cache for as long as "max" allows.
  cacheLife("max");
  for (const ext of EXTENSIONS) {
    const actual = findActualCase(`${basePath}${ext}`);
    if (actual) return `${path.dirname(basePath)}/${actual}`.replace(/\\/g, "/");
  }
  return undefined;
}

function findImage(slug: string, files: Set<string>): string | undefined {
  const ext = EXTENSIONS.find((e) => files.has(`${slug}${e}`));
  return ext ? `${PRODUCTS_URL}/${slug}${ext}` : undefined;
}

/** The series base image, e.g. /images/products/setu.png. */
export async function getSeriesImage(series: ProductSeries): Promise<string | undefined> {
  "use cache";
  // Images under public/ only change between deployments, and the cache key
  // already includes the build ID (so a new deploy always gets a fresh
  // result) — safe to cache for as long as "max" allows.
  cacheLife("max");
  return findImage(series.slug, listProductImages());
}

/**
 * The variant's own image (e.g. setu-pro.png) if present, otherwise the series
 * base image (setu.png). Undefined when neither exists.
 */
export async function getVariantImage(
  series: ProductSeries,
  variant: ProductVariant,
): Promise<ProductImage | undefined> {
  "use cache";
  // Images under public/ only change between deployments, and the cache key
  // already includes the build ID (so a new deploy always gets a fresh
  // result) — safe to cache for as long as "max" allows.
  cacheLife("max");
  const files = listProductImages();
  const own = findImage(variant.slug, files);
  if (own) return { src: own, isFallback: false };

  const base = findImage(series.slug, files);
  return base ? { src: base, isFallback: true } : undefined;
}
