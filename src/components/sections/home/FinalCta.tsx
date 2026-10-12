import { siteConfig } from "@/config/site";
import EnquiryForm from "@/components/forms/EnquiryForm";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { CheckCircleIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { telHref, whatsappHref } from "@/lib/contact";

const points = [
  "Help choosing the right logger for each space",
  "Clear, itemised quotes with no hidden charges",
  "Calibration and mapping from our NABL-accredited parent lab",
];

export default function FinalCta() {
  return (
    <Section tone="dark" aria-labelledby="cta-title" className="overflow-hidden">
      <div aria-hidden="true" className="glow-brand pointer-events-none absolute -top-64 -right-64 size-[52rem] opacity-45" />
      <div className="relative grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="lg:pt-6">
          <SectionHeading
            id="cta-title"
            eyebrow="Get a quote"
            title={<>Tell Us What You Need to <span className="text-brand-gradient">Monitor</span></>}
            subtitle="Share your rooms, freezers, vehicles or sites. We'll recommend the right loggers and send you a quote."
          />
          <ul className="mt-8 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-slate-200">
                <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-cyan-400" />
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={whatsappHref()} variant="whatsapp" size="lg">
              <WhatsAppIcon className="size-5" />
              WhatsApp us
            </Button>
            <Button href={telHref} variant="outline" size="lg">
              <PhoneIcon className="size-5" />
              {siteConfig.phone.display}
            </Button>
          </div>
        </div>
        <EnquiryForm variant="compact" title="Request a quote" className="shadow-glow" />
      </div>
    </Section>
  );
}
