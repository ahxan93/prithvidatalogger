import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeTone = "brand" | "violet" | "cyan" | "green" | "neutral";

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  /** Show a "live" status dot before the label. */
  dot?: boolean;
  className?: string;
};

// Light-background tones; each also has a dark-section variant.
const tones: Record<BadgeTone, string> = {
  brand:
    "bg-brand-50 text-brand-700 ring-brand-200 group-data-[tone=dark]/section:bg-brand-400/15 group-data-[tone=dark]/section:text-brand-200 group-data-[tone=dark]/section:ring-brand-400/30",
  violet:
    "bg-violet-50 text-violet-700 ring-violet-200 group-data-[tone=dark]/section:bg-violet-500/15 group-data-[tone=dark]/section:text-violet-200 group-data-[tone=dark]/section:ring-violet-400/30",
  cyan:
    "bg-cyan-50 text-cyan-800 ring-cyan-200 group-data-[tone=dark]/section:bg-cyan-400/10 group-data-[tone=dark]/section:text-cyan-300 group-data-[tone=dark]/section:ring-cyan-400/30",
  green:
    "bg-green-50 text-green-800 ring-green-200 group-data-[tone=dark]/section:bg-live-green/10 group-data-[tone=dark]/section:text-green-300 group-data-[tone=dark]/section:ring-live-green/30",
  neutral:
    "bg-slate-100 text-slate-700 ring-slate-200 group-data-[tone=dark]/section:bg-white/10 group-data-[tone=dark]/section:text-slate-200 group-data-[tone=dark]/section:ring-white/15",
};

const dotColor: Record<BadgeTone, string> = {
  brand: "bg-brand-500",
  violet: "bg-violet-500",
  cyan: "bg-cyan-400",
  green: "bg-live-green",
  neutral: "bg-slate-400",
};

export default function Badge({ children, tone = "brand", dot = false, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {dot && (
        <span className="relative flex size-2" aria-hidden="true">
          <span
            className={cn(
              "absolute inline-flex size-full rounded-full opacity-60 motion-safe:animate-ping",
              dotColor[tone],
            )}
          />
          <span className={cn("relative inline-flex size-2 rounded-full", dotColor[tone])} />
        </span>
      )}
      {children}
    </span>
  );
}
