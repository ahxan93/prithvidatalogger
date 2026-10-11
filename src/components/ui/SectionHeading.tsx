import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  title: ReactNode;
  eyebrow?: string;
  subtitle?: ReactNode;
  align?: "left" | "center";
  /** Heading level. Use "h1" only for a page's single main heading. */
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
};

export default function SectionHeading({
  title,
  eyebrow,
  subtitle,
  align = "left",
  as: Heading = "h2",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] sm:text-sm text-brand-600 group-data-[tone=dark]/section:text-cyan-400">
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        className={cn(
          "font-heading font-bold text-ink group-data-[tone=dark]/section:text-white",
          Heading === "h1"
            ? "text-4xl sm:text-5xl lg:text-6xl"
            : Heading === "h2"
              ? "text-3xl sm:text-4xl"
              : "text-2xl sm:text-3xl",
        )}
      >
        {title}
      </Heading>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-muted text-pretty group-data-[tone=dark]/section:text-slate-300">
          {subtitle}
        </p>
      )}
    </div>
  );
}
