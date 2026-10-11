import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Hover lift + stronger shadow, for cards that contain a link. */
  interactive?: boolean;
  as?: "div" | "article" | "li";
};

export default function Card({ children, className, interactive = false, as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={cn(
        "relative rounded-2xl border border-slate-200/80 bg-white p-6 text-ink shadow-soft",
        "group-data-[tone=dark]/section:border-white/10 group-data-[tone=dark]/section:bg-navy-900 group-data-[tone=dark]/section:text-white",
        interactive &&
          "transition duration-300 hover:border-brand-200 hover:shadow-soft-lg motion-safe:hover:-translate-y-1 focus-within:border-brand-300",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
