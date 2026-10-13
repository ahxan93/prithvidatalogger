import Link from "next/link";
import LiveDeviceVisual from "@/components/sections/LiveDeviceVisual";
import { getPageHeroDevices } from "@/data/page-heroes";
import { supplySteps } from "@/data/company";
import { GSM_NETWORK_NOTE, locationHref, locations } from "@/data/locations";
import CtaBand from "@/components/sections/CtaBand";
import PageHero from "@/components/sections/PageHero";
import PresenceMap from "@/components/sections/PresenceMap";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/icons";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Global Presence: India & the GCC",
  description:
    "Prithvi supplies temperature and humidity data loggers across India and to Saudi Arabia, the UAE, Qatar, Oman, Kuwait, Bahrain and Yemen.",
  path: "/global-presence",
});

export default function GlobalPresencePage() {
  return (
    <>
      <PageHero
        visual={<LiveDeviceVisual devices={getPageHeroDevices("global-presence")} />}
        crumbs={[{ name: "Global Presence", href: "/global-presence" }]}
        eyebrow="Global presence"
        title="Supplying Data Loggers Across India & the GCC"
        intro="From our head office in Mumbai, we supply temperature and humidity data loggers to customers in eight countries, with remote setup support."
      />

      {/* Map visual */}
      <Section tone="dark" aria-labelledby="map-title" className="pt-0 sm:pt-0 lg:pt-0">
        <h2 id="map-title" className="sr-only">
          Where we supply
        </h2>
        <PresenceMap />
      </Section>

      {/* Country cards */}
      <Section aria-labelledby="countries-title">
        <SectionHeading
          id="countries-title"
          eyebrow="Countries"
          title="Eight Countries We Serve"
          subtitle="Open a country to see the industries we work with there, the cities we supply and how support works."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((country) => (
            <li key={country.slug}>
              <article className="group relative flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft transition duration-300 hover:border-brand-200 hover:shadow-soft-lg focus-within:border-brand-300">
                <h3 className="font-heading text-xl font-semibold text-ink">
                  <Link
                    href={locationHref([country.slug])}
                    className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
                  >
                    {country.name}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {country.citiesServed.slice(0, 4).join(" · ")}
                </p>
                <p aria-hidden="true" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  View location
                  <ArrowRightIcon className="size-4 transition-transform motion-safe:group-hover:translate-x-1" />
                </p>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      {/* How international supply works */}
      <Section tone="surface" aria-labelledby="supply-title">
        <SectionHeading
          id="supply-title"
          eyebrow="How it works"
          title="How International Supply Works"
          subtitle="The same four steps for every country outside India."
          align="center"
        />
        <div className="relative mt-14">
          <span aria-hidden="true" className="bg-brand-gradient absolute top-7 right-[12.5%] left-[12.5%] hidden h-0.5 opacity-40 lg:block" />
        <ol className="relative grid list-none gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {supplySteps.map((step, i) => (
            <li key={step.title} className="relative flex flex-col items-center text-center">
              <span aria-hidden="true" className="relative flex size-14 items-center justify-center rounded-2xl bg-white font-heading text-xl font-bold text-brand-600 shadow-soft ring-1 ring-slate-200">
                {i + 1}
              </span>
              <h3 className="mt-5 font-heading text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
        </div>
        <p className="mx-auto mt-12 max-w-2xl rounded-xl border border-brand-100 bg-white px-5 py-4 text-center text-sm text-ink shadow-soft">
          {GSM_NETWORK_NOTE}
        </p>
      </Section>

      <CtaBand
        id="presence-cta"
        title="Need Data Loggers in Your Country?"
        text="Tell us where your sites are and what you need to monitor. We'll confirm what we can supply and send a quote."
      />
    </>
  );
}
