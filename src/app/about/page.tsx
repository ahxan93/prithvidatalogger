import Image from "next/image";
import { certificatesValid, labPhrase } from "@/lib/accreditation";
import LiveDeviceVisual from "@/components/sections/LiveDeviceVisual";
import { getPageHeroDevices } from "@/data/page-heroes";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  brandStory,
  certifications,
  corePurpose,
  founder,
  framework,
  howWeWork,
  mission,
  nameMeaning,
  vision,
} from "@/data/company";
import { locations } from "@/data/locations";
import CertificateCard from "@/components/about/CertificateCard";
import EnquiryForm from "@/components/forms/EnquiryForm";
import CtaBand from "@/components/sections/CtaBand";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Button from "@/components/ui/Button";
import ImageFallback from "@/components/ui/ImageFallback";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRightIcon, CheckCircleIcon } from "@/components/ui/icons";
import { getImageSize, isPlaceholderImage, resolvePublicImage } from "@/lib/images";
import { personSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "About Prithvi Data Loggers, a VEGA Calibrations company: our story, founder, vision and the Prithvi Framework for trusted environmental monitoring.",
  path: "/about",
});

/** A real (non-placeholder) image with its pixel size, or undefined. */
async function realImage(basePath: string) {
  const src = await resolvePublicImage(basePath);
  if (!src || (await isPlaceholderImage(src))) return undefined;
  const size = await getImageSize(src);
  return size ? { src, ...size } : undefined;
}

const established = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(
  new Date(`${siteConfig.parentCompany.established}T00:00:00Z`),
);

const principles = [
  { label: "Vision", text: vision },
  { label: "Mission", text: mission },
  { label: "Core purpose", text: corePurpose },
];

