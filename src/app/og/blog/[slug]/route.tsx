import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { siteConfig } from "@/config/site";
import { getBlogCoverDevice } from "@/data/page-heroes";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

// Open Graph image for a blog post: the same cover photo the post shows on the
// page and in the blog list, beside the post title and the Prithvi logo.
const size = { width: 1200, height: 630 };

export async function generateStaticParams() {
  const posts = await getAllPosts();
  // Cache Components needs at least one param at build time.
  return posts.length > 0 ? posts.map((post) => ({ slug: post.slug })) : [{ slug: "__placeholder__" }];
}

const logoData = await readFile(join(process.cwd(), "public", siteConfig.logo));
const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return new Response("Not found", { status: 404 });

  const device = getBlogCoverDevice(slug);
  // The OG renderer can't decode WebP, so hand it a PNG.
  const png = await sharp(join(process.cwd(), "public", device.src)).png().toBuffer();
  const photoSrc = `data:image/png;base64,${png.toString("base64")}`;
  const titleSize = post.title.length > 70 ? 44 : post.title.length > 50 ? 50 : 58;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0b1026", position: "relative" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "60%",
            padding: "56px 56px",
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
              marginBottom: 40,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse requires a raw <img> */}
            <img src={logoSrc} width={212} height={47} alt="" />
          </div>
          <div style={{ display: "flex", fontSize: titleSize, fontWeight: 700, color: "#ffffff", lineHeight: 1.15 }}>
            {post.title}
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#a9b4d4", marginTop: 28 }}>
            {siteConfig.name} blog
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40%", padding: 36 }}>
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
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse requires a raw <img> */}
            <img src={photoSrc} style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 10,
            background: "linear-gradient(90deg, #487ef7, #22d3ee)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
