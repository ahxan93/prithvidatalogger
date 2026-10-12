import Link from "next/link";
import type { Industry } from "@/data/industries";
import { citiesForIndustry, locationHref, locations } from "@/data/locations";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/icons";

const pill =
  "group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-700 ring-1 ring-inset ring-brand-200 transition hover:bg-brand-600 hover:text-white";

// Reverse links from an industry page to the cities it matters most in
// (docs/LOCATION-PAGES-PLAYBOOK.md section 2, rule 5). The cities come from
// the city pages that list this industry, so the block grows as pages are built.
export default function WhereWeServe({ industry }: { industry: Industry }) {
  const cities = citiesForIndustry(industry.slug, 8);
  const countries = locations.filter((country) => country.indexable);

  return (
    <Section tone="surface" aria-labelledby="where-we-serve-title">
      <SectionHeading
        id="where-we-serve-title"
        eyebrow="Locations"
        title={`Where We Serve ${industry.name} Sites`}
        subtitle="We supply, install and make site visits across India's cities and industrial areas, and supply the GCC from India."
      />
      {cities.length > 0 && (
        <ul className="mt-8 flex flex-wrap gap-3">
          {cities.map(({ node, path }) => (
            <li key={node.slug}>
              <Link href={locationHref(path)} className={pill}>
                {industry.name} data loggers in {node.name}
                <ArrowRightIcon className="size-4" />
              </Link>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-8 text-sm font-semibold text-ink">Browse by country</p>
      <ul className="mt-3 flex flex-wrap gap-3">
        {countries.map((country) => (
          <li key={country.slug}>
            <Link href={locationHref([country.slug])} className={pill}>
              {country.name}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/locations" className={pill}>
            All locations
            <ArrowRightIcon className="size-4" />
          </Link>
        </li>
      </ul>
    </Section>
  );
}
