import Link from "next/link";
import { siteConfig } from "@/config/site";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";

// REVIEW WITH A LEGAL PROFESSIONAL BEFORE LAUNCH.
// This page describes only what the site actually does today: the enquiry
// form (submitted via the third-party service Web3Forms to our own inbox),
// WhatsApp/phone contact, and no cookies or analytics. If any of that changes
// (an analytics tool, a cookie banner, a CRM, etc.), this page needs updating
// to match before it goes live, not after.

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Prithvi Data Loggers collects and uses the information you share through our enquiry form, phone or WhatsApp.",
  path: "/privacy-policy",
});

const updated = "12 October 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Privacy Policy", href: "/privacy-policy" }]}
        eyebrow="Legal"
        title="Privacy Policy"
        intro={`Last updated ${updated}. This page explains what information we collect through this website, how we use it, and who you can contact about it.`}
      />

      <Section aria-labelledby="privacy-title">
        <h2 id="privacy-title" className="sr-only">
          Privacy Policy
        </h2>
        <div className="mx-auto max-w-3xl space-y-10">
          <div>
            <h3 className="font-heading text-xl font-semibold text-ink">Who we are</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              This website, {siteConfig.url.replace("https://", "")}, is operated by {siteConfig.name}, a{" "}
              {siteConfig.parentCompany.name} company. If you have any question about this policy or about
              information you have shared with us, contact us at{" "}
              <a href={`mailto:${siteConfig.email}`} className="font-medium text-brand-600 hover:underline">
                {siteConfig.email}
              </a>
              .
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-ink">Information we collect</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              We only collect information you choose to give us. The main way this happens is our enquiry form,
              which asks for:
            </p>
            <ul className="mt-4 ml-5 list-disc space-y-1.5 text-lg leading-relaxed text-muted marker:text-brand-400">
              <li>Your full name</li>
              <li>Company name (optional)</li>
              <li>Phone number, with country code</li>
              <li>Email address</li>
              <li>City / country</li>
              <li>The product or service you are asking about</li>
              <li>Quantity (optional) and any message you add (optional)</li>
            </ul>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              If you reach us by phone or WhatsApp instead, we see whatever information you choose to share in that
              conversation — your phone number, and anything you tell us.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-ink">How we use it</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              We use the information you submit only to respond to your enquiry: to understand what you need, to
              recommend a product or service, and to send you a quote or follow-up information by phone, WhatsApp or
              email. We do not sell, rent or share your information with third parties for their own marketing.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-ink">How the enquiry form works</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              Our enquiry form is submitted through{" "}
              <a
                href="https://web3forms.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand-600 hover:underline"
              >
                Web3Forms
              </a>
              , a third-party form delivery service that forwards what you submit directly to our own email inbox (
              <a href={`mailto:${siteConfig.email}`} className="font-medium text-brand-600 hover:underline">
                {siteConfig.email}
              </a>
              ). We do not keep a separate marketing database of enquiries — submissions live as
              emails in our inbox, kept only for as long as we need them to respond to you and keep a record of the
              conversation.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-ink">WhatsApp and phone</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              Our WhatsApp links open a chat with our number through the WhatsApp app or website. That conversation
              runs on WhatsApp and is covered by WhatsApp’s own privacy policy and terms, not this one. The same
              applies if you call us — the call itself runs over your phone network, not this website.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-ink">Cookies and analytics</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              This website does not use cookies, analytics tools or advertising trackers. We do not track your
              browsing across other sites, and nothing on this site builds a profile of you. If this ever changes —
              for example, if we add an analytics tool in future — we will update this page to describe it before it
              goes live.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-ink">Other websites</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              This site links to other websites, including our parent company{" "}
              <a
                href={siteConfig.parentCompany.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand-600 hover:underline"
              >
                {siteConfig.parentCompany.name}
              </a>
              . Those sites have their own privacy policies, and we are not responsible for how they handle
              information you share with them.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-ink">Your choices</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              You can ask us at any time what information we hold about you, ask us to correct it, or ask us to
              delete it. Write to{" "}
              <a href={`mailto:${siteConfig.email}`} className="font-medium text-brand-600 hover:underline">
                {siteConfig.email}
              </a>{" "}
              and we will action your request.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-ink">Changes to this policy</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              If what this site does with your information changes, we will update this page and the last-updated
              date at the top so it always reflects current practice.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-ink">Contact us</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              Email{" "}
              <a href={`mailto:${siteConfig.email}`} className="font-medium text-brand-600 hover:underline">
                {siteConfig.email}
              </a>{" "}
              or call{" "}
              <a href={`tel:${siteConfig.phone.tel}`} className="font-medium text-brand-600 hover:underline">
                {siteConfig.phone.display}
              </a>
              . Our registered address is {siteConfig.address.full}.
            </p>
            <p className="mt-6 text-sm text-muted">
              See also our{" "}
              <Link href="/terms" className="font-medium text-brand-600 hover:underline">
                Terms &amp; Conditions
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
