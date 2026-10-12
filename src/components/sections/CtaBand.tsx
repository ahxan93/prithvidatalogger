import { siteConfig } from "@/config/site";
import { quoteHref } from "@/data/navigation";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import { ArrowRightIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { telHref, whatsappHref } from "@/lib/contact";

type CtaBandProps = {
  title: string;
  text?: string;
  /** Named in the WhatsApp message, e.g. "Setu series". */
  product?: string;
  /** Where "Get Solution" goes. Defaults to the enquiry form on /contact. */
  quoteHref?: string;
  id?: string;
};

// Closing call-to-action band. The only CTAs allowed site-wide:
// Get Solution, WhatsApp, Call (see CLAUDE.md).
export default function CtaBand({ title, text, product, quoteHref: href = quoteHref, id = "cta" }: CtaBandProps) {
  return (
    <Section tone="dark" aria-labelledby={`${id}-title`} className="overflow-hidden">
      <div aria-hidden="true" className="glow-brand pointer-events-none absolute -top-64 left-1/2 size-[56rem] -translate-x-1/2 opacity-40" />
      <div className="relative mx-auto max-w-3xl text-center">
        <h2 id={`${id}-title`} className="font-heading text-3xl font-bold text-white sm:text-4xl">
          {title}
        </h2>
        {text && <p className="mt-4 text-lg leading-relaxed text-slate-300 text-pretty">{text}</p>}
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={href} size="lg" className="shadow-glow">
            Get Solution
            <ArrowRightIcon className="size-5" />
          </Button>
          <Button href={whatsappHref(product)} variant="whatsapp" size="lg">
            <WhatsAppIcon className="size-5" />
            WhatsApp
          </Button>
          <Button href={telHref} variant="outline" size="lg" aria-label={`Call ${siteConfig.phone.display}`}>
            <PhoneIcon className="size-5" />
            Call
          </Button>
        </div>
      </div>
    </Section>
  );
}
