"use client";

import { useEffect, useRef } from "react";
import { formatRh, formatTemp, INITIAL_WALK, stepWalk } from "@/lib/live-reading";

/**
 * Brings the server-rendered readings (elements marked data-live="t:3" or
 * "h:14") to life: every 2.4 s, after the page is idle, it rewrites their text.
 * It touches the DOM directly instead of re-rendering React, so there is no
 * hydration of the images or frame, and it does nothing under
 * prefers-reduced-motion. Scoped to its parent element.
 */
export default function LiveReadingTicker() {
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = marker.current?.parentElement;
    if (!root) return;

    let walk = INITIAL_WALK;
    let interval: number | undefined;

    const tick = () => {
      if (document.visibilityState !== "visible") return;
      walk = stepWalk(walk);
      root.querySelectorAll<HTMLElement>("[data-live]").forEach((el) => {
        const [kind, index] = (el.dataset.live ?? "").split(":");
        const w = walk[Number(index)];
        if (w === undefined) return;
        el.textContent = kind === "h" ? formatRh(w) : formatTemp(w);
      });
    };

    // Wait for idle so the ticker never competes with first paint or hydration.
    const start = () => {
      interval = window.setInterval(tick, 2400);
    };
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    const handle = idle ? idle(start) : window.setTimeout(start, 1500);

    return () => {
      if (interval !== undefined) window.clearInterval(interval);
      if (!idle) window.clearTimeout(handle);
    };
  }, []);

  return <span ref={marker} hidden />;
}
