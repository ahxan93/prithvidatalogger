import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { PlusIcon } from "@/components/ui/icons";
import { faqSchema } from "@/lib/schema";
import { cn } from "@/lib/cn";

export type FaqItem = {
  question: string;
  answer: string;
  /** Optional internal link shown after the answer (descriptive anchor text). */
  link?: { href: string; text: string };
};

type FaqProps = {
  items: FaqItem[];
  /** Emit FAQPage JSON-LD for these questions (once per page). */
  withSchema?: boolean;
  className?: string;
};

// Native <details> accordion: keyboard accessible, works without JavaScript,
// and the answers stay in the HTML for search engines.
export default function Faq({ items, withSchema = true, className }: FaqProps) {
  return (
    <div className={cn("divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-soft", className)}>
      {withSchema && <JsonLd data={faqSchema(items)} />}
      {items.map((item, i) => (
        <details key={item.question} className="group/faq" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 text-left font-heading text-base font-semibold text-ink transition-colors hover:text-brand-600 sm:px-6 sm:text-lg [&::-webkit-details-marker]:hidden">
            {item.question}
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-transform duration-300 group-open/faq:rotate-45"
            >
              <PlusIcon className="size-4" />
            </span>
          </summary>
          <p className="px-5 pb-6 leading-relaxed text-muted sm:px-6">
            {item.answer}
            {item.link && (
              <>
                {" "}
                <Link href={item.link.href} className="font-semibold text-brand-600 underline underline-offset-4">
                  {item.link.text}
                </Link>
                .
              </>
            )}
          </p>
        </details>
      ))}
    </div>
  );
}
