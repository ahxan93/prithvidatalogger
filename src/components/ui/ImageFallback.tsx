import { cn } from "@/lib/cn";

type ImageFallbackProps = {
  /** Varies the glow positions so neighbouring cards don't look identical. */
  seed?: number;
  tone?: "dark" | "light";
  /** Light tone only: one dot per measurement channel. */
  channels?: number;
  /** Light tone only: large watermark text, e.g. the series name. */
  label?: string;
  className?: string;
};

// Decorative stand-in shown while an image is still a generated placeholder
// (see isPlaceholderImage). Purely visual, so it is hidden from assistive tech.
const glowPositions = [
  ["top-[-30%] left-[-20%]", "bottom-[-35%] right-[-15%]"],
  ["top-[-25%] right-[-25%]", "bottom-[-30%] left-[-10%]"],
  ["top-[10%] left-[-35%]", "bottom-[-40%] right-[5%]"],
  ["top-[-40%] left-[20%]", "bottom-[-25%] left-[-20%]"],
];
const glowColours = [
  ["glow-brand opacity-80", "glow-cyan opacity-40"],
  ["glow-violet opacity-65", "glow-brand opacity-60"],
  ["glow-cyan opacity-45", "glow-violet opacity-50"],
  ["glow-brand opacity-90", "glow-cyan opacity-35"],
];

export default function ImageFallback({ seed = 0, tone = "dark", channels, label, className }: ImageFallbackProps) {
  const [posA, posB] = glowPositions[seed % glowPositions.length];
  const [colA, colB] = glowColours[seed % glowColours.length];
  const dark = tone === "dark";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden",
        dark ? "bg-navy-900" : "bg-gradient-to-br from-brand-50 via-white to-cyan-50",
        className,
      )}
    >
      <div className={cn("absolute aspect-square w-[130%]", posA, dark ? colA : "glow-soft opacity-90")} />
      <div className={cn("absolute aspect-square w-[110%]", posB, dark ? colB : "glow-cyan opacity-20")} />
      <div className={cn("absolute inset-0", dark ? "bg-dot-grid" : "bg-[radial-gradient(var(--color-brand-200)_1px,transparent_1px)] [background-size:18px_18px] opacity-70")} />
      {/* Concentric "signal" rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={cn("absolute aspect-square w-[70%] rounded-full border", dark ? "border-white/10" : "border-brand-200")} />
        <span className={cn("absolute aspect-square w-[45%] rounded-full border", dark ? "border-white/15" : "border-brand-200")} />
      </div>

      {!dark && label && (
        <span className="absolute inset-x-0 bottom-3 text-center font-heading text-5xl font-bold tracking-tight text-brand-600/10">
          {label}
        </span>
      )}
      {!dark && channels && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${Math.min(channels, 8)}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: channels }, (_, i) => (
              <span key={i} className="size-3 rounded-full bg-brand-600 shadow-[0_0_0_4px_var(--color-brand-100)]" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
