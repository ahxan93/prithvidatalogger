"use client";

import type { CSSProperties, ReactNode } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/cn";

type MarqueeProps = {
  /** List items (<li>) – the real copy; a second copy is added client-side for the loop. */
  children: ReactNode;
  /** Accessible name for the list. */
  label: string;
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
  className?: string;
  /** Gap between items, as a Tailwind gap/padding pair. */
  gapClass?: string;
  /** Section background the row fades into at both edges. */
  fade?: "white" | "surface";
  /**
   * Below 768px: "marquee" keeps the animation; "snap" turns the row into a
   * swipeable scroll-snap row (no animation, no duplicate). Desktop is unchanged.
   */
  mobile?: "marquee" | "snap";
};

// CSS-only marquee, with the second (looping) copy added only after hydration
// and only where it actually animates — so the server-rendered HTML (what a
// crawler or Lighthouse sees) has one real copy of each item, not two. The
// duplicate is aria-hidden + inert so screen readers and keyboard users meet
// each item once. Hover or focus pauses it. With reduced motion there is no
// animation and no duplicate: the row scrolls as a plain list.
export default function Marquee({
  children,
  label,
  duration = 40,
  reverse = false,
  className,
  gapClass = "gap-6 pr-6",
  fade = "white",
  mobile = "marquee",
}: MarqueeProps) {
  const snap = mobile === "snap";
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  // "snap" mode only animates from 768px up, so only needs the loop copy there;
  // "marquee" mode animates at every width, so needs it everywhere once motion is allowed.
  const showDuplicate = !reducedMotion && (!snap || isDesktop);

  // Edge fades are plain gradient overlays: cheaper to paint than a CSS mask
  // over an animating row.
  const fadeFrom = fade === "surface" ? "from-surface" : "from-white";
  const fadeBase = cn(
    "pointer-events-none absolute inset-y-0 z-10 w-10 to-transparent sm:w-24 motion-reduce:hidden",
    snap && "max-md:hidden",
  );

  return (
    <div
      className={cn(
        "group/marquee relative overflow-hidden",
        "motion-reduce:overflow-x-auto",
        snap && "max-md:snap-x max-md:snap-mandatory max-md:scroll-pl-4 max-md:overflow-x-auto max-md:pl-4",
        className,
      )}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      <div aria-hidden="true" className={cn(fadeBase, "left-0 bg-gradient-to-r", fadeFrom)} />
      <div aria-hidden="true" className={cn(fadeBase, "right-0 bg-gradient-to-l", fadeFrom)} />
      <div
        className={cn(
          "flex w-max py-2",
          // Literal class names so the Tailwind scanner sees every variant.
          snap
            ? reverse ? "md:motion-safe:animate-marquee-reverse" : "md:motion-safe:animate-marquee"
            : reverse ? "motion-safe:animate-marquee-reverse" : "motion-safe:animate-marquee",
          "group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused]",
        )}
      >
        <ul aria-label={label} className={cn("flex shrink-0", gapClass)}>
          {children}
        </ul>
        {showDuplicate && (
          <ul aria-hidden="true" inert className={cn("flex shrink-0", gapClass)}>
            {children}
          </ul>
        )}
      </div>
    </div>
  );
}
