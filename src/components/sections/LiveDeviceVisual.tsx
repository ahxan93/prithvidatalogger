import Image from "next/image";
import type { ReactNode } from "react";
import LiveReadingTicker from "@/components/sections/LiveReadingTicker";
import type { HeroDevice, ReadingSpec } from "@/data/page-heroes";
import { formatRh, formatTemp, INITIAL_WALK, WALK_SIZE } from "@/lib/live-reading";
import { cn } from "@/lib/cn";

// Decorative, illustrative readings drawn over a real logger photo. The digits
// are rendered here (on the server) from a fixed starting point, each marked
// with data-live; <LiveReadingTicker> then moves them within a safe band. The
// whole overlay is aria-hidden: it adds nothing a screen reader needs.

type Value = { text: string; live: string };

/** Values for a reading, in display order, each tagged with its walk index. */
function readingValues(spec: ReadingSpec, offset: number): Value[] {
  const idx = (i: number) => (offset + i) % WALK_SIZE;
  if (spec.layout === "pairs") {
    return Array.from({ length: spec.temps ?? 4 }).flatMap((_, i) => [
      { text: formatTemp(INITIAL_WALK[idx(i)]), live: `t:${idx(i)}` },
      { text: formatRh(INITIAL_WALK[idx(i + 11)]), live: `h:${idx(i + 11)}` },
    ]);
  }
  return Array.from({ length: spec.temps ?? 1 }).map((_, i) => ({
    text: formatTemp(INITIAL_WALK[idx(i)]),
    live: `t:${idx(i)}`,
  }));
}

