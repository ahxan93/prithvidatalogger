// Verifies every /images/... path referenced by the built site exists in public/.
// Scans the prerendered output in .next/server/app (HTML, RSC payloads, metadata
// such as og:image and JSON-LD) plus string literals in src/.
//
//   npm run build && npm run check:images

import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..");
const BUILD_DIR = path.join(ROOT, ".next", "server", "app");
const SCAN = [
  { dir: BUILD_DIR, exts: [".html", ".rsc", ".meta", ".body"] },
  { dir: path.join(ROOT, "src"), exts: [".ts", ".tsx"] },
];
const IMAGE_PATH = /\/images\/[\w\-/.]+?\.(?:png|jpe?g|webp|avif|svg|gif)/gi;

if (!fs.existsSync(BUILD_DIR)) {
  console.error("No build output found. Run `npm run build` first.");
  process.exit(1);
}

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

/** image path -> set of files that reference it */
const references = new Map();

for (const { dir, exts } of SCAN) {
  for (const file of walk(dir)) {
    if (!exts.includes(path.extname(file))) continue;
    // next/image URL-encodes src (/_next/image?url=%2Fimages%2F...), so decode first.
    let text = fs.readFileSync(file, "utf8");
    try {
      text = decodeURIComponent(text);
    } catch {
      text = text.replace(/%2F/gi, "/");
    }
    for (const match of text.matchAll(IMAGE_PATH)) {
      const refs = references.get(match[0]) ?? new Set();
      refs.add(path.relative(ROOT, file));
      references.set(match[0], refs);
    }
  }
}

const missing = [...references.keys()]
  .filter((p) => !fs.existsSync(path.join(ROOT, "public", p)))
  .sort();

console.log(`${references.size} unique image paths referenced`);
for (const p of [...references.keys()].sort()) {
  console.log(`  ${missing.includes(p) ? "MISSING" : "ok     "} ${p}`);
}

if (missing.length > 0) {
  console.error(`\n${missing.length} missing image(s):`);
  for (const p of missing) {
    console.error(`  ${p}  <- ${[...references.get(p)].slice(0, 3).join(", ")}`);
  }
  process.exit(1);
}
console.log("\nAll referenced images exist.");