export default async function AboutPage() {
  const founderPhoto = await realImage(founder.photo);
  const certificationImages = await Promise.all(certifications.map((c) => realImage(c.image)));
  const parent = siteConfig.parentCompany;

  return (
    <>
      <JsonLd data={personSchema({ ...founder, image: founderPhoto?.src })} />

      {/* 1. Hero with the compact enquiry form (right on desktop, below on mobile) */}
      <Section tone="dark" hero className="overflow-hidden pb-16 lg:pb-24">
        <div aria-hidden="true" className="glow-brand pointer-events-none absolute -top-72 -left-56 size-[56rem] opacity-45" />
        <div aria-hidden="true" className="glow-violet pointer-events-none absolute -right-56 -bottom-80 size-[44rem] opacity-20" />
        <div className="relative">
          <Breadcrumbs items={[{ name: "About Us", href: "/about" }]} className="mb-8" />
          <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div className="lg:pt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] sm:text-sm text-cyan-400">About us</p>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
                About Prithvi Data Loggers
              </h1>
              <p className="mt-6 font-heading text-2xl leading-snug font-semibold text-pretty sm:text-3xl">
                <span className="text-brand-gradient">{corePurpose}</span>
              </p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300 text-pretty">
                {siteConfig.name} makes IoT temperature and humidity data loggers. We are a{" "}
                {parent.name} company, built on the work of {labPhrase}.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#our-story" variant="outline" size="lg">
                  Our story
                </Button>
                <Button href="#founder" variant="ghost" size="lg">
                  Meet the founder
                </Button>
              </div>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
                {[`A ${parent.name} company`, certificatesValid ? "NABL · ISO/IEC 17025:2017" : "Calibration by our parent lab", "India & GCC"].map((fact) => (
                  <li key={fact} className="flex items-center gap-2">
                    <CheckCircleIcon className="size-4 text-cyan-400" />
                    {fact}
                  </li>
                ))}
              </ul>
              <LiveDeviceVisual className="mt-10 max-w-md" devices={getPageHeroDevices("about")} />
            </div>
            <EnquiryForm variant="compact" title="Talk to our team" className="shadow-glow" />
          </div>
        </div>
      </Section>

      {/* 2. Our story */}
      <Section id="our-story" aria-labelledby="story-title">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading id="story-title" eyebrow="Our story" title="Bridging the Gap Between Measuring and Understanding" />
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/80 bg-surface p-5">
                <dt className="text-xs font-semibold uppercase tracking-wider text-brand-600">Parent company</dt>
                <dd className="mt-1.5 font-heading text-lg font-semibold text-ink">{parent.name}</dd>
                <dd className="mt-1 text-sm text-muted">Established {established}</dd>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-surface p-5">
                <dt className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                  {certificatesValid ? "Accreditation" : "Calibration"}
                </dt>
                <dd className="mt-1.5 font-heading text-lg font-semibold text-ink">
                  {certificatesValid ? "NABL · ISO/IEC 17025:2017" : "Delivered by VEGA Calibrations"}
                </dd>
                <dd className="mt-1 text-sm text-muted">
                  {certificatesValid ? parent.certification : "Our parent calibration laboratory"}
                </dd>
              </div>
            </dl>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            {brandStory.map((paragraph) => (
              <p key={paragraph} className="text-pretty">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* 3. Founder */}
      <Section tone="surface" id="founder" aria-labelledby="founder-title" className="overflow-hidden">
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="relative mx-auto w-full max-w-sm">
            <div aria-hidden="true" className="glow-brand pointer-events-none absolute -inset-16 opacity-30" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-navy-950 shadow-soft-lg ring-1 ring-slate-200">
              {founderPhoto ? (
                <Image
                  src={founderPhoto.src}
                  alt={`${founder.name}, ${founder.title}, ${siteConfig.name}`}
                  fill
                  sizes="(min-width: 1024px) 384px, 80vw"
                  className="object-cover object-top"
                />
              ) : (
                <ImageFallback seed={1} />
              )}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] sm:text-sm text-brand-600">Founder</p>
            <h2 id="founder-title" className="mt-3 font-heading text-3xl font-bold text-ink sm:text-4xl">
              {founder.honorific} {founder.name}
            </h2>
            <p className="mt-1 text-lg font-medium text-brand-600">{founder.title}</p>
            <p className="mt-6 text-lg leading-relaxed text-muted text-pretty">{founder.bio}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Areas of expertise">
              {founder.expertise.map((area) => (
                <li key={area} className="rounded-full border border-brand-100 bg-white px-4 py-2 text-sm font-medium text-brand-700">
                  {area}
                </li>
              ))}
            </ul>
            <figure className="mt-8 border-l-4 border-brand-600 pl-6">
              <blockquote className="font-heading text-2xl leading-snug font-semibold text-ink sm:text-3xl">
                “{founder.quote}”
              </blockquote>
              <figcaption className="mt-3 text-sm text-muted">{founder.name}</figcaption>
            </figure>
          </div>
        </div>
      </Section>

      {/* 4. Why the name Prithvi */}
      <Section tone="dark" aria-labelledby="name-title" className="overflow-hidden">
        <div aria-hidden="true" className="glow-brand pointer-events-none absolute top-1/2 left-1/2 size-[52rem] -translate-x-1/2 -translate-y-1/2 opacity-35" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] sm:text-sm text-cyan-400">Why the name</p>
          <h2 id="name-title" className="mt-3 font-heading text-3xl font-bold text-white sm:text-5xl">
            Prithvi Means <span className="text-brand-gradient">Earth</span>
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-slate-200 text-pretty">{nameMeaning}</p>
        </div>
      </Section>

      {/* 5. Vision / Mission / Core purpose */}
      <Section aria-labelledby="principles-title">
        <SectionHeading id="principles-title" eyebrow="What guides us" title="Vision, Mission and Purpose" align="center" />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {principles.map((item, i) => (
            <li key={item.label} className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 shadow-soft">
              <div aria-hidden="true" className="bg-brand-gradient absolute inset-x-0 top-0 h-1" />
              <p className="font-heading text-3xl font-bold text-brand-600" aria-hidden="true">
                0{i + 1}
              </p>
              <h3 className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] sm:text-sm text-brand-600">{item.label}</h3>
              <p className="mt-3 font-heading text-xl leading-snug font-semibold text-ink text-pretty">{item.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 6. The Prithvi Framework (7 stages) */}
      <Section tone="surface" aria-labelledby="framework-title">
        <SectionHeading
          id="framework-title"
          eyebrow="How we think"
          title="The Prithvi Framework"
          subtitle="Seven stages that take an environment from connected to understood, and from understood to a confident decision."
          align="center"
        />
        <div className="relative mt-14">
          <span aria-hidden="true" className="bg-brand-gradient absolute top-7 right-[7%] left-[7%] hidden h-0.5 opacity-50 lg:block" />
        <ol className="relative grid list-none grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-7">
          {framework.map((stage, i) => (
            <li key={stage} className="relative flex flex-col items-center text-center max-sm:last:col-span-2">
              <span aria-hidden="true" className="bg-brand-gradient relative flex size-14 items-center justify-center rounded-2xl font-heading text-xl font-bold text-white shadow-soft">
                {i + 1}
              </span>
              <span className="mt-4 font-heading text-lg font-semibold text-ink">{stage}</span>
            </li>
          ))}
        </ol>
        </div>
      </Section>

      {/* 7. How we work */}
      <Section aria-labelledby="work-title">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            id="work-title"
            eyebrow="How we work"
            title="Fast, Clean and Transparent"
            subtitle="What you can expect when you work with us, from the first enquiry to installation."
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {howWeWork.map((item) => (
              <li key={item.title} className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft sm:last:col-span-2">
                <CheckCircleIcon className="mt-0.5 size-6 shrink-0 text-brand-600" />
                <div>
                  <h3 className="font-heading text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 8. Certifications (of our parent company). Shown only once the owner
          confirms the certificates are current (siteConfig.certificatesValid). */}
      {certificatesValid && (
      <Section tone="surface" aria-labelledby="certifications-title">
        <SectionHeading
          id="certifications-title"
          eyebrow="Certifications"
          title="Backed by an Accredited Lab"
          subtitle={`Held by our parent company, ${parent.name}.`}
          align="center"
        />
        <ul className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {certifications.map((certificate, i) => (
            <li key={certificate.title}>
              <CertificateCard
                title={certificate.title}
                standard={certificate.standard}
                description={certificate.description}
                image={certificationImages[i]}
              />
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-muted">
          See our{" "}
          <Link href="/services/calibration" className="font-semibold text-brand-600 underline underline-offset-4">
            NABL calibration services
          </Link>
          .
        </p>
      </Section>
      )}

      {/* 9. Countries we serve */}
      <Section aria-labelledby="countries-title">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="countries-title"
            eyebrow="Where we work"
            title="Countries We Serve"
            subtitle="Supplied from India to customers across India and the GCC."
          />
          <Button href="/global-presence" variant="outline" className="shrink-0 self-start lg:self-auto">
            Global presence
            <ArrowRightIcon className="size-4" />
          </Button>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {locations.map((country) => (
            <li key={country.slug}>
              <Link
                href={`/locations/${country.slug}`}
                className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white px-5 py-4 font-heading font-semibold text-ink shadow-soft transition hover:border-brand-200 hover:text-brand-700 hover:shadow-soft-lg"
              >
                {country.name}
                <ArrowRightIcon className="size-4 shrink-0 text-brand-600 transition-transform motion-safe:group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* 10. CTA */}
      <CtaBand
        id="about-cta"
        title="Protect What Depends on Its Environment"
        text="Tell us what you need to monitor. We'll recommend the right loggers and send a quote."
      />
    </>
  );
}
