import type { NextConfig } from "next";
import createMDX from "@next/mdx";

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

  // Canonical host is the apex domain (no www).
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.prithvidataloggers.com" }],
        destination: "https://prithvidataloggers.com/:path*",
        permanent: true,
      },
    ];
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
