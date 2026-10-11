import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "outline" | "whatsapp" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  /** Stretch to the container width. */
  block?: boolean;
};

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string };
type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60";

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm sm:text-base",
  lg: "h-13 px-7 text-base",
};

// Outline and ghost adapt automatically inside <Section tone="dark">.
const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white shadow-sm hover:bg-brand-700 focus-visible:outline-brand-500 group-data-[tone=dark]/section:focus-visible:outline-cyan-400",
  outline:
    "border-2 border-brand-600 text-brand-600 hover:bg-brand-50 group-data-[tone=dark]/section:border-white/70 group-data-[tone=dark]/section:text-white group-data-[tone=dark]/section:hover:bg-white/10",
  // WhatsApp green with dark text: white on #25D366 is only 1.98:1.
  whatsapp: "bg-whatsapp text-navy-950 shadow-sm hover:brightness-95 focus-visible:outline-whatsapp",
  ghost:
    "text-brand-600 hover:bg-brand-50 group-data-[tone=dark]/section:text-white group-data-[tone=dark]/section:hover:bg-white/10",
};

/** Internal links use next/link; tel:, mailto: and external URLs use a plain <a>. */
function isInternal(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

export function buttonClasses({
  variant = "primary",
  size = "md",
  block = false,
  className,
}: Pick<CommonProps, "variant" | "size" | "block" | "className">) {
  return cn(base, sizes[size], variants[variant], block && "w-full", className);
}

export default function Button(props: ButtonProps) {
  const { variant, size, block, className, children, ...rest } = props;
  const classes = buttonClasses({ variant, size, block, className });

  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest as ButtonAsLink;
    if (isInternal(href)) {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {children}
        </Link>
      );
    }
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest as ButtonAsButton;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
