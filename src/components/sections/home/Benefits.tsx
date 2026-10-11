import { benefits } from "@/data/home";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { homeIcons } from "@/components/sections/home/iconMap";

export default function Benefits() {
  return (
    <Section aria-labelledby="benefits-title">
      <SectionHeading
        id="benefits-title"
        eyebrow="Benefits"
        title="Why Real-Time Data Loggers Pay for Themselves"
        subtitle="Manual readings miss what happens between checks. Continuous monitoring catches it, alerts the right people and keeps the proof."
      />
      <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
        {benefits.map((item) => {
          const Icon = homeIcons[item.icon];
          return (
            <li key={item.title} className="group bg-white p-6 transition-colors duration-300 hover:bg-brand-50/60 sm:p-7">
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 font-heading text-base font-semibold text-ink sm:text-lg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
