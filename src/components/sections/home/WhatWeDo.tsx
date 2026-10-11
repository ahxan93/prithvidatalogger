import Link from "next/link";
import { whatWeDo } from "@/data/home";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/icons";
import { homeIcons } from "@/components/sections/home/iconMap";

export default function WhatWeDo() {
  return (
    <Section aria-labelledby="what-we-do-title">
      <SectionHeading
        id="what-we-do-title"
        eyebrow="What we do"
        title="More Than a WiFi Temperature and Humidity Data Logger"
        subtitle="Monitoring hardware, NABL calibration, temperature mapping, validation and support, from one team."
        align="center"
      />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-5 lg:gap-5">
        {whatWeDo.map((item) => {
          const Icon = homeIcons[item.icon];
          return (
            <li key={item.title} className="relative">
              <div className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft transition duration-300 hover:border-brand-200 hover:shadow-soft-lg motion-safe:hover:-translate-y-1 focus-within:border-brand-300">
                <span className="bg-brand-gradient flex size-12 items-center justify-center rounded-xl text-white shadow-sm">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-5 font-heading text-lg font-semibold text-ink">
                  {/* Whole card is clickable via the stretched link. */}
                  <Link href={item.href ?? "/"} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>
                <span aria-hidden="true" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  Learn more
                  <ArrowRightIcon className="size-4 transition-transform motion-safe:group-hover:translate-x-1" />
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
