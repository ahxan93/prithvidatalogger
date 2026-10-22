import Link from "next/link";
import { siteConfig } from "@/config/site";
import LiveDeviceVisual from "@/components/sections/LiveDeviceVisual";
import { getPageHeroDevices } from "@/data/page-heroes";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";

// REVIEW WITH A LEGAL PROFESSIONAL BEFORE LAUNCH.
// This is an honest, plain-English template covering only what this website
// actually does: an informational, enquiry-based site with no online cart or
// payment (see CLAUDE.md "Commerce" rule). It is not a substitute for legal advice.

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description:
    "The terms that apply to using the Prithvi Data Loggers website. This site is informational — no online purchase, cart or payment.",
  path: "/terms",
});

const updated = "12 October 2026";

export default function TermsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Terms & Conditions", href: "/terms" }]}
        eyebrow="Legal"
        title="Terms & Conditions"
        intro={`Last updated ${updated}. These terms apply to your use of this website. Please read them alongside our Privacy Policy.`}
        visual={<LiveDeviceVisual devices={getPageHeroDevices("terms")} plain />}
      />

      <Section aria-labelledby="terms-title">
        <h2 id="terms-title" className="sr-only">
          Terms &amp; Conditions
        </h2>
        <div className="mx-auto max-w-3xl space-y-10">
          <div>
            <h3 className="font-heading text-xl font-semibold text-ink">About this website</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              This website belongs to {siteConfig.name}, a {siteConfig.parentCompany.name} company. This is an
              informational site: you can browse our data loggers and services, and reach us by phone, WhatsApp or
              our enquiry form. There is no online purchase, shopping cart or payment on this website — every order
              is arranged directly with our team after an enquiry.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-ink">Using this website</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              You are welcome to browse this site and use the enquiry form, phone and WhatsApp links to contact us.
              Please do not use the site in a way that could damage it, disrupt it for other visitors, or attempt to
              access any part of it you are not authorised to use.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-ink">Enquiries and quotes</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              Submitting the enquiry form, calling us or messaging us on WhatsApp is a request for information — it
              does not create a contract or an order by itself. A quote is only confirmed once our team has responded
              to you directly, and any order is agreed separately once you and our team have confirmed the product,
              quantity and price.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-ink">Pricing</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              We do not list prices on this website. Share your requirement through the enquiry form, WhatsApp
              or a call, and our team will send you a clear, itemised quote. Prices can change, and the price
              confirmed by our team at the time of your order is the one that applies.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-ink">Accuracy of information</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              We try to keep product specifications, availability and content on this site accurate, but we do not
              guarantee that everything is complete, current or error-free at every moment. If anything you read here
              matters to a decision you are making, please confirm it with our team before ordering.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-ink">Intellectual property</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              The text, images, logos and design of this website belong to {siteConfig.name} or {" "}
              {siteConfig.parentCompany.name}, unless stated otherwise. Please do not copy or reuse our content
              without asking us first.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-ink">Other websites</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              This site links to other websites, including{" "}
              <a
                href={siteConfig.parentCompany.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand-600 hover:underline"
              >
                {siteConfig.parentCompany.name}
              </a>
              . We do not control those sites and are not responsible for their content or their own terms.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-ink">Liability</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              This website and its content are provided as general information. To the extent permitted by law, we
              are not liable for any loss arising from your use of this website or reliance on its content — any
              commercial arrangement, including the specifications, pricing and terms of an order, is confirmed
              separately and directly with our team.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-ink">Governing law</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              These terms are governed by the laws of India, and our registered address is {siteConfig.address.full}.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-ink">Changes to these terms</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              We may update these terms from time to time. Changes take effect once this page is updated, and the
              last-updated date at the top will reflect the latest version.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-ink">Contact us</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              Questions about these terms? Email{" "}
              <a href={`mailto:${siteConfig.email}`} className="font-medium text-brand-600 hover:underline">
                {siteConfig.email}
              </a>{" "}
              or call{" "}
              <a href={`tel:${siteConfig.phone.tel}`} className="font-medium text-brand-600 hover:underline">
                {siteConfig.phone.display}
              </a>
              .
            </p>
            <p className="mt-6 text-sm text-muted">
              See also our{" "}
              <Link href="/privacy-policy" className="font-medium text-brand-600 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
