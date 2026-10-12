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
  /**
   * Optional real photo shown beside the text in its own 3:2 frame (never
   * cropped: the frame matches the source photos' exact aspect ratio). Never
   * overlaid behind the text, so there's no readability/contrast to manage.
   */
  image?: string;
  imageAlt?: string;
};

// Dark hero for inner pages: breadcrumbs, H1, intro.
export default function PageHero({ crumbs, title, eyebrow, intro, children, image, imageAlt }: PageHeroProps) {
  return (
    <Section tone="dark" hero className="overflow-hidden pb-14 sm:pb-16 lg:pb-20">
      <div aria-hidden="true" className="glow-brand pointer-events-none absolute -top-72 -right-56 size-[52rem] opacity-45" />
      <div aria-hidden="true" className="glow-violet pointer-events-none absolute -bottom-80 -left-64 size-[40rem] opacity-20" />
      <div className={cn("relative", image && "grid items-center gap-10 lg:grid-cols-2 lg:gap-14")}>
        <div>
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
        {image && (
          <div className="relative order-first aspect-[3/2] overflow-hidden rounded-2xl shadow-soft-lg lg:order-none">
            <Image src={image} alt={imageAlt ?? ""} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        )}
      </div>
    </Section>
  );
}
