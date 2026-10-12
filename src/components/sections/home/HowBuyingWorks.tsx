import { buyingSteps } from "@/data/home";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { homeIcons } from "@/components/sections/home/iconMap";

export default function HowBuyingWorks() {
  return (
    <Section aria-labelledby="buying-title">
      <SectionHeading
        id="buying-title"
        eyebrow="How buying works"
        title="Simple, Personal and Offline"
        subtitle="No cart and no checkout. Talk to our team, get the right solution with a clear quote, and we help you all the way to installation."
        align="center"
      />
      <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {/* Connector line behind the step icons (desktop) */}
        <span
          aria-hidden="true"
          className="bg-brand-gradient absolute top-7 right-[12.5%] left-[12.5%] hidden h-0.5 opacity-40 lg:block"
        />
        {buyingSteps.map((step, i) => {
          const Icon = homeIcons[step.icon];
          return (
            <li key={step.title} className="relative flex flex-col items-center text-center">
              <span className="relative flex size-14 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-soft ring-1 ring-slate-200">
                <Icon className="size-6" />
                <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-5 font-heading text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{step.description}</p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
