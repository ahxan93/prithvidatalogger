import { whyPrithvi } from "@/data/home";
import { quoteHref } from "@/data/navigation";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/icons";
import { homeIcons } from "@/components/sections/home/iconMap";

export default function WhyPrithvi() {
  return (
    <Section tone="surface" aria-labelledby="why-title">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
          <SectionHeading
            id="why-title"
            eyebrow="Why Prithvi"
            title="Monitoring Backed by a Calibration Lab"
            subtitle="Prithvi grew out of VEGA Calibrations' calibration and temperature mapping work. You get loggers, calibration and validation from one group that understands audits."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={quoteHref}>
              Get Solution
              <ArrowRightIcon className="size-4" />
            </Button>
            <Button href="/about" variant="ghost">
              Our story
            </Button>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {whyPrithvi.map((item) => {
            const Icon = homeIcons[item.icon];
            return (
              <li key={item.title} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft">
                <span className="flex size-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
