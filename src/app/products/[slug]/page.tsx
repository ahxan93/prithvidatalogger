import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getIndustriesForSeries } from "@/data/industries";
import { GSM_NETWORK_NOTE } from "@/data/locations";
import {
  ACCESSORY_COMPATIBILITY_NOTE,
  ACCESSORY_WORKS_WITH_NOTE,
  formatMrp,
  getAccessories,
  getProductBySlug,
  getRelatedSeries,
  keywordTitle,
  monitoringFeatures,
  products,
} from "@/data/products";
import { productContent } from "@/data/product-content";
import EnquiryForm from "@/components/forms/EnquiryForm";
import GetSolutionButton from "@/components/products/GetSolutionButton";
import ProductCard from "@/components/products/ProductCard";
import SpecsTable, { variantSpecs } from "@/components/products/SpecsTable";
import VariantExplorer, { type ExplorerVariant } from "@/components/products/VariantExplorer";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Faq from "@/components/ui/Faq";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  ArrowRightIcon,
  BellRingIcon,
  CheckCircleIcon,
  PhoneIcon,
  RefreshCwIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { telHref, whatsappHref } from "@/lib/contact";
import { getImageSize, getVariantImage, isPlaceholderImage } from "@/lib/images";
import { productSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

// Every valid path is prerendered at build time, so navigations may wait for the
// (static) page instead of showing a loading shell.
export const instant = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const content = productContent[product.slug];

  return buildMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: `/products/${product.slug}`,
    // This route has its own opengraph-image.tsx (per-product photo + name).
    image: null,
  });
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const content = productContent[product.slug];
  const isLogger = product.category === "series";
  // Name used in the enquiry dropdown and the WhatsApp message.
  const enquiryName = isLogger ? `${product.name} series` : undefined;
  const keyword = product.seo?.primaryKeyword;
  const industries = getIndustriesForSeries(product.slug, product.variants.map((v) => v.slug));
  const related = getRelatedSeries(product);
  const accessories = getAccessories();

  const variants: ExplorerVariant[] = await Promise.all(
    product.variants.map(async (variant) => {
      const image = await getVariantImage(product, variant);
      const showImage = image && !(await isPlaceholderImage(image.src));
      return {
        slug: variant.slug,
        name: variant.name,
        specs: variantSpecs(variant),
        description: variant.description,
        image: showImage
          ? { src: image.src, alt: keyword ? `${variant.name} ${keyword}` : variant.name, ...(await getImageSize(image.src)) }
          : undefined,
      };
    }),
  );

  return (
    <>
      <JsonLd data={await productSchema(product, content.intro)} />

      {/* 1–2. Breadcrumbs + hero: gallery, H1, intro, variant tabs, CTAs */}
      <Section tone="dark" hero className="overflow-hidden pb-16 lg:pb-24">
        <div aria-hidden="true" className="glow-brand pointer-events-none absolute -top-72 -left-56 size-[56rem] opacity-45" />
        <div aria-hidden="true" className="glow-cyan pointer-events-none absolute -right-48 -bottom-72 size-[40rem] opacity-15" />
        <div className="relative">
          <Breadcrumbs
            items={[
              { name: "Products", href: "/products" },
              { name: product.name, href: `/products/${product.slug}` },
            ]}
            className="mb-8"
          />
          <VariantExplorer
            seriesName={product.name}
            channels={product.channels}
            variants={variants}
            actions={
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href="#enquiry" size="lg" className="shadow-glow">
                  Get Solution
                  <ArrowRightIcon className="size-5" />
                </Button>
                <Button href={whatsappHref(enquiryName)} variant="whatsapp" size="lg">
                  <WhatsAppIcon className="size-5" />
                  WhatsApp
                </Button>
                <Button href={telHref} variant="outline" size="lg" aria-label={`Call ${siteConfig.phone.display}`}>
                  <PhoneIcon className="size-5" />
                  Call
                </Button>
              </div>
            }
          >
            <h1 className="font-heading text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              {product.headline}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-300 text-pretty">{content.intro}</p>
            {product.connectivity.includes("gsm") && (
              <p className="mt-4 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-slate-200">
                {GSM_NETWORK_NOTE}
              </p>
            )}
          </VariantExplorer>
        </div>
      </Section>

      {/* 3. The name */}
      {product.nameMeaning && (
        <Section aria-labelledby="name-title">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] sm:text-sm text-brand-600">The name</p>
            <h2 id="name-title" className="mt-3 font-heading text-3xl font-bold text-ink sm:text-4xl">
              Why We Call It {product.name}
            </h2>
            <p className="mt-6 text-xl leading-relaxed text-muted text-pretty">{product.nameMeaning}</p>
            <div aria-hidden="true" className="bg-brand-gradient mx-auto mt-8 h-1 w-20 rounded-full" />
          </div>
        </Section>
      )}

      {/* 4. Key features */}
      <Section tone="surface" aria-labelledby="features-title">
        <SectionHeading
          id="features-title"
          eyebrow="Key features"
          title={keyword ? `${product.name}: ${keywordTitle(keyword)} Features` : `${product.name}: Key Features`}
          subtitle={`Best for: ${product.bestFor}`}
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.keyFeatures.map((feature) => (
            <li key={feature} className="flex gap-3 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft">
              <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-brand-600" />
              <span className="text-sm leading-relaxed text-ink">{feature}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 5. Full specs table */}
      <Section id="specifications" aria-labelledby="specs-title">
        <SectionHeading
          id="specs-title"
          eyebrow="Specifications"
          title={`${product.name} Specifications`}
          subtitle={
            isLogger
              ? "Each variant side by side, followed by the specifications shared by every Prithvi logger."
              : "What each accessory does."
          }
        />
        <div className="mt-10">
          {product.variants.length > 1 && (
            <p className="mb-3 text-sm text-muted lg:hidden">Swipe sideways to see every variant.</p>
          )}
          <SpecsTable series={product} labelledBy="specs-title" />
        </div>
        {isLogger && (
          <p className="mt-4 text-sm text-muted">
            Loggers can be calibrated by our parent lab through our{" "}
            <Link href="/services/calibration" className="font-semibold text-brand-600 underline underline-offset-4">
              NABL calibration service
            </Link>
            .
          </p>
        )}
      </Section>

      {/* 6. Applications and recommended industries */}
      {industries.length > 0 && (
        <Section tone="surface" aria-labelledby="applications-title">
          <SectionHeading
            id="applications-title"
            eyebrow="Applications"
            title={`Where ${product.name} Is Used`}
            subtitle="Industries where we recommend this series, and what it typically monitors there."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <li
                key={industry.slug}
                className="relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft transition hover:border-brand-200 hover:shadow-soft-lg"
              >
                <h3 className="font-heading text-lg font-semibold text-ink">
                  <Link href={`/industries/${industry.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
                    {industry.name}
                  </Link>
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted">
                  {industry.applications.map((application) => (
                    <li key={application} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-400" />
                      {application}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* 7. Monitoring features (never names the software) */}
      <Section tone="dark" aria-labelledby="monitoring-title">
        <SectionHeading
          id="monitoring-title"
          eyebrow="Monitoring"
          title="Cloud Monitoring Dashboard & Mobile Alerts"
          subtitle={
            isLogger
              ? `Every ${product.name} works with the monitoring dashboard, so readings, alerts and reports are in one place.`
              : "Accessories work alongside the monitoring dashboard, so alarms, door events and reports are in one place."
          }
        />
        <ul className="mt-10 grid gap-x-10 gap-y-4 md:grid-cols-2">
          {monitoringFeatures.map((feature) => (
            <li key={feature} className="flex gap-3 border-b border-white/10 pb-4 text-slate-200">
              <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-cyan-400" />
              <span className="leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 8. Accessories. Compatibility is not confirmed per model, so the wording is fixed
          by the owner (brief §1): never claim an accessory works with every series. */}
      {isLogger ? (
        accessories.length > 0 && (
          <Section aria-labelledby="accessories-title">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                id="accessories-title"
                eyebrow="Accessories"
                title="Accessories"
                subtitle={ACCESSORY_COMPATIBILITY_NOTE}
              />
              <Button href="/products/accessories" variant="outline" className="shrink-0 self-start lg:self-auto">
                View accessories
                <ArrowRightIcon className="size-4" />
              </Button>
            </div>
            <ul className="mt-10 grid gap-6 md:grid-cols-2">
              {accessories.map((accessory, i) => (
                <li key={accessory.slug} className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-soft">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
                    {i === 0 ? <BellRingIcon className="size-5" /> : <RefreshCwIcon className="size-5" />}
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-semibold text-ink">{accessory.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{accessory.description}</p>
                  {siteConfig.showPrices ? (
                    <p className="mt-4 text-sm font-semibold text-brand-700">{formatMrp(accessory.mrp)}</p>
                  ) : (
                    <GetSolutionButton
                      href="/products/accessories#enquiry"
                      productName={accessory.name}
                      size="sm"
                      className="mt-4"
                    />
                  )}
                </li>
              ))}
            </ul>
          </Section>
        )
      ) : (
        <Section aria-labelledby="works-with-title">
          <SectionHeading
            id="works-with-title"
            eyebrow="Compatibility"
            title="Compatibility"
            subtitle={ACCESSORY_WORKS_WITH_NOTE}
          />
          <div className="mt-8">
            <Button href="/products" variant="outline">
              Browse the logger range
              <ArrowRightIcon className="size-4" />
            </Button>
          </div>
        </Section>
      )}

      {/* 9. FAQ */}
      <Section tone="surface" aria-labelledby="faq-title">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            id="faq-title"
            eyebrow="FAQ"
            title={`${product.name} Questions`}
            subtitle="Answers to what buyers ask most about this series."
          />
          <Faq items={content.faqs} />
        </div>
      </Section>

      {/* 10. Related series */}
      <Section aria-labelledby="related-title">
        <SectionHeading
          id="related-title"
          eyebrow="Related"
          title={isLogger ? "Compare with Other Series" : "Explore the Logger Range"}
        />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((series) => (
            <li key={series.slug}>
              <ProductCard series={series} />
            </li>
          ))}
        </ul>
      </Section>

      {/* 11. Enquiry form, product preselected */}
      <section
        id="enquiry"
        data-tone="dark"
        aria-labelledby="enquiry-title"
        className="group/section bg-dot-grid relative overflow-hidden bg-navy-950 py-16 text-white sm:py-20 lg:py-24"
      >
        <div aria-hidden="true" className="glow-brand pointer-events-none absolute -top-64 -right-64 size-[52rem] opacity-45" />
        <Container className="relative grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:pt-6">
            <SectionHeading
              id="enquiry-title"
              eyebrow="Get Solution"
              title={`Ask About ${product.name}`}
              subtitle="Tell us where it will be used and how many you need. We'll confirm the right variant and send you a clear, itemised quote."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={whatsappHref(enquiryName)} variant="whatsapp" size="lg">
                <WhatsAppIcon className="size-5" />
                WhatsApp us
              </Button>
              <Button href={telHref} variant="outline" size="lg">
                <PhoneIcon className="size-5" />
                {siteConfig.phone.display}
              </Button>
            </div>
          </div>
          <EnquiryForm
            variant="compact"
            title={isLogger ? `Get Your ${product.name} Solution` : "Get Your Accessories Solution"}
            defaultProduct={enquiryName}
            className="shadow-glow"
          />
        </Container>
      </section>
    </>
  );
}
