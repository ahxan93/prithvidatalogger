// Internal link audit.
//
//   npm run check:links            build if needed, serve, crawl, report
//   node scripts/check-links.mjs --build      force a fresh build first
//   node scripts/check-links.mjs --no-build   never build (fail if there is no build)
//
// Starts the production server, reads every page in sitemap.xml, follows every
// internal link it finds (header, footer, menus, cards, CTAs, hubs, blog), and
// reports:
//   - links whose target returns 404 (or any non-200)
//   - links that redirect (they should point at the final URL)
//   - #hash links whose id does not exist on the target page
//   - links to localhost or a non-live domain (vercel.app, www.)
//   - trailing-slash and upper-case mismatches
// Exits 1 if anything is reported, so a broken link fails the build.

import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..");
const PORT = Number(process.env.CHECK_LINKS_PORT ?? 3199);
const ORIGIN = `http://localhost:${PORT}`;
const PRODUCTION_HOST = "prithvidataloggers.com";
const args = new Set(process.argv.slice(2));

const hasBuild = fs.existsSync(path.join(ROOT, ".next", "BUILD_ID"));
if (args.has("--build") || (!hasBuild && !args.has("--no-build"))) {
  console.log("links: building the site…");
  const build = spawnSync("npm", ["run", "build"], { cwd: ROOT, stdio: "inherit", shell: true });
  if (build.status !== 0) {
    console.error("links: build failed");
    process.exit(1);
  }
} else if (!hasBuild) {
  console.error("links: no build found (run npm run build first)");
  process.exit(1);
}

const nextBin = path.join(ROOT, "node_modules", "next", "dist", "bin", "next");
const server = spawn(process.execPath, [nextBin, "start", "-p", String(PORT)], { cwd: ROOT, stdio: "ignore" });
const stop = () => {
  try {
    server.kill();
  } catch {
    /* already gone */
  }
};
process.on("exit", stop);
process.on("SIGINT", () => process.exit(130));

