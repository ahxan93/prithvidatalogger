import type { CSSProperties } from "react";
import { getImageProps } from "next/image";
import { clientLogoAlt, clients, type Client } from "@/data/clients";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

// 38 logos × 2 marquee copies = 76 images. Rendering them with <Image> makes the
// browser hydrate 76 client components on load. getImageProps (from next/image)
// gives the same optimised, lazy-loaded markup as plain server-rendered <img>,
// with no JavaScript per image.
function LogoItem({ client }: { client: Client }) {
  const { props } = getImageProps({
    src: client.logo,
    alt: clientLogoAlt(client),
    width: 400,
    height: 200,
    sizes: "192px",
    loading: "lazy",
  });
  return (
    <li className="flex h-20 w-40 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-white px-3 sm:h-24 sm:w-48">
      {/* eslint-disable-next-line @next/next/no-img-element -- props come from next/image's getImageProps */}
      <img
        {...props}
        alt={props.alt ?? ""}
        decoding="async"
        className="h-auto w-full opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
      />
    </li>
  );
}

const pause =
  "group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused]";

export default function ClientsMarquee() {
  const half = Math.ceil(clients.length / 2);
  const rows = [clients.slice(0, half), clients.slice(half)];

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

      {/*
        One set of logos, two layouts (no extra DOM):
        - from 768px: two rows moving in opposite directions, each row its own track;
        - below 768px: ONE row. The row wrappers become display:contents, so all four
          lists sit in a single track, and order arranges them A B A2 B2 (two identical
          halves), which is what makes the loop seamless.
        Duplicates are aria-hidden + inert. Hover/focus pauses. Reduced motion: no
        animation, duplicates hidden, the row scrolls.
      */}
      <div
        className="group/marquee relative mt-12 overflow-hidden motion-reduce:overflow-x-auto"
        style={{ "--marquee-duration": "70s" } as CSSProperties}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-24 motion-reduce:hidden" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-24 motion-reduce:hidden" />
        <div
          className={cn(
            // The single mobile track is twice as long, so it gets twice the time.
            "flex w-max py-2 max-md:[--marquee-duration:140s] max-md:motion-safe:animate-marquee md:block md:w-auto md:space-y-4",
            pause,
          )}
        >
          {rows.map((row, i) => (
            <div
              key={i}
              className={cn(
                "contents md:flex md:w-max",
                i === 0 ? "md:motion-safe:animate-marquee" : "md:motion-safe:animate-marquee-reverse",
                pause,
              )}
            >
              <ul aria-label={i === 0 ? "Client logos" : "More client logos"} className={cn("flex shrink-0 gap-4 pr-4", i === 0 ? "order-1" : "order-2")}>
                {row.map((client) => (
                  <LogoItem key={client.slug} client={client} />
                ))}
              </ul>
              <ul aria-hidden="true" inert className={cn("flex shrink-0 gap-4 pr-4 motion-reduce:hidden", i === 0 ? "order-3" : "order-4")}>
                {row.map((client) => (
                  <LogoItem key={client.slug} client={client} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