function ScreenOverlay({ device, offset }: { device: HeroDevice; offset: number }) {
  const { screen, reading, width, height } = device;
  if (!screen || !reading) return null;

  const lcd = reading.style === "lcd";
  // Height of the screen expressed in container-width units, so type scales with it.
  const hCqw = (screen.height / screen.width) * (height / width) * 100;
  const values = readingValues(reading, offset);
  const base = lcd ? "bg-slate-300 text-slate-900" : "bg-black text-cyan-300";

  let body: ReactNode;
  if (reading.layout === "text") {
    const lines = reading.lines ?? [];
    const fs = Math.min(9, hCqw / (lines.length * 1.35));
    body = (
      <div className="flex h-full flex-col justify-center px-[6%]" style={{ fontSize: `${fs}cqw`, lineHeight: 1.3 }}>
        {lines.map((line) => (
          <span key={line} className="whitespace-nowrap">
            {line}
          </span>
        ))}
      </div>
    );
  } else if (reading.layout === "single") {
    const headerW = reading.header ? 0.55 : 0;
    const tempW = 1.7;
    const humW = reading.humidity ? 0.8 : 0;
    const u = Math.min(10, hCqw / (headerW + tempW + humW) / 1.25);
    const rhIndex = (offset + 11) % WALK_SIZE;
    body = (
      <div className="flex h-full flex-col justify-center px-[7%] tabular-nums leading-none" style={{ gap: `${u * 0.18}cqw` }}>
        {reading.header && (
          <div className="flex items-center gap-[3%]" style={{ fontSize: `${u * headerW}cqw` }}>
            <span className="inline-block rounded-full bg-live-green" style={{ width: `${u * 0.4}cqw`, height: `${u * 0.4}cqw` }} />
            <span>{reading.badge ?? "ONLINE"}</span>
          </div>
        )}
        {!reading.header && reading.badge && (
          <div className="font-semibold" style={{ fontSize: `${u * 0.6}cqw` }}>
            {reading.badge}
          </div>
        )}
        <div className="font-semibold" style={{ fontSize: `${u * tempW}cqw` }}>
          <span data-live={values[0].live}>{values[0].text}</span>
          <span className="font-normal" style={{ fontSize: "0.5em" }}>
            {" "}
            °C
          </span>
        </div>
        {reading.humidity && (
          <div style={{ fontSize: `${u * humW}cqw` }}>
            <span data-live={`h:${rhIndex}`}>{formatRh(INITIAL_WALK[rhIndex])}</span> %RH
          </div>
        )}
      </div>
    );
  } else {
    // grid / pairs: values laid out in columns
    const cols = reading.layout === "pairs" ? 2 : (reading.cols ?? 1);
    const rows = Math.ceil(values.length / cols);
    const byWidth = 100 / cols / 3.8;
    const byHeight = hCqw / rows / 1.3;
    const fs = Math.min(byWidth, byHeight, 12);
    body = (
      <div
        className="grid h-full content-center px-[4%] tabular-nums leading-none"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, fontSize: `${fs}cqw`, rowGap: `${fs * 0.25}cqw` }}
      >
        {values.map((v, i) => (
          <span key={i} data-live={v.live}>
            {v.text}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn("@container absolute overflow-hidden font-mono", base)}
      style={{
        left: `${screen.left}%`,
        top: `${screen.top}%`,
        width: `${screen.width}%`,
        height: `${screen.height}%`,
        borderRadius: "4%",
      }}
    >
      {body}
    </div>
  );
}

type DeviceImageProps = {
  device: HeroDevice;
  /** Offsets the random walk so neighbouring devices don't move in lockstep. */
  offset?: number;
  /** Width / height of the frame the photo sits in. */
  frameRatio: number;
  sizes: string;
  alt?: string;
  eager?: boolean;
  hidden?: boolean;
  /** Photo only: no illustrative reading on the screen. */
  plain?: boolean;
  className?: string;
};

/**
 * A logger photo fitted inside its frame without cropping (object-contain
 * behaviour, with padding), with the illustrative reading on its screen. The
 * overlay is positioned against the photo's own box, so it stays on the
 * display at any size. Put a <LiveReadingTicker /> in an ancestor element to
 * make the digits move.
 */
export function DeviceImage({ device, offset = 0, frameRatio, sizes, alt, eager, hidden, plain, className }: DeviceImageProps) {
  const ratio = device.width / device.height;
  const fitWidth = ratio >= frameRatio;

  return (
    <div className={cn("absolute inset-0 flex items-center justify-center p-3 sm:p-5", hidden && "hidden", className)}>
      <div
        className="relative"
        style={{
          aspectRatio: ratio,
          width: fitWidth ? "100%" : "auto",
          height: fitWidth ? "auto" : "100%",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      >
        <Image
          src={device.src}
          alt={alt ?? device.alt}
          fill
          sizes={sizes}
          // Only the first image on a page is high priority; the rest are lazy.
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          className="object-contain"
        />
        {/* Hidden gallery variants skip their overlay; it renders when they are shown. */}
        {!hidden && !plain && <ScreenOverlay device={device} offset={offset} />}
      </div>
    </div>
  );
}

type LiveDeviceVisualProps = {
  devices: HeroDevice[];
  className?: string;
  /** Short place chip over the frame, e.g. "Mumbai · Maharashtra". */
  badge?: string;
  /** Put before each photo's description so alt text is specific to the page. */
  altPrefix?: string;
  /** Photo only: no illustrative reading, ticker or caption (pages where the overlay never appeared). */
  plain?: boolean;
};

// A lineup of 1-4 loggers in a glass frame. One image per page is eager.
export default function LiveDeviceVisual({ devices, className, badge, altPrefix, plain }: LiveDeviceVisualProps) {
  const count = devices.length;
  const cols = count === 1 ? 1 : 2;

  return (
    <figure className={cn("relative mx-auto w-full max-w-xl lg:max-w-none", className)}>
      {!plain && <LiveReadingTicker />}
      <div aria-hidden="true" className="glow-brand pointer-events-none absolute -inset-10 -z-10 opacity-30" />
      <div className="relative rounded-[2rem] bg-white/5 p-2 shadow-glow ring-1 ring-white/15">
        {badge && (
          <p className="absolute top-5 left-5 z-10 rounded-full bg-navy-950/85 px-3 py-1 text-xs font-semibold text-white shadow-soft sm:top-6 sm:left-6 sm:text-sm">
            {badge}
          </p>
        )}
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {devices.map((device, i) => {
            const wide = count === 3 && i === 2;
            const frameRatio = wide ? 8 / 3 : count === 2 ? 1 : 4 / 3;
            return (
              <div
                key={device.src}
                className={cn(
                  "relative overflow-hidden rounded-[1.4rem] bg-gradient-to-b from-surface to-white",
                  wide && "col-span-2",
                )}
                style={{ aspectRatio: frameRatio }}
              >
                <DeviceImage
                  device={device}
                  offset={i * 7}
                  alt={altPrefix ? `${altPrefix}: ${device.alt}` : undefined}
                  frameRatio={frameRatio}
                  sizes={count === 1 ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1024px) 280px, 50vw"}
                  eager={i === 0}
                  plain={plain}
                />
              </div>
            );
          })}
        </div>
      </div>
      {!plain && (
        <figcaption aria-hidden="true" className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-300">
          <span className="size-1.5 rounded-full bg-live-green" />
          Illustrative live reading
        </figcaption>
      )}
    </figure>
  );
}
