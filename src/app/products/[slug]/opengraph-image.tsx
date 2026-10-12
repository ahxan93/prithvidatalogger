import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { getProductBySlug, products } from "@/data/products";
import { getVariantImage } from "@/lib/images";
import { siteConfig } from "@/config/site";

export const alt = "Prithvi Data Loggers product";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

const NAVY = "#0b1026";
const ACCENT_FROM = "#487ef7";
const ACCENT_TO = "#22d3ee";

// Asset doesn't depend on request data, so read it once at module scope.
const logoData = await readFile(join(process.cwd(), "public", siteConfig.logo));
const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  let photoSrc: string | undefined;
  if (product) {
    // Series photo, or for accessories the first accessory's own photo.
    const photoPath = (await getVariantImage(product, product.variants[0]))?.src;
    if (photoPath) {
      // The OG renderer can't decode WebP, so hand it a PNG.
      const png = await sharp(join(process.cwd(), "public", photoPath)).png().toBuffer();
      photoSrc = `data:image/png;base64,${png.toString("base64")}`;
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: NAVY,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: photoSrc ? "60%" : "100%",
            padding: "64px 56px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              alignItems: "center",
              background: "#ffffff",
              borderRadius: 16,
              padding: "14px 22px",
              marginBottom: 48,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse requires a raw <img> */}
            <img src={logoSrc} width={212} height={47} alt="" />
          </div>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 700, color: "#ffffff", lineHeight: 1.1 }}>
            {product?.name ?? siteConfig.name}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#a9b4d4", marginTop: 24, lineHeight: 1.4 }}>
            {product?.summary ?? siteConfig.description}
          </div>
        </div>
        {photoSrc && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "42%",
              padding: 36,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                borderRadius: 24,
                background: "#ffffff",
                padding: 20,
              }}
            >
              {/* object-fit: contain, not cover — the product photos have very
                  different aspect ratios (portrait vs. landscape), and cover
                  would crop the device or its on-screen label unpredictably. */}
              {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse requires a raw <img> */}
              <img
                src={photoSrc}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                alt=""
              />
            </div>
          </div>
        )}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 10,
            background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
