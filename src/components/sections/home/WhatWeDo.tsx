import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import { getProductBySlug } from "@/data/products";
import { whatWeDo } from "@/data/home";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/icons";
import { homeIcons } from "@/components/sections/home/iconMap";
import { getVariantImage } from "@/lib/images";
import { cn } from "@/lib/cn";

// Cool-to-warm swatches for the mapping card's mini heat-map. Tailwind's
// stock palette (not a brand token): this one visual literally represents
// temperature, not brand colour.
const HEAT_SWATCHES = ["bg-cyan-400", "bg-sky-300", "bg-slate-200", "bg-amber-300", "bg-orange-400"];
// 5x4 grid, arranged so warmth builds toward the bottom-right corner.
const HEAT_VALUES = [
  0.1, 0.2, 0.3, 0.5, 0.6,
  0.2, 0.3, 0.5, 0.6, 0.8,
  0.3, 0.4, 0.6, 0.8, 0.9,
  0.4, 0.5, 0.7, 0.9, 1,
];

function LiveDot() {
  return (
    <span className="relative flex size-2">
      <span className="absolute inline-flex size-full rounded-full bg-live-green opacity-70 motion-safe:animate-ping" />
      <span className="relative inline-flex size-2 rounded-full bg-live-green" />
    </span>
  );
}

/** Static, illustrative trend line — not a real customer's data (brief §1). */
function FeaturedSparkline() {
  const history = [4.6, 4.5, 4.7, 4.8, 4.6, 4.4, 4.3, 4.5, 4.2, 4.3, 4.5, 4.2];
  const w = 160;
  const h = 36;
  const [low, high] = [2, 8];
  const y = (t: number) => h - 4 - ((t - low) / (high - low)) * (h - 8);
  const step = w / (history.length - 1);
  const points = history.map((t, i) => `${(i * step).toFixed(1)},${y(t).toFixed(1)}`);
  const last = history[history.length - 1];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 h-9 w-full max-w-36" aria-hidden="true">
      <path d={`M${points.join(" L")}`} fill="none" stroke="var(--color-cyan-400)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={w} cy={y(last)} r="3" fill="var(--color-cyan-400)" />
      <circle cx={w} cy={y(last)} r="6" fill="var(--color-cyan-400)" opacity="0.25" />
    </svg>
  );
}

/** NABL Calibration: a seal graphic with a real HTML text label, not baked into the image. */
function NablSeal() {
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 64 64" className="size-14 shrink-0" aria-hidden="true">
        <circle cx="32" cy="32" r="27" fill="none" stroke="var(--color-brand-200)" strokeWidth="2" strokeDasharray="3.5 3.5" />
        <circle cx="32" cy="32" r="20" fill="url(#nabl-seal-fill)" />
        <path d="M22.5 32.5l6.5 6.5 12.5-14" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="nabl-seal-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-brand-600)" />
            <stop offset="100%" stopColor="var(--color-brand-400)" />
          </linearGradient>
        </defs>
      </svg>
      <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-brand-700 ring-1 ring-inset ring-brand-100">
        ISO/IEC 17025:2017
      </span>
    </div>
  );
}

/** Temperature Mapping: a mini cool-to-warm heat-map. */
function MappingHeatmap() {
  return (
    <div className="grid grid-cols-5 gap-1">
      {HEAT_VALUES.map((v, i) => (
        <span key={i} aria-hidden="true" className={cn("size-2.5 rounded-[3px]", HEAT_SWATCHES[Math.round(v * 4)])} />
      ))}
    </div>
  );
}

/** Validation: three connected step chips, IQ -> OQ -> PQ. */
function ValidationSteps() {
  return (
    <div className="flex items-center" aria-hidden="true">
      {["IQ", "OQ", "PQ"].map((step, i) => (
        <span key={step} className="flex items-center">
          <span className="flex size-8 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700 ring-1 ring-inset ring-brand-100">
            {step}
          </span>
          {i < 2 && <ArrowRightIcon className="mx-1 size-3 text-slate-300" />}
        </span>
      ))}
    </div>
  );
}

/** Installation & Support: a tiny 3-step timeline. */
function SupportTimeline() {
  const steps = ["Setup", "Alerts", "Users"];
  return (
    <div className="flex items-start" aria-hidden="true">
      {steps.map((step, i) => (
        <div key={step} className="flex items-start">
          <div className="flex flex-col items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-brand-500" />
            <span className="text-[10px] font-medium text-muted">{step}</span>
          </div>
          {i < steps.length - 1 && <span className="mx-1.5 mt-[5px] h-px w-6 shrink-0 bg-slate-200 sm:w-8" />}
        </div>
      ))}
    </div>
  );
}

