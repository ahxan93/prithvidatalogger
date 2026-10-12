import type { ReactNode } from "react";
import LiveDeviceVisual from "@/components/sections/LiveDeviceVisual";
import { getPageHeroDevices } from "@/data/page-heroes";
import { siteConfig } from "@/config/site";
import EnquiryForm from "@/components/forms/EnquiryForm";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { mailtoHref, mapsHref, telHref, whatsappHref } from "@/lib/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Us & Get Solution",
  description:
    "Contact Prithvi Data Loggers in Mumbai for temperature & humidity data loggers. Call, WhatsApp or send an enquiry and our team will get back to you.",
  path: "/contact",
});

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address.full)}&output=embed`;

function ContactItem({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-soft">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-ink">{label}</p>
        <div className="mt-0.5 text-sm text-muted">{children}</div>
      </div>
    </li>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        visual={<LiveDeviceVisual devices={getPageHeroDevices("contact")} />}
        crumbs={[{ name: "Contact", href: "/contact" }]}
        eyebrow="Contact · Mumbai, India"
        title="Contact Prithvi Data Loggers"
        intro="Tell us what you need to monitor and where. We'll recommend the right data logger and send you a quote. Call, WhatsApp or use the enquiry form below."
      />

      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="space-y-6">
            <h2 className="font-heading text-2xl font-bold text-ink">Reach us directly</h2>
            <ul className="space-y-3">
              <ContactItem icon={<PhoneIcon />} label="Phone">
                <a href={telHref} className="inline-flex min-h-11 items-center font-medium text-brand-600 hover:underline">
                  {siteConfig.phone.display}
                </a>
              </ContactItem>
              <ContactItem icon={<WhatsAppIcon />} label="WhatsApp">
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center font-medium text-brand-600 hover:underline"
                >
                  Chat on WhatsApp
                </a>
              </ContactItem>
              <ContactItem icon={<MailIcon />} label="Email">
                <a href={mailtoHref} className="inline-flex min-h-11 flex-wrap items-center font-medium text-brand-600 hover:underline">
                  <span>{siteConfig.email.split("@")[0]}</span>
                  <span>@{siteConfig.email.split("@")[1]}</span>
                </a>
              </ContactItem>
              <ContactItem icon={<MapPinIcon />} label="Office">
                <address className="not-italic leading-relaxed">{siteConfig.address.full}</address>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center font-medium text-brand-600 hover:underline"
                >
                  Get directions
                </a>
              </ContactItem>
            </ul>

            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-brand-50 shadow-soft">
              {/* Shown until the map loads (and if it is blocked). */}
              <p className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center text-sm text-muted">
                <MapPinIcon className="size-7 text-brand-600" />
                Malad West, Mumbai
              </p>
              <iframe
                src={mapSrc}
                title={`Map showing ${siteConfig.name} office in Malad West, Mumbai`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="relative aspect-[4/3] w-full border-0"
              />
            </div>
          </div>

          <div id="enquiry">
            <EnquiryForm title="Send us an enquiry" />
          </div>
        </div>
      </Section>
    </>
  );
}
