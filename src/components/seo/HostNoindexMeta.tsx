"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";

const PRODUCTION_HOST = new URL(siteConfig.url).hostname;

/**
 * Belt-and-braces alongside proxy.ts's X-Robots-Tag header: while the site is
 * reachable on any host that isn't the production domain (chiefly the Vercel
 * preview URL before the custom domain is connected), make every robots meta
 * tag say noindex. The live-domain metadata says index,follow, so this
 * replaces that value instead of adding a second, conflicting tag. Every page
 * is statically prerendered, so this can't be decided at render time without
 * forcing the whole site dynamic; the header covers non-JS crawlers.
 * Renders nothing and is a no-op on the real production domain.
 */
export default function HostNoindexMeta() {
  useEffect(() => {
    if (window.location.hostname === PRODUCTION_HOST) return;

    const selector = 'meta[name="robots"], meta[name="googlebot"]';
    let added: HTMLMetaElement | undefined;

    const apply = () => {
      const metas = Array.from(document.querySelectorAll<HTMLMetaElement>(selector)).filter((m) => m !== added);
      metas.forEach((m) => {
        if (m.content !== "noindex, nofollow") m.content = "noindex, nofollow";
      });
      if (metas.length > 0) {
        // Next's own tag exists (React hoists it into <head>): drop ours.
        added?.remove();
        added = undefined;
      } else if (!added) {
        added = document.createElement("meta");
        added.name = "robots";
        added.content = "noindex, nofollow";
        document.head.appendChild(added);
      }
    };

    apply();
    // Page metadata is hoisted into <head> and replaced on navigation.
    const observer = new MutationObserver(apply);
    observer.observe(document.head, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      added?.remove();
    };
  }, []);

  return null;
}
