"use client";

import { useSyncExternalStore, type CSSProperties } from "react";
import { getImageProps } from "next/image";
import { clientLogoAlt, clients, type Client } from "@/data/clients";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/cn";

// getImageProps (from next/image) gives the same optimised, lazy-loaded <img>
// markup as <Image>, with no JavaScript per image.
function LogoItem({ client, className }: { client: Client; className?: string }) {
  const { props } = getImageProps({
    src: client.logo,
    alt: clientLogoAlt(client),
    width: 400,
    height: 200,
    sizes: "192px",
    loading: "lazy",
  });
  return (
    <li
      className={cn(
        "flex h-24 w-48 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-white px-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-soft",
        className,
      )}
    >
      {/* Capped by height (not "w-full") so every logo reads at the same visual
          size regardless of its own aspect ratio — a near-square mark and a
          wide wordmark both end up the same height instead of one towering
          over the other. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- props come from next/image's getImageProps */}
      <img
        {...props}
        alt={props.alt ?? ""}
        decoding="async"
        className="h-auto max-h-10 w-auto max-w-full object-contain sm:max-h-12"
      />
    </li>
  );
}

const pause =
  "group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused] group-active/marquee:[animation-play-state:paused]";

// Server-rendered/no-JS count: enough logos to read as a real, credible row
// without shipping all 38 in the initial HTML. Expands to the full roster
// right after hydration, for every visitor (not just capable/desktop ones).
const INITIAL_COUNT = 12;

function subscribeNever() {
  return () => {};
}

/** True once mounted on the client; false on the server and the first client render. */
function useHydrated() {
  return useSyncExternalStore(subscribeNever, () => true, () => false);
}

export default function ClientsMarquee() {
  const half = Math.ceil(clients.length / 2);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  // False on the server and on first paint everywhere, so the initial HTML
  // always ships one real copy of each of the 38 logos, never a duplicated
  // marquee track. After hydration, anyone who hasn't asked for reduced motion
  // gets the animated version (with its single looping duplicate): two rows
  // moving in opposite directions from 768px up, one calm row below that.
  const animated = !reducedMotion;
  const rows = isDesktop ? [clients.slice(0, half), clients.slice(half)] : [clients];
  const duration = isDesktop ? "70s" : "45s";

  const hydrated = useHydrated();
  const visibleClients = hydrated ? clients : clients.slice(0, INITIAL_COUNT);

  return (
    <Section contained={false} aria-labelledby="clients-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="clients-title"
          eyebrow="Our clients"
          title="Trusted by Teams Across Pharma, Logistics & Food"
          subtitle="Pharma companies, cold chain and logistics operators, healthcare brands, hotels and food businesses work with us."
          align="center"
        />
      </div>

      {animated ? (
        // Each row has one JS-added, aria-hidden + inert duplicate so the loop
        // reads as seamless. pb-2 matches the static row, so swapping between
        // them causes no layout shift.
        <div
          className="group/marquee relative mt-12 overflow-hidden pb-2"
          style={{ "--marquee-duration": duration } as CSSProperties}
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-24" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-24" />
          <div className="space-y-4">
            {rows.map((row, i) => (
              <div
                key={i}
                className={cn(
                  "flex w-max will-change-transform",
                  i === 0 ? "motion-safe:animate-marquee" : "motion-safe:animate-marquee-reverse",
                  pause,
                )}
              >
                <ul aria-label={i === 0 ? "Client logos" : "More client logos"} className="flex shrink-0 gap-4 pr-4">
                  {row.map((client) => (
                    <LogoItem key={client.slug} client={client} />
                  ))}
                </ul>
                <ul aria-hidden="true" inert className="flex shrink-0 gap-4 pr-4">
                  {row.map((client) => (
                    <LogoItem key={client.slug} client={client} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Default: one static, swipeable row, no animation. Before hydration
        // (and so in the server-rendered HTML) only INITIAL_COUNT logos ship;
        // the rest appear the moment React mounts, for every visitor.
        <ul
          aria-label="Client logos"
          className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-8"
        >
          {visibleClients.map((client) => (
            <LogoItem key={client.slug} client={client} className="snap-start" />
          ))}
        </ul>
      )}
    </Section>
  );
}
