"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Makes #hash links land on their target.
 *
 * Sections use content-visibility:auto, so sections above a target change
 * height once they render, and a jump measured before that ends up in the
 * wrong place. So while the URL has a hash, that deferral is switched off
 * (class "has-hash", see globals.css) *before* the jump:
 *   - hard loads: an inline script in <head> (see app/layout.tsx);
 *   - in-app links: this component, on click, before the router scrolls.
 * A late re-align corrects any remaining drift. Scroll offset and smoothness
 * come from CSS (scroll-margin-top; scroll-behavior only when reduced motion
 * is not requested), and the re-align stops as soon as the visitor scrolls.
 */
export default function AnchorScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    let timer: number | undefined;
    let interacted = false;

    const hashId = () => decodeURIComponent(window.location.hash.slice(1));

    // `target` is passed for in-app link clicks: the router has not updated
    // location.hash yet at that point.
    const sync = (target?: string) => {
      window.clearTimeout(timer);
      interacted = false;
      const id = target ?? hashId();
      root.classList.toggle("has-hash", Boolean(id));
      if (!id) return;
      // After layout and any smooth scroll have settled, fix residual drift.
      // Checked twice: late-loading content can nudge the page again.
      const align = (attempt: number) => {
        const el = document.getElementById(id);
        if (!el || interacted) return;
        const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
        if (Math.abs(el.getBoundingClientRect().top - margin) > 8) {
          el.scrollIntoView({ block: "start", behavior: "instant" });
        }
        if (attempt < 2) timer = window.setTimeout(() => align(attempt + 1), 800);
      };
      timer = window.setTimeout(() => align(1), 700);
    };

    // next/link updates the URL with pushState, which fires no hashchange
    // event, and navigates immediately: turn the deferral off in the same tick.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!anchor || anchor.origin !== window.location.origin || !anchor.hash) return;
      root.classList.add("has-hash");
      sync(decodeURIComponent(anchor.hash.slice(1)));
    };
    const markInteracted = () => {
      interacted = true;
    };

    const syncFromUrl = () => sync();
    syncFromUrl();
    window.addEventListener("hashchange", syncFromUrl);
    window.addEventListener("popstate", syncFromUrl);
    document.addEventListener("click", onClick, true);
    window.addEventListener("wheel", markInteracted, { passive: true });
    window.addEventListener("touchstart", markInteracted, { passive: true });
    window.addEventListener("keydown", markInteracted);
    return () => {
      window.removeEventListener("hashchange", syncFromUrl);
      window.removeEventListener("popstate", syncFromUrl);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("wheel", markInteracted);
      window.removeEventListener("touchstart", markInteracted);
      window.removeEventListener("keydown", markInteracted);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
