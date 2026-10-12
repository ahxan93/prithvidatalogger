import Image from "next/image";
import type { ReactNode } from "react";
import Breadcrumbs, { type Crumb } from "@/components/ui/Breadcrumbs";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/cn";

type PageHeroProps = {
  /** Breadcrumb trail after "Home"; the last item is this page. */
  crumbs: Crumb[];
  /** The page's single H1. */
  title: ReactNode;
  eyebrow?: string;
  intro?: ReactNode;
  /** CTAs or other content under the intro. */
  children?: ReactNode;
  /** Optional real photo behind the hero; falls back to the usual dot-grid/glow background when absent. */
  backgroundImage?: string;
  backgroundImageAlt?: string;
};

// Dark hero for inner pages: breadcrumbs, H1, intro. Sets data-hero="dark"
// (via Section) so the header starts transparent with the white logo.
export default function PageHero({
  crumbs,
  title,
  eyebrow,
  intro,
  children,
  backgroundImage,
  backgroundImageAlt,
}: PageHeroProps) {
  return (
    <Section
      tone="dark"
      hero
      pattern={!backgroundImage}
      className={cn(
        "overflow-hidden pb-14 sm:pb-16 lg:pb-20",
        // With a photo, the section itself becomes the flex container so its
        // Container child (and everything in it) is pinned to the bottom —
        // squarely inside the gradient's strong zone — whatever height the
        // breadcrumbs/title/intro add up to.
        backgroundImage && "flex min-h-[26rem] flex-col justify-end sm:min-h-[30rem] lg:min-h-[34rem]",
      )}
    >
      {backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt={backgroundImageAlt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Strong at the bottom, fading to fully transparent toward the top, so the
              title and intro stay readable over the photo without darkening it throughout.
              Covers more than half the hero (not just the bottom half): on narrow
              viewports the bottom-anchored text block itself can be taller than half
              the hero's height, so a 50%-tall gradient would leave its top lines
              sitting directly on the bare photo. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-navy-950 via-navy-950/80 via-55% to-transparent"
          />
        </>
      ) : (
        <>
          <div aria-hidden="true" className="glow-brand pointer-events-none absolute -top-72 -right-56 size-[52rem] opacity-45" />
          <div aria-hidden="true" className="glow-violet pointer-events-none absolute -bottom-80 -left-64 size-[40rem] opacity-20" />
        </>
      )}
      <div className="relative">
        <Breadcrumbs items={crumbs} className="mb-5" />
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] sm:text-sm text-cyan-400">{eyebrow}</p>
        )}
        <h1 className="max-w-4xl font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300 text-pretty">{intro}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </Section>
  );
}
