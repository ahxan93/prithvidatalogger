import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/cn";

type SectionTone = "light" | "dark" | "surface";

type SectionProps = {
  children: ReactNode;
  tone?: SectionTone;
  id?: string;
  className?: string;
  /** Wrap children in <Container>. Default true. */
  contained?: boolean;
  /** Dot-grid texture (dark sections only). Default true for dark. */
  pattern?: boolean;
  /**
   * First section of a page. Not lazily deferred (it's above the fold) and
   * gets extra top padding beyond .site-main's header-height offset, for
   * breathing room under the fixed header.
   */
  hero?: boolean;
  /** Accessible name when the section has no visible heading. */
  "aria-label"?: string;
  "aria-labelledby"?: string;
  /** Marks a numbered section of a playbook location page (read by check:data). */
  "data-city-section"?: string;
};

const toneClasses: Record<SectionTone, string> = {
  light: "bg-white text-ink",
  surface: "bg-surface text-ink",
  dark: "bg-navy-950 text-white",
};

// `group/section` + `data-tone` let children (SectionHeading, Button, Badge)
// adapt their colours to dark sections without extra props.
export default function Section({
  children,
  tone = "light",
  id,
  className,
  contained = true,
  pattern = tone === "dark",
  hero = false,
  ...aria
}: SectionProps) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={cn(
        "group/section relative py-16 sm:py-20 lg:py-24",
        // Light sections after the first defer their rendering until near the viewport.
        // Not on dark sections: accessibility checkers cannot see a deferred dark
        // background and report false contrast failures for the light text on it.
        !hero && tone !== "dark" && "cv-auto",
        // .site-main already reserves header-height padding above every page's
        // first section; this adds breathing room beyond that, under the header.
        hero && "pt-12 sm:pt-16 lg:pt-20",
        toneClasses[tone],
        tone === "dark" && pattern && "bg-dot-grid",
        className,
      )}
      {...aria}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
