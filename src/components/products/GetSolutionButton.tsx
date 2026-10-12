import Button, { type ButtonSize } from "@/components/ui/Button";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/ui/icons";
import { whatsappHref } from "@/lib/contact";
import { cn } from "@/lib/cn";

type GetSolutionButtonProps = {
  /** Where "Get Solution" leads, e.g. `/products/${slug}#enquiry` — the target
   * page's own EnquiryForm has `defaultProduct` set to preselect it there. */
  href: string;
  /**
   * Product/series/accessory name, e.g. "Nakshatra". Always used for the
   * button's accessible name ("Get a solution for Nakshatra"); also shown in
   * the visible label ("Get Nakshatra Solution") when `descriptive` is set.
   * Omit only where no single product is being linked to.
   */
  productName?: string;
  /** Show `productName` in the visible label, not just the aria-label. Set
   * this only where there's room for the longer text (a single large CTA,
   * not a repeated card-grid button). */
  descriptive?: boolean;
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
  productName,
  descriptive = false,
  whatsappProduct,
  size = "md",
  block,
  className,
}: GetSolutionButtonProps) {
  const showName = descriptive && productName;
  return (
    <div className={cn("relative z-10 flex items-center gap-2", className)}>
      <Button
        href={href}
        size={size}
        block={block}
        aria-label={productName && !showName ? `Get a solution for ${productName}` : undefined}
      >
        {showName ? `Get ${productName} Solution` : "Get Solution"}
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
