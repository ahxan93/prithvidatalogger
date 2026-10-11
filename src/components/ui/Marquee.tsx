import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type MarqueeProps = {
  /** List items (<li>) – rendered twice for a seamless loop. */
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
   * swipeable scroll-snap row (no animation, duplicate hidden). Desktop is unchanged.
   */
  mobile?: "marquee" | "snap";
};

// CSS-only marquee. The second copy is aria-hidden + inert so screen readers and
// keyboard users meet each item once. Hover or focus pauses it. With reduced
// motion there is no animation: the duplicate is hidden and the row scrolls.
// Items in a mobile="snap" row should carry the snap-start class.
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
        <ul aria-hidden="true" inert className={cn("flex shrink-0 motion-reduce:hidden", snap && "max-md:hidden", gapClass)}>
          {children}
        </ul>
      </div>
    </div>
  );
}
