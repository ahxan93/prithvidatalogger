import { processEnquiry } from "@/lib/enquiry-mail";

// Sends the enquiry form by email over SMTP (Nodemailer), so it needs the Node.js runtime.
// next.config.ts enables cacheComponents, which rejects the `runtime` and `dynamic` route segment exports:
// Node.js is the default runtime and a POST handler is never cached or prerendered, so it is always dynamic.

// Only POST is exported, so Next.js answers every other method (GET, PUT, ...) with 405 and an Allow header.
export async function POST(request: Request) {
  // Behind Vercel / a reverse proxy the first x-forwarded-for entry is the client address.
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";

  const result = await processEnquiry({
    rawBody: await request.text(),
    ip,
    env: process.env,
    isDev: process.env.NODE_ENV === "development",
  });

  const headers: Record<string, string> = { "Cache-Control": "no-store" };
  if (result.retryAfter) headers["Retry-After"] = String(result.retryAfter);
  return Response.json(result.body, { status: result.status, headers });
}
