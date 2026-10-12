import Image from "next/image";
import Link from "next/link";
import { featuredIndustrySlugs } from "@/data/home";
import { getIndustryBySlug, type Industry } from "@/data/industries";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/icons";
import ImageFallback from "@/components/ui/ImageFallback";
import { isPlaceholderImage } from "@/lib/images";

export default async function IndustriesGrid() {
  const featured = featuredIndustrySlugs
    .map((slug) => getIndustryBySlug(slug))
    .filter((industry): industry is Industry => Boolean(industry));
  const cards = await Promise.all(
    featured.map(async (industry) => ({ industry, isPlaceholder: await isPlaceholderImage(industry.image) })),
  );

  return (
    <Section tone="dark" aria-labelledby="industries-title">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="industries-title"
          eyebrow="Industries"
          title="Built for Regulated & Temperature-Sensitive Industries"
          subtitle="From vaccine fridges to 16-point warehouses, each industry has its own risks. We help you cover them."
        />
        <Button href="/industries" variant="outline" className="shrink-0 self-start lg:self-auto">
          View all industries
          <ArrowRightIcon className="size-4" />
        </Button>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-14 lg:grid-cols-4 lg:gap-5">
        {cards.map(({ industry, isPlaceholder }, i) => (
          <li key={industry.slug} className="flex">
            <Link
              href={`/industries/${industry.slug}`}
              className="group flex w-full flex-col overflow-hidden rounded-2xl bg-navy-900 ring-1 ring-white/10 transition-colors duration-300 hover:ring-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              {/* 3:2 matches the source photos exactly, so nothing is cropped. */}
              <div className="relative aspect-[3/2] overflow-hidden">
                {isPlaceholder ? (
                  <ImageFallback seed={i} className="transition-transform duration-700 motion-safe:group-hover:scale-105" />
                ) : (
                  <Image
                    src={industry.image}
                    alt={`${industry.name} temperature monitoring`}
                    fill
                    sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col p-3.5 sm:p-5">
                <h3 className="flex items-center justify-between gap-2 font-heading text-base leading-snug font-semibold text-white sm:gap-3 sm:text-lg">
                  {industry.name}
                  <ArrowRightIcon className="size-5 shrink-0 text-cyan-400 transition-transform motion-safe:group-hover:translate-x-1" />
                </h3>
                <p className="mt-1.5 hidden text-sm leading-relaxed text-slate-300 sm:block">{industry.summary}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
