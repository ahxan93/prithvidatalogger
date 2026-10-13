import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { allFlatSlugs, findLocation, pathForFlatSlug } from "@/data/locations";
import { findAreaByPath } from "@/lib/areas";

// OG image for a location page (1200x630). A route handler rather than the
// opengraph-image file convention, which cannot sit under a catch-all segment.
const size = { width: 1200, height: 630 };

export function generateStaticParams() {
  return allFlatSlugs()
    .filter((slug) => {
      const path = pathForFlatSlug(slug);
      return path && (findLocation(path) || findAreaByPath(path));
    })
    .map((slug) => ({ slug }));
}

const NAVY = "#0b1026";
const ACCENT_FROM = "#487ef7";
const ACCENT_TO = "#22d3ee";

// The asset doesn't depend on request data, so read it once at module scope.
const logoData = await readFile(join(process.cwd(), "public", siteConfig.logo));
const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug: flat } = await params;
  const slug = pathForFlatSlug(flat) ?? [];
  const location = findLocation(slug);
  const found = location ? undefined : findAreaByPath(slug);
  const cityTrail = found ? findLocation(found.cityPath)?.trail : undefined;
  const place = found?.area.name ?? location?.node.name ?? "India & the GCC";
  const region = found
    ? (cityTrail ?? []).map((n) => n.name).reverse().join(", ")
    : location
      ? location.trail.slice(0, -1).map((n) => n.name).reverse().join(", ")
      : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: NAVY,
          padding: "0 80px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            alignItems: "center",
            background: "#ffffff",
            borderRadius: 18,
            padding: "18px 30px",
            marginBottom: 56,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse requires a raw <img> */}
          <img src={logoSrc} width={300} height={66} alt="" />
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, color: "#ffffff", lineHeight: 1.1 }}>
          Temperature Data Loggers in {place}
        </div>
        {region && (
          <div style={{ display: "flex", fontSize: 34, color: "#a9b4d4", marginTop: 28 }}>{region}</div>
        )}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 12,
            background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
