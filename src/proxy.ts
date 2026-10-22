import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { siteConfig } from "@/config/site";

// siteConfig.url is "https://prithvidatalogger.com" — derive the bare host from it
// rather than hard-coding it a second time.
const PRODUCTION_HOST = new URL(siteConfig.url).hostname;

// www of the production domain, and the old prithvidataloggers.com domain (apex and www): none of
// these is served, they all 308-redirect to the apex production host.
const REDIRECTED_HOSTS = new Set([
  `www.${PRODUCTION_HOST}`,
  "prithvidataloggers.com",
  "www.prithvidataloggers.com",
]);

// Set in Vercel once the custom domain is connected and verified. Until then
// this stays unset/false, so the *.vercel.app redirect below is a no-op and the
// site is reachable (but noindexed) on the *.vercel.app preview URL.
const PRODUCTION_DOMAIN_LIVE = process.env.PRODUCTION_DOMAIN_LIVE === "true";

function redirectToProduction(request: NextRequest, noindex: boolean) {
  const url = request.nextUrl.clone();
  url.protocol = "https:";
  url.host = PRODUCTION_HOST;
  url.port = "";
  const redirect = NextResponse.redirect(url, 308);
  if (noindex) redirect.headers.set("X-Robots-Tag", "noindex, nofollow");
  return redirect;
}

export function proxy(request: NextRequest) {
  // request.nextUrl.hostname reflects the raw connection URL, not the Host
  // header, under self-hosted `next start` (it reads back as "localhost"
  // even when a different Host header is sent) — confirmed by testing
  // locally. The Host header itself is the reliable source in every
  // deployment target (Vercel's edge, a reverse proxy, or bare `next start`).
  const hostname = (request.headers.get("host") ?? request.nextUrl.hostname)
    .split(":")[0]
    .toLowerCase();

  // www and the old domain go to the apex, path and query preserved. Never noindexed or served.
  if (REDIRECTED_HOSTS.has(hostname)) return redirectToProduction(request, false);

  // Once the custom domain is live, send any *.vercel.app visit (e.g. the
  // project's default prithvidatalogger.vercel.app URL) straight to the real
  // domain. Scoped to *.vercel.app specifically — never fires for localhost
  // or any other non-production host.
  if (PRODUCTION_DOMAIN_LIVE && hostname.endsWith(".vercel.app")) return redirectToProduction(request, true);

  const response = NextResponse.next();

  // Belt-and-braces alongside the client-injected <meta name="robots"> (see
  // HostNoindexMeta.tsx): while the site is reachable on any host that isn't
  // the production domain — chiefly the Vercel preview URL before the custom
  // domain is connected — tell search engines to stay away. The production
  // apex host never gets this header, so it stays index,follow as normal.
  if (hostname !== PRODUCTION_HOST) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|googleaedf7419be008282.html).*)"],
};
