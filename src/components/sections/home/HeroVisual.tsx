"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  BellRingIcon,
  DoorClosedIcon,
  RefreshCwIcon,
  WifiIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type HeroVisualProps = {
  imageSrc: string;
  imageAlt: string;
  chips: { alert: string; door: string; sync: string };
};

// Position of the device's OLED screen inside nakshatra.png (1178 × 1335),
// as percentages, so the live readout sits exactly on the real display.
const SCREEN = { left: "31.6%", top: "19.7%", width: "36.3%", height: "17.4%" };

// Deterministic starting history (server and client render the same markup).
const INITIAL_HISTORY = [4.6, 4.5, 4.7, 4.8, 4.6, 4.4, 4.3, 4.5, 4.6, 4.4, 4.2, 4.3, 4.5, 4.4, 4.2, 4.1, 4.3, 4.4, 4.2, 4.2];
const INITIAL = { temp: 4.2, rh: 46.1, history: INITIAL_HISTORY };
const LOW = 2;
const HIGH = 8;

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true, // server: render the static state
  );
}

/** Gentle mean-reverting random walk, always inside the 2–8 °C band. */
function useLiveReading(enabled: boolean) {
  const [reading, setReading] = useState(INITIAL);

  useEffect(() => {
    if (!enabled) return;
    const id = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      setReading((prev) => {
        const temp = Math.min(7.4, Math.max(2.6, prev.temp + (4.6 - prev.temp) * 0.12 + (Math.random() - 0.5) * 0.3));
        const rh = Math.min(50, Math.max(42, prev.rh + (46 - prev.rh) * 0.1 + (Math.random() - 0.5) * 0.5));
        return { temp, rh, history: [...prev.history.slice(1), temp] };
      });
    }, 2400);
    return () => window.clearInterval(id);
  }, [enabled]);

  return reading;
}

function Sparkline({ history }: { history: number[] }) {
  const w = 200;
  const h = 64;
  const y = (t: number) => h - 6 - ((t - LOW) / (HIGH - LOW)) * (h - 12);
  const step = w / (history.length - 1);
  const points = history.map((t, i) => `${(i * step).toFixed(1)},${y(t).toFixed(1)}`);
  const line = `M${points.join(" L")}`;
  const area = `${line} L${w},${h} L0,${h} Z`;
  const last = history[history.length - 1];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-14 w-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="hero-spark-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--color-cyan-400)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-cyan-400)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* 2 °C and 8 °C limits */}
      <line x1="0" x2={w} y1={y(HIGH)} y2={y(HIGH)} stroke="currentColor" strokeDasharray="3 4" className="text-white/20" />
      <line x1="0" x2={w} y1={y(LOW)} y2={y(LOW)} stroke="currentColor" strokeDasharray="3 4" className="text-white/20" />
      <path d={area} fill="url(#hero-spark-fill)" />
      <path d={line} fill="none" stroke="var(--color-cyan-400)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={w} cy={y(last)} r="3.5" fill="var(--color-cyan-400)" />
      <circle cx={w} cy={y(last)} r="7" fill="var(--color-cyan-400)" opacity="0.25" />
    </svg>
  );
}

const chipBase =
  "absolute z-20 flex items-center gap-2.5 rounded-xl border border-white/15 bg-navy-900/90 px-3 py-2 text-xs font-medium text-white shadow-soft-lg sm:px-3.5 sm:py-2.5 sm:text-sm";

