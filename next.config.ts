import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { areas } from "./src/data/areas.ts";
import {
  getAllLocations,
  legacyLocationHref,
  locationFlatSlug,
  locationHref,
  LOCATION_URL_PREFIX,
} from "./src/data/locations.ts";

// Every location page (tree nodes and written areas) used to live at a nested
// /locations/... path. Each old path gets a permanent redirect to its flat URL,
// and so does the old Open Graph image route.
function legacyLocationRedirects() {
  const all = getAllLocations();
  const paths = [
    ...all.map((l) => l.path),
    ...areas.flatMap((area) => {
      const city = all.find((l) => l.node.type === "city" && l.node.slug === area.citySlug);
      return area.page && city ? [[...city.path, area.slug]] : [];
    }),
  ];
  return paths.flatMap((path) => [
    { source: legacyLocationHref(path), destination: locationHref(path), statusCode: 301 as const },
    {
      source: `/og/locations/${path.join("/")}`,
      destination: `/og/locations/${locationFlatSlug(path)}`,
      statusCode: 301 as const,
    },
  ]);
}

// Pages whose parent changed after their nested /locations path was first published. The flat URL is
// unchanged; the old nested path keeps its permanent redirect.
const MOVED_LEGACY_PATHS: { old: string[]; path: string[] }[] = [
  { old: ["uae", "dubai"], path: ["uae", "dubai-emirate", "dubai"] },
];

// Alternative names that people search for. Each one is a permanent redirect to the page that
// carries the current name (Aurangabad was renamed Chhatrapati Sambhajinagar).
const ALIAS_REDIRECTS: { alias: string; path: string[] }[] = [
  { alias: "aurangabad", path: ["india", "maharashtra", "chhatrapati-sambhajinagar"] },
];

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  // Host redirects (www and the old prithvidataloggers.com domain to the apex) live in src/proxy.ts.
  async redirects() {
    return [
      ...legacyLocationRedirects(),
      ...MOVED_LEGACY_PATHS.map(({ old, path }) => ({
        source: legacyLocationHref(old),
        destination: locationHref(path),
        statusCode: 301 as const,
      })),
      ...ALIAS_REDIRECTS.map(({ alias, path }) => ({
        source: `/${LOCATION_URL_PREFIX}${alias}`,
        destination: locationHref(path),
        statusCode: 301 as const,
      })),
      // The internal route behind the rewrite below is never a public URL.
      {
        source: "/data-logger/:slug",
        destination: `/${LOCATION_URL_PREFIX}:slug`,
        statusCode: 301 as const,
      },
    ];
  },

  // /data-logger-{slug} is served by src/app/data-logger/[slug] (Next cannot
  // match a partial dynamic segment in the file system).
  async rewrites() {
    return {
      beforeFiles: [
        { source: `/${LOCATION_URL_PREFIX}:slug`, destination: "/data-logger/:slug" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },

  // Baseline security headers. No CSP: the site embeds Google Maps (iframe)
  // and calls the Web3Forms API from the client, and a hand-rolled CSP is
  // easy to break silently against either. X-Frame-Options covers clickjacking
  // (how the site may be framed by others) without touching what the site embeds.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

// Blog posts live as .mdx files under src/content/blog and are loaded with a
// dynamic import() in src/app/blog/[slug]/page.tsx — they are never page.mdx
// route files, so pageExtensions is left at its default. withMDX() just
// registers the .mdx loader so those imports compile.
const withMDX = createMDX({
  options: {
    // String-based plugin names (not function references) so they can run
    // under Turbopack, which can't pass JS functions to its Rust config.
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
