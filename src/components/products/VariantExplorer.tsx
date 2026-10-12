"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import GetSolutionButton from "@/components/products/GetSolutionButton";
import ImageFallback from "@/components/ui/ImageFallback";
import { cn } from "@/lib/cn";

export type ExplorerVariant = {
  slug: string;
  name: string;
  specs: { label: string; value: string }[];
  /** Accessories: what it does. */
  description?: string;
  /** Undefined while the image is still a generated placeholder. */
  image?: { src: string; alt: string; width?: number; height?: number };
};

type VariantExplorerProps = {
  seriesName: string;
  channels?: number;
  variants: ExplorerVariant[];
  /** H1 and intro (server-rendered). */
  children: ReactNode;
  /** CTAs under the variant details. */
  actions: ReactNode;
};

// Series hero: gallery + variant tabs. Every panel is in the HTML (inactive
// ones are `hidden`), so all specs are crawlable without JavaScript.
export default function VariantExplorer({ seriesName, channels, variants, children, actions }: VariantExplorerProps) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = variants[active];
  // Shape the frame to the photo (portrait or landscape) so nothing is cropped,
  // within sensible limits; 4:3 when the size is unknown.
  const { width, height } = current.image ?? {};
  const ratio = width && height ? Math.min(1.6, Math.max(0.8, width / height)) : 4 / 3;
  const distinctImages = new Set(variants.map((v) => v.image?.src ?? "fallback")).size;

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = variants.length - 1;
    const next =
      e.key === "ArrowRight" ? (active === last ? 0 : active + 1)
      : e.key === "ArrowLeft" ? (active === 0 ? last : active - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div data-avoid-floating className="grid gap-x-12 gap-y-8 lg:grid-cols-2 lg:grid-rows-[auto_1fr] xl:gap-x-16">
      <div className="lg:col-start-2 lg:row-start-1">{children}</div>

      {/* Gallery */}
      <div className="lg:col-start-1 lg:row-span-2 lg:row-start-1">
        <div
          className="relative mx-auto rounded-[1.75rem] bg-white/5 p-2 shadow-glow ring-1 ring-white/15"
          // Portrait photos get a narrower frame so the hero doesn't grow too tall.
          style={{ maxWidth: ratio < 1 ? "26rem" : undefined }}
        >
          <div className="relative mx-auto overflow-hidden rounded-[1.4rem] bg-slate-100" style={{ aspectRatio: ratio }}>
            {variants.map((variant, i) =>
              variant.image ? (
                <Image
                  key={variant.slug}
                  src={variant.image.src}
                  alt={variant.image.alt}
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  // Only the first variant's image is needed for the initial view.
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  className={cn("object-cover", i !== active && "hidden")}
                />
              ) : (
                i === active && <ImageFallback key={variant.slug} tone="light" label={variant.name} channels={channels} />
              ),
            )}
          </div>
        </div>

        {distinctImages > 1 && (
          <ul className="mt-4 flex gap-3" aria-label={`${seriesName} images`}>
            {variants.map((variant, i) => (
              <li key={variant.slug}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show ${variant.name}`}
                  aria-pressed={i === active}
                  className={cn(
                    "relative block size-16 overflow-hidden rounded-xl bg-slate-100 ring-2 transition sm:size-20",
                    i === active ? "ring-cyan-400" : "ring-white/15 hover:ring-white/50",
                  )}
                >
                  {variant.image ? (
                    <Image src={variant.image.src} alt="" fill sizes="80px" className="object-cover" />
                  ) : (
                    <ImageFallback tone="light" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Variant tabs + details */}
      <div className="lg:col-start-2 lg:row-start-2">
        <div
          role="tablist"
          aria-label={`${seriesName} variants`}
          onKeyDown={onKeyDown}
          className="flex flex-wrap gap-2"
        >
          {variants.map((variant, i) => (
            <button
              key={variant.slug}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400",
                i === active
                  ? "border-white bg-white text-navy-950"
                  : "border-white/25 text-white hover:border-white/60 hover:bg-white/10",
              )}
            >
              {variant.name}
            </button>
          ))}
        </div>

        {variants.map((variant, i) => (
          <div
            key={variant.slug}
            role="tabpanel"
            id={`${baseId}-panel-${i}`}
            aria-labelledby={`${baseId}-tab-${i}`}
            hidden={i !== active}
            tabIndex={0}
            className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
          >
            <GetSolutionButton href="#enquiry" whatsappProduct={variant.name} size="lg" />
            {variant.description && (
              <p className="mt-3 leading-relaxed text-slate-300">{variant.description}</p>
            )}
            <dl className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {variant.specs.map((spec) => (
                <div key={spec.label}>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-cyan-400">{spec.label}</dt>
                  <dd className="mt-1 text-sm text-slate-100">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}

        <p className="sr-only" aria-live="polite">
          Showing {current.name}
        </p>

        <div className="mt-7">{actions}</div>
      </div>
    </div>
  );
}