export default function HeroVisual({ imageSrc, imageAlt, chips }: HeroVisualProps) {
  const reducedMotion = useReducedMotion();
  const { temp, rh, history } = useLiveReading(!reducedMotion);
  const tempText = temp.toFixed(1);
  const rhText = rh.toFixed(1);

  return (
    <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-[25rem] lg:max-w-[29rem]">
      {/* Wireless "signal" rings radiating from behind the device */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        {[0, 1.2, 2.4].map((delay) => (
          <span
            key={delay}
            className="absolute aspect-square w-[135%] rounded-full border border-cyan-400/25 opacity-0 motion-safe:animate-signal motion-reduce:opacity-30"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
        <span className="glow-brand absolute aspect-square w-[150%] opacity-60" />
        <span className="glow-cyan absolute aspect-square w-[110%] translate-x-[18%] translate-y-[14%] opacity-25" />
      </div>

      {/* Device photo in a lit frame */}
      <div className="relative rounded-[2rem] bg-white/5 p-2 shadow-glow ring-1 ring-white/15">
        <div className="@container relative aspect-[1178/1335] overflow-hidden rounded-[1.6rem]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            // Priority without a <head> preload: on phones the photo is below the fold
            // and the H1 is the LCP element, so a preload would compete with fonts/CSS.
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1024px) 464px, (min-width: 640px) 400px, 304px"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/45 via-transparent to-navy-950/10" />

          {/* Live OLED readout on the real screen */}
          <div
            aria-hidden="true"
            className="absolute flex flex-col justify-between rounded-[0.6cqw] bg-black px-[2.2cqw] py-[1.7cqw] font-mono text-white"
            style={SCREEN}
          >
            <div className="flex items-center justify-between text-[2.5cqw] leading-none text-slate-200">
              <span className="flex items-center gap-[0.8cqw]">
                <WifiIcon className="size-[3cqw]" />
                Wi-Fi
              </span>
              <span className="flex items-center gap-[0.8cqw]">
                <span className="relative flex size-[1.5cqw]">
                  <span className="absolute inline-flex size-full rounded-full bg-live-green opacity-70 motion-safe:animate-ping" />
                  <span className="relative inline-flex size-[1.5cqw] rounded-full bg-live-green" />
                </span>
                ONLINE
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-[2cqw] tabular-nums leading-none">
              <span key={`t${tempText}`} className="text-[6.3cqw] font-semibold motion-safe:animate-tick">
                {tempText}
                <span className="text-[2.4cqw] font-normal">°C</span>
              </span>
              <span key={`h${rhText}`} className="text-[6.3cqw] font-semibold motion-safe:animate-tick">
                {rhText}
                <span className="text-[2.4cqw] font-normal">%</span>
              </span>
            </div>
            <div className="flex items-center justify-between text-[2.3cqw] leading-none text-slate-300">
              <span>LIMIT 2–8 °C</span>
              <span className="text-live-green">IN RANGE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating glass chips */}
      <div aria-hidden="true">
        <div className={cn(chipBase, "-left-3 top-[9%] sm:-left-12 motion-safe:animate-float")}>
          <span className="flex size-7 items-center justify-center rounded-lg bg-violet-500/25 text-violet-200">
            <BellRingIcon className="size-4" />
          </span>
          {chips.alert}
        </div>
        <div
          className={cn(chipBase, "-right-3 top-[38%] sm:top-[44%] sm:-right-10 motion-safe:animate-float")}
          style={{ animationDelay: "-2s" }}
        >
          <span className="flex size-7 items-center justify-center rounded-lg bg-live-green/20 text-green-300">
            <DoorClosedIcon className="size-4" />
          </span>
          {chips.door}
        </div>
        <div
          className={cn(chipBase, "-left-3 bottom-[26%] sm:bottom-[30%] sm:-left-14 motion-safe:animate-float")}
          style={{ animationDelay: "-4s" }}
        >
          <span className="flex size-7 items-center justify-center rounded-lg bg-cyan-400/20 text-cyan-300">
            <RefreshCwIcon className="size-4" />
          </span>
          {chips.sync}
        </div>

        {/* Live trend card */}
        <div
          className="absolute -right-3 -bottom-24 z-20 w-48 sm:-bottom-8 rounded-2xl border border-white/15 bg-navy-900/95 p-3.5 text-white shadow-soft-lg sm:-right-12 sm:w-60 sm:p-4 motion-safe:animate-float"
          style={{ animationDelay: "-3s" }}
        >
          <div className="flex items-center justify-between text-[11px] font-medium text-slate-300 sm:text-xs">
            <span>Cold room</span>
            <span className="flex items-center gap-1.5 rounded-full bg-live-green/15 px-2 py-0.5 text-[10px] font-semibold text-green-300">
              <span className="size-1.5 rounded-full bg-live-green" />
              ONLINE
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-3 tabular-nums">
            <span className="font-heading text-2xl font-semibold sm:text-3xl">
              {tempText}
              <span className="text-sm font-medium text-slate-300"> °C</span>
            </span>
            <span className="text-sm text-slate-300">{rhText} %RH</span>
          </div>
          <Sparkline history={history} />
        </div>
      </div>
    </div>
  );
}
