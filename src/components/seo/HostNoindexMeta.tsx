"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";

const PRODUCTION_HOST = new URL(siteConfig.url).hostname;

/**
 * Belt-and-braces alongside proxy.ts's X-Robots-Tag header: while the site is
 * reachable on any host that isn't the production domain (chiefly the Vercel
 * preview URL before the custom domain is connected), add an actual
 * <meta name="robots" content="noindex"> tag too. Every page here is
 * statically prerendered, so this can't be done at render time without
 * forcing the whole site dynamic — the header already reliably covers
 * non-JS crawlers; this covers JS-executing ones that also read the DOM.
 * Renders nothing and is a no-op on the real production domain.
 */
export default function HostNoindexMeta() {
  useEffect(() => {
    if (window.location.hostname === PRODUCTION_HOST) return;
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return null;
}
