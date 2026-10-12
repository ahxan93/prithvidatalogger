import Button, { type ButtonSize } from "@/components/ui/Button";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/ui/icons";
import { whatsappHref } from "@/lib/contact";
import { cn } from "@/lib/cn";

type GetSolutionButtonProps = {
  /** Where "Get Solution" leads, e.g. `/products/${slug}#enquiry` — the target
   * page's own EnquiryForm has `defaultProduct` set to preselect it there. */
  href: string;
  /** Shows a secondary WhatsApp button with this product named in the message, when there's room. */
  whatsappProduct?: string;
  size?: ButtonSize;
  block?: boolean;
  className?: string;
};

// Replaces every price display site-wide (owner decision: no prices shown).
// Sits inside stretched-link cards, so it needs its own stacking context to
// stay clickable above the card's full-bleed ::after overlay link.
export default function GetSolutionButton({
  href,
  whatsappProduct,
  size = "md",
  block,
  className,
}: GetSolutionButtonProps) {
  return (
    <div className={cn("relative z-10 flex items-center gap-2", className)}>
      <Button href={href} size={size} block={block}>
        Get Solution
        <ArrowRightIcon className="size-4" />
      </Button>
      {whatsappProduct !== undefined && (
        <Button
          href={whatsappHref(whatsappProduct)}
          variant="whatsapp"
          size={size}
          aria-label={`Ask about ${whatsappProduct} on WhatsApp`}
        >
          <WhatsAppIcon className="size-4" />
        </Button>
      )}
    </div>
  );
}
