import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /** "narrow" for long-form text such as blog posts and legal pages. */
  size?: "default" | "narrow";
};

export default function Container({ children, className, size = "default" }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        size === "narrow" ? "max-w-3xl" : "max-w-7xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