async function waitForServer() {
  for (let i = 0; i < 80; i++) {
    try {
      const res = await fetch(`${ORIGIN}/robots.txt`);
      if (res.ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("server did not start");
}

const problems = new Map(); // "type|href" -> { type, href, detail, sources:Set }
function report(type, href, source, detail = "") {
  const key = `${type}|${href}|${detail}`;
  if (!problems.has(key)) problems.set(key, { type, href, detail, sources: new Set() });
  problems.get(key).sources.add(source);
}

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');

const pageCache = new Map(); // pathname -> { status, location, ids:Set, hrefs:string[] }
async function loadPage(pathname) {
  if (pageCache.has(pathname)) return pageCache.get(pathname);
  let entry;
  try {
    const res = await fetch(ORIGIN + pathname, { redirect: "manual", headers: { "user-agent": "check-links" } });
    const type = res.headers.get("content-type") ?? "";
    entry = { status: res.status, location: res.headers.get("location") ?? "", ids: new Set(), hrefs: [] };
    if (res.status === 200 && type.includes("text/html")) {
      const html = await res.text();
      // With Cache Components an unknown dynamic path (e.g. /products/nope) streams
      // the 404 page with a 200 status; treat that as the broken page it is.
      if (/<title>Page Not Found/.test(html) && /name="robots" content="noindex/.test(html)) {
        entry.status = 404;
        entry.soft = true;
        pageCache.set(pathname, entry);
        return entry;
      }
      for (const m of html.matchAll(/\sid="([^"]+)"/g)) entry.ids.add(decode(m[1]));
      for (const m of html.matchAll(/<a\s[^>]*?href="([^"]*)"/g)) entry.hrefs.push(decode(m[1]));
    } else {
      await res.arrayBuffer().catch(() => {});
    }
  } catch (error) {
    entry = { status: 0, location: String(error), ids: new Set(), hrefs: [] };
  }
  pageCache.set(pathname, entry);
  return entry;
}

async function main() {
  await waitForServer();

  const sitemap = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
  const seeds = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  // CHECK_LINKS_EXTRA="/some/path,/other" adds paths to test the checker itself.
  const extra = (process.env.CHECK_LINKS_EXTRA ?? "").split(",").filter(Boolean);
  // Pages that exist but are not in the sitemap (noindex or draft) still need clean links.
  const { getAllLocations, locationHref } = await import("../src/data/locations.ts");
  const { products } = await import("../src/data/products.ts");
  const { industries } = await import("../src/data/industries.ts");
  const { services } = await import("../src/data/services.ts");
  const blogDir = path.join(ROOT, "src", "content", "blog");
  const dataSeeds = [
    ...getAllLocations().map((l) => locationHref(l.path)),
    ...products.map((x) => `/products/${x.slug}`),
    ...industries.map((x) => `/industries/${x.slug}`),
    ...services.map((x) => x.href),
    ...(fs.existsSync(blogDir) ? fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx")).map((f) => `/blog/${f.replace(/.mdx$/, "")}`) : []),
  ];
  const queue = ["/", ...seeds, ...dataSeeds, ...extra];
  const visited = new Set();
  let linksChecked = 0;

  while (queue.length) {
    const pathname = queue.shift();
    if (visited.has(pathname)) continue;
    visited.add(pathname);

    const page = await loadPage(pathname);
    if (page.status !== 200) {
      report("page", pathname, "sitemap.xml or site data", page.soft ? "shows the 404 page (status 200)" : `returns ${page.status}`);
      continue;
    }

    for (const raw of page.hrefs) {
      const href = raw.trim();
      if (!href || /^(mailto:|tel:|javascript:|sms:)/i.test(href)) continue;
      linksChecked++;

      let url;
      try {
        url = new URL(href, ORIGIN + pathname);
      } catch {
        report("malformed", href, pathname);
        continue;
      }

      const isAbsolute = /^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("//");
      if (isAbsolute) {
        const host = url.hostname;
        if (host === "localhost" || host === "127.0.0.1" || host.endsWith(".vercel.app") || host === `www.${PRODUCTION_HOST}`) {
          report("non-live-domain", href, pathname);
          continue;
        }
        if (host !== PRODUCTION_HOST) continue; // genuine external link
        report("absolute-own-domain", href, pathname, "use a relative link");
      } else if (url.origin !== ORIGIN) {
        continue;
      }

      const target = url.pathname;
      const hash = decodeURIComponent(url.hash.slice(1));

      // Hash-only hrefs ("#main") resolve against the current page; only real paths are checked.
      if (!href.startsWith("#")) {
        if (target !== "/" && target.endsWith("/")) report("trailing-slash", href, pathname);
        if (target !== target.toLowerCase()) report("case-mismatch", href, pathname, `expected ${target.toLowerCase()}`);
      }

      const dest = await loadPage(target);
      if (dest.status >= 300 && dest.status < 400) {
        report("redirect", href, pathname, `${dest.status} → ${dest.location}`);
        continue;
      }
      if (dest.status !== 200) {
        report("broken", href, pathname, dest.soft ? "shows the 404 page" : `returns ${dest.status}`);
        continue;
      }
      if (hash && hash !== "top" && !dest.ids.has(hash)) {
        report("missing-anchor", href, pathname, `no #${hash} on ${target}`);
      }
      if (!visited.has(target)) queue.push(target);
    }
  }

  console.log(`links: crawled ${visited.size} pages, checked ${linksChecked} links`);
  if (problems.size === 0) {
    console.log("links: all internal links OK");
    return 0;
  }

  const order = ["broken", "page", "redirect", "missing-anchor", "non-live-domain", "absolute-own-domain", "trailing-slash", "case-mismatch", "malformed"];
  const list = [...problems.values()].sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));
  console.error(`\nlinks: ${list.length} problem(s)`);
  for (const p of list) {
    const from = [...p.sources];
    const shown = from.slice(0, 4).join(", ") + (from.length > 4 ? ` (+${from.length - 4} more)` : "");
    console.error(`  ✗ [${p.type}] ${p.href}${p.detail ? ` — ${p.detail}` : ""}\n      on: ${shown}`);
  }
  return 1;
}

let code = 1;
try {
  code = await main();
} catch (error) {
  console.error("links: crawl failed:", error);
}
stop();
process.exit(code);
