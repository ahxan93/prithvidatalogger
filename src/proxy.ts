import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { siteConfig } from "@/config/site";

// siteConfig.url is "https://prithvidataloggers.com" — derive the bare host from it
// rather than hard-coding it a second time.
const PRODUCTION_HOST = new URL(siteConfig.url).hostname;

// Set in Vercel once the custom domain is connected and verified. Until then
// this stays unset/false, so the redirect below is a no-op and the site is
// reachable (but noindexed) on the *.vercel.app preview URL.
const PRODUCTION_DOMAIN_LIVE = process.env.PRODUCTION_DOMAIN_LIVE === "true";

export function proxy(request: NextRequest) {
  // request.nextUrl.hostname reflects the raw connection URL, not the Host
  // header, under self-hosted `next start` (it reads back as "localhost"
  // even when a different Host header is sent) — confirmed by testing
  // locally. The Host header itself is the reliable source in every
  // deployment target (Vercel's edge, a reverse proxy, or bare `next start`).
  const hostname = (request.headers.get("host") ?? request.nextUrl.hostname)
    .split(":")[0]
    .toLowerCase();
  const isProductionHost = hostname === PRODUCTION_HOST;

  // Once the custom domain is live, send any *.vercel.app visit (e.g. the
  // project's default prithvidatalogger.vercel.app URL) straight to the real
  // domain, path and query preserved. Scoped to *.vercel.app specifically —
  // never fires for localhost or any other non-production host.
  if (PRODUCTION_DOMAIN_LIVE && hostname.endsWith(".vercel.app")) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = PRODUCTION_HOST;
    url.port = "";
    const redirect = NextResponse.redirect(url, 308);
    redirect.headers.set("X-Robots-Tag", "noindex, nofollow");
    return redirect;
  }

  const response = NextResponse.next();

  // Belt-and-braces alongside the client-injected <meta name="robots"> (see
  // HostNoindexMeta.tsx): while the site is reachable on any host that isn't
  // the production domain — chiefly the Vercel preview URL before the custom
  // domain is connected — tell search engines to stay away. The production
  // host never gets this header, so it stays index,follow as normal.
  if (!isProductionHost) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|googleaedf7419be008282.html).*)"],
};