const visualByIcon: Partial<Record<string, ComponentType>> = {
  "badge-check": NablSeal,
  map: MappingHeatmap,
  "shield-check": ValidationSteps,
  wrench: SupportTimeline,
};

export default async function WhatWeDo() {
  const nakshatra = getProductBySlug("nakshatra");
  const image = nakshatra ? await getVariantImage(nakshatra, nakshatra.variants[0]) : undefined;
  const featured = whatWeDo[0];
  const rest = whatWeDo.slice(1);
  const FeaturedIcon = homeIcons[featured.icon];

  return (
    <Section aria-labelledby="what-we-do-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-dot-grid-light pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="glow-brand pointer-events-none absolute -top-48 -left-48 size-[36rem] opacity-10" />
      <div aria-hidden="true" className="glow-cyan pointer-events-none absolute -right-48 -bottom-48 size-[32rem] opacity-10" />

      <div className="relative">
        <SectionHeading
          id="what-we-do-title"
          eyebrow="What we do"
          title="More Than a WiFi Temperature and Humidity Data Logger"
          subtitle="Monitoring hardware, NABL calibration, temperature mapping, validation and support, from one team."
          align="center"
        />

        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:mt-14 lg:grid-cols-4 lg:grid-rows-2 lg:gap-5">
          {/* Featured: Real-Time Monitoring Data Loggers */}
          <li className="md:col-span-2 lg:col-span-2 lg:row-span-2">
            <div className="group relative h-full rounded-2xl">
              <div
                aria-hidden="true"
                className="absolute -inset-px rounded-2xl bg-gradient-to-br from-brand-400 to-cyan-400 opacity-0 transition-opacity duration-300 motion-safe:group-hover:opacity-100"
              />
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-navy-950 to-brand-700 p-6 text-white shadow-soft transition duration-300 motion-safe:group-hover:-translate-y-1 sm:p-8">
                <span className="flex size-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 transition-transform duration-300 motion-safe:group-hover:scale-105">
                  <FeaturedIcon className="size-6 text-cyan-300" />
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold text-balance sm:text-2xl">
                  <Link href={featured.href ?? "/"} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
                    {featured.title}
                  </Link>
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-300 sm:text-base">{featured.description}</p>

                <div className="mt-6 flex flex-1 flex-col items-start justify-end gap-6 sm:flex-row sm:items-end sm:justify-between">
                  <div className="w-full max-w-36">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium ring-1 ring-white/15">
                      <LiveDot />
                      4.2 °C · 46 %RH
                    </div>
                    <FeaturedSparkline />
                  </div>
                  {image && (
                    <div className="relative mx-auto h-28 w-24 shrink-0 sm:mx-0 sm:h-32 sm:w-28">
                      <Image
                        src={image.src}
                        alt="Nakshatra WiFi temperature and humidity data logger"
                        fill
                        sizes="140px"
                        className="object-contain drop-shadow-xl"
                      />
                    </div>
                  )}
                </div>

                <span aria-hidden="true" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">
                  Learn more
                  <ArrowRightIcon className="size-4 transition-transform motion-safe:group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </li>

          {/* The other 4: each with its own small built-in visual. */}
          {rest.map((item) => {
            const Visual = visualByIcon[item.icon];
            return (
              <li key={item.title}>
                <div className="group relative h-full rounded-2xl">
                  <div
                    aria-hidden="true"
                    className="absolute -inset-px rounded-2xl bg-gradient-to-br from-brand-400 to-cyan-400 opacity-0 transition-opacity duration-300 motion-safe:group-hover:opacity-100"
                  />
                  <div className="relative flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft transition duration-300 motion-safe:group-hover:-translate-y-1">
                    <div className="transition-transform duration-300 motion-safe:group-hover:scale-105">
                      {Visual ? <Visual /> : null}
                    </div>
                    <h3 className="mt-5 font-heading text-lg font-semibold text-balance text-ink">
                      {/* Whole card is clickable via the stretched link. */}
                      <Link href={item.href ?? "/"} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
                        {item.title}
                      </Link>
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>
                    <span aria-hidden="true" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                      Learn more
                      <ArrowRightIcon className="size-4 transition-transform motion-safe:group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
