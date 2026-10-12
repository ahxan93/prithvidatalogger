import Image from "next/image";
import { siteConfig } from "@/config/site";
import { publicImageExists } from "@/lib/images";

// Intrinsic size of public/images/logo/prithvi-data-loggers-logo.png.
const LOGO_WIDTH = 636;
const LOGO_HEIGHT = 140;

// Optional white version for dark backgrounds. Derived from the main logo path
// (not written as a literal) because the file may not exist yet.
const WHITE_LOGO = siteConfig.logo.replace(/\.png$/, "-white.png");

// The current logo is opaque (blue on white), so `brightness-0 invert` would turn
// it into a solid white box, and mix-blend tricks can't see through the fixed
// header's layer. Instead an SVG colour-matrix filter sets every pixel to white
// and derives alpha from darkness (alpha = 1.5 × (1 − luminance)): the white
// background becomes fully transparent, the blue artwork fully opaque white.
// Works on any background. <LogoFilterDefs /> is rendered once in the root layout.
const WHITE_FILTER_ID = "logo-to-white";
// Written out literally: Tailwind's scanner can't see classes built with ${}.
const WHITE_FALLBACK_CLASSES = "[filter:url(#logo-to-white)]";

export function LogoFilterDefs() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute">
      {/* Region = the image box exactly. The default region adds a 10% margin of
          transparent black, which this matrix would paint as a white frame. */}
      <filter id={WHITE_FILTER_ID} colorInterpolationFilters="sRGB" x="0" y="0" width="1" height="1">
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -0.3189 -1.0728 -0.1083 0 1.5"
        />
      </filter>
    </svg>
  );
}

type LogoProps = {
  /** "white" is for dark backgrounds (hero, footer, mobile menu). */
  variant?: "default" | "white";
  className?: string;
  /** Preload for above-the-fold usage (e.g. the header). */
  preload?: boolean;
};

export default async function Logo({
  variant = "default",
  className = "h-10 w-auto",
  preload = false,
}: LogoProps) {
  const useWhiteFile = variant === "white" && (await publicImageExists(WHITE_LOGO));
  const fallback = variant === "white" && !useWhiteFile;

  return (
    <Image
      src={useWhiteFile ? WHITE_LOGO : siteConfig.logo}
      alt={siteConfig.name}
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      preload={preload}
      className={fallback ? `${className} ${WHITE_FALLBACK_CLASSES}` : className}
    />
  );
}
