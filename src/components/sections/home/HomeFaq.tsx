import Link from "next/link";
import { homeFaqs } from "@/data/home";
import Faq from "@/components/ui/Faq";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export default function HomeFaq() {
  return (
    <Section tone="surface" aria-labelledby="faq-title">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            id="faq-title"
            eyebrow="FAQ"
            title="Questions Buyers Ask Us"
            subtitle="Quick answers on connectivity, batteries, data, calibration and ordering."
          />
          <p className="mt-6 text-sm text-muted">
            Something else?{" "}
            <Link href="/contact" className="font-semibold text-brand-600 underline underline-offset-4">
              Ask our team
            </Link>
            .
          </p>
        </div>
        <Faq items={homeFaqs} />
      </div>
    </Section>
  );
}
