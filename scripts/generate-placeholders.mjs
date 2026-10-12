// Generates labelled placeholder images under public/images/.
// Never overwrites an existing file, so real images are always kept.
//
//   npm run placeholders              create missing placeholders
//   npm run placeholders -- --manifest  only re-fingerprint existing ones
//
// Every placeholder's SHA-256 is recorded in src/data/placeholder-images.json.
// The site uses it (isPlaceholderImage in src/lib/images.ts) to show a designed
// fallback instead of a grey placeholder. Replacing a file with a real image
// changes its hash, so the real image is used automatically.
//
// Uses sharp, which is already installed as a dependency of Next.js.

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { industries } from "../src/data/industries.ts";

const IMAGES_DIR = path.join(import.meta.dirname, "..", "public", "images");
const IMAGE_EXTENSIONS = [".webp", ".avif", ".png", ".jpg", ".jpeg"];
const MANIFEST_PATH = path.join(import.meta.dirname, "..", "src", "data", "placeholder-images.json");
const manifestOnly = process.argv.includes("--manifest");
const sha256 = (buf) => crypto.createHash("sha256").update(buf).digest("hex");

/** Same lookup as src/lib/images.ts: any supported extension counts as existing. */
function hasImage(folder, slug) {
  return IMAGE_EXTENSIONS.some((ext) =>
    fs.existsSync(path.join(IMAGES_DIR, folder, `${slug}${ext}`)),
  );
}

// Blog cover placeholders: one per post found in src/content/blog, named after
// the post's slug (its filename). A 5th post needs no change here.
const BLOG_CONTENT_DIR = path.join(import.meta.dirname, "..", "src", "content", "blog");
const blogTargets = (fs.existsSync(BLOG_CONTENT_DIR) ? fs.readdirSync(BLOG_CONTENT_DIR) : [])
  .filter((file) => file.endsWith(".mdx"))
  .map((file) => file.replace(/\.mdx$/, ""))
  .map((slug) => ({
    file: `blog/${slug}.jpg`,
    width: 1200,
    height: 630,
    label: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  }));

// No product placeholders: every series and accessory has a real photo in
// public/images/products (variants without their own fall back to the series
// photo), so none are generated here and a deleted photo is never replaced by
// a placeholder.

const targets = [
  { file: "logo/prithvi-data-loggers-logo.png", width: 512, height: 128, label: "Prithvi Data Loggers", variant: "logo" },
  { file: "hero/home-hero.jpg", width: 1920, height: 1080, label: "Home Hero" },
  { file: "og/og-default.jpg", width: 1200, height: 630, label: "Prithvi Data Loggers" },
  { file: "founder/founder.jpg", width: 800, height: 1000, label: "Founder" },
  // NABL accreditation IS the ISO/IEC 17025 certificate: two documents, not three.
  { file: "certificates/nabl-certificate.jpg", width: 1240, height: 1754, label: "NABL Accreditation" },
  { file: "certificates/iso-9001-certificate.jpg", width: 1240, height: 1754, label: "ISO 9001:2015" },
  // No client placeholders: real logos live in public/images/clients (see src/data/clients.ts).
  ...industries.map((industry) => ({
    file: `industries/${industry.slug}.jpg`,
    width: 1200,
    height: 800,
    label: industry.name,
  })),
  ...blogTargets,
];

function escapeXml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function placeholderSvg({ width, height, label, file, variant }) {
  const isLogo = variant === "logo";
  const textColor = isLogo ? "#1f2937" : "#475569";
  const background = isLogo ? "none" : "#e2e8f0";
  const size = Math.round(Math.min(width / 14, height / 6));
  const caption = `PLACEHOLDER · ${path.basename(file)} · ${width}×${height}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect width="100%" height="100%" fill="${background}"/>
  ${isLogo ? "" : `<rect x="8" y="8" width="${width - 16}" height="${height - 16}" fill="none" stroke="#94a3b8" stroke-width="4" stroke-dasharray="16 12"/>`}
  <text x="50%" y="${isLogo ? "50%" : "46%"}" dominant-baseline="middle" text-anchor="middle"
    font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="${size}" fill="${textColor}">${escapeXml(label)}</text>
  ${isLogo ? "" : `<text x="50%" y="${height / 2 + size}" dominant-baseline="middle" text-anchor="middle"
    font-family="Arial, Helvetica, sans-serif" font-size="${Math.max(12, Math.round(size / 2.5))}" fill="#64748b">${escapeXml(caption)}</text>`}
</svg>`;
}

async function encode(target) {
  const image = sharp(Buffer.from(placeholderSvg(target)));
  const encoded = target.file.endsWith(".png")
    ? image.png()
    : image.flatten({ background: "#ffffff" }).jpeg({ quality: 80 });
  return encoded.toBuffer();
}

// Public path ("/images/…") → SHA-256 of the placeholder bytes.
const manifest = fs.existsSync(MANIFEST_PATH) ? JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8")) : {};

if (manifestOnly) {
  // Fingerprint files that are still byte-identical to the generated placeholder.
  for (const target of targets) {
    const filePath = path.join(IMAGES_DIR, target.file);
    if (!fs.existsSync(filePath)) continue;
    const expected = sha256(await encode(target));
    if (sha256(fs.readFileSync(filePath)) === expected) manifest[`/images/${target.file}`] = expected;
  }
  writeManifest();
  console.log(`manifest: ${Object.keys(manifest).length} placeholder(s) recorded`);
  process.exit(0);
}

function writeManifest() {
  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(sorted, null, 2)}
`);
}

let created = 0;
let skipped = 0;

for (const target of targets) {
  const outPath = path.join(IMAGES_DIR, target.file);
  const { dir, name } = path.parse(target.file);
  // A real image in any format (e.g. founder.png for founder.jpg) counts as existing.
  if (hasImage(dir, name)) {
    console.log(`skip    ${target.file} (exists)`);
    skipped++;
    continue;
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const buffer = await encode(target);
  // "wx" fails instead of overwriting if the file appeared in the meantime.
  fs.writeFileSync(outPath, buffer, { flag: "wx" });
  manifest[`/images/${target.file}`] = sha256(buffer);
  console.log(`create  ${target.file} (${target.width}x${target.height})`);
  created++;
}

writeManifest();
console.log(`\n${created} created, ${skipped} skipped`);
