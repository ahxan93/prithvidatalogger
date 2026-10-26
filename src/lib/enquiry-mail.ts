import nodemailer from "nodemailer";
import type { SendMailOptions, Transporter } from "nodemailer";

/**
 * Server-side enquiry handling: validation, rate limit, mail building and sending.
 * Kept free of Next.js imports (and of "@/" aliases) so scripts/test-enquiry.mjs can run it directly.
 * The route handler (src/app/api/enquiry/route.ts) only wires a Request to processEnquiry().
 */

// ---------------------------------------------------------------- limits

const MAX_BODY_BYTES = 10_000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const SMTP_TIMEOUT_MS = 10_000;

const MAX_LENGTH = {
  name: 100,
  phone: 30,
  company: 120,
  email: 254,
  location: 120,
  industry: 80,
  connectivity: 100,
  quantity: 6,
  product: 120,
  city: 80,
  pageUrl: 500,
} as const;

// ---------------------------------------------------------------- types

export type Enquiry = {
  name: string;
  phone: string;
  company?: string;
  email?: string;
  location?: string;
  industry?: string;
  connectivity?: string;
  quantity?: string;
  product?: string;
  city?: string;
  pageUrl?: string;
};

export type EnquiryResult =
  | { status: 200; body: { ok: true }; retryAfter?: undefined }
  | { status: number; body: { ok: false; message: string }; retryAfter?: number };

export type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  to: string;
  from: string;
};

type Env = Record<string, string | undefined>;
type CreateTransport = (config: SmtpConfig) => Pick<Transporter, "sendMail">;

// ---------------------------------------------------------------- configuration

const REQUIRED_ENV = ["SMTP_HOST", "SMTP_PORT", "SMTP_SECURE", "SMTP_USER", "SMTP_PASS", "ENQUIRY_TO", "ENQUIRY_FROM"] as const;

export function readSmtpConfig(env: Env): { ok: true; config: SmtpConfig } | { ok: false; missing: string[] } {
  const missing: string[] = REQUIRED_ENV.filter((key) => !env[key]?.trim());
  const port = Number(env.SMTP_PORT);
  const secure = env.SMTP_SECURE?.trim().toLowerCase();
  if (env.SMTP_PORT?.trim() && !(Number.isInteger(port) && port > 0 && port < 65536)) missing.push("SMTP_PORT (invalid)");
  if (secure && secure !== "true" && secure !== "false") missing.push('SMTP_SECURE (must be "true" or "false")');
  if (missing.length) return { ok: false, missing };
  return {
    ok: true,
    config: {
      host: env.SMTP_HOST!.trim(),
      port,
      secure: secure === "true",
      user: env.SMTP_USER!.trim(),
      pass: env.SMTP_PASS!,
      to: env.ENQUIRY_TO!.trim(),
      from: env.ENQUIRY_FROM!.trim(),
    },
  };
}

function defaultCreateTransport(config: SmtpConfig) {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
    connectionTimeout: SMTP_TIMEOUT_MS,
    greetingTimeout: SMTP_TIMEOUT_MS,
    socketTimeout: SMTP_TIMEOUT_MS,
  });
}

// ---------------------------------------------------------------- rate limit

// Per-IP sliding window held in this process's memory. On serverless hosting (Vercel) every cold
// instance starts with an empty map and instances do not share it, so this is best-effort only: it
// stops a single client hammering one warm instance, not a determined or distributed attacker.
const hits = new Map<string, number[]>();

export function resetRateLimit() {
  hits.clear();
}

/** Returns 0 when the request is allowed, otherwise the seconds until the oldest hit expires. */
function rateLimit(ip: string, now: number): number {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    hits.set(ip, recent);
    return Math.ceil((recent[0] + RATE_LIMIT_WINDOW_MS - now) / 1000);
  }
  recent.push(now);
  hits.set(ip, recent);
  // Drop idle IPs so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [key, times] of hits) if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(key);
  }
  return 0;
}

// ---------------------------------------------------------------- validation

/** Strip control characters (blocks header injection) and collapse whitespace. */
function clean(value: string): string {
  return value.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
}

type Validation = { ok: true; data: Enquiry } | { ok: false; message: string };

export function validateEnquiry(raw: unknown): Validation {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return { ok: false, message: "Invalid request." };
  const body = raw as Record<string, unknown>;

  // Optional text field: undefined when absent/blank, an Error when the wrong type or too long.
  const text = (key: string, max: number, label: string): string | undefined | Error => {
    const v = body[key];
    if (v === undefined || v === null || v === "") return undefined;
    if (typeof v !== "string" && typeof v !== "number") return new Error(`${label} is invalid.`);
    const s = clean(String(v));
    if (s.length > max) return new Error(`${label} is too long.`);
    return s || undefined;
  };

  const fields = {
    name: text("Full name", MAX_LENGTH.name, "Full name"),
    phone: text("Phone", MAX_LENGTH.phone, "Phone"),
    company: text("Company", MAX_LENGTH.company, "Company"),
    email: text("Email", MAX_LENGTH.email, "Email"),
    location: text("Country/City", MAX_LENGTH.location, "Country/City"),
    industry: text("Industry", MAX_LENGTH.industry, "Industry"),
    connectivity: text("Connectivity", MAX_LENGTH.connectivity, "Connectivity"),
    quantity: text("Quantity", MAX_LENGTH.quantity, "Quantity"),
    product: text("Product of interest", MAX_LENGTH.product, "Product of interest"),
    city: text("Page city", MAX_LENGTH.city, "Page city"),
    pageUrl: text("page_url", MAX_LENGTH.pageUrl, "Page URL"),
  };
  for (const v of Object.values(fields)) if (v instanceof Error) return { ok: false, message: v.message };
  const f = fields as Record<keyof typeof fields, string | undefined>;

  // Same rules as EnquiryForm.tsx validate().
  if (!f.name || f.name.length < 2) return { ok: false, message: "Please enter your full name." };
  if (!f.phone) return { ok: false, message: "Please enter your phone number." };
  // The form sends the country code and number joined, e.g. "+91 98765 43210".
  if (!/^\+?\d{6,18}$/.test(f.phone.replace(/[\s()-]/g, "")))
    return { ok: false, message: "Please enter a valid phone number." };
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email))
    return { ok: false, message: "Please enter a valid email address." };
  if (f.quantity && (!/^\d{1,6}$/.test(f.quantity) || Number(f.quantity) < 1))
    return { ok: false, message: "Please enter a quantity of 1 or more." };
  const consent = body.consent;
  if (!(consent === true || (typeof consent === "string" && /^(yes|true|on)$/i.test(consent.trim()))))
    return { ok: false, message: "Please accept the privacy policy so we can contact you." };

  // Only http(s) URLs are shown in the mail.
  const pageUrl = f.pageUrl && /^https?:\/\//i.test(f.pageUrl) ? f.pageUrl : undefined;

  return { ok: true, data: { ...f, name: f.name, phone: f.phone, pageUrl } };
}

// ---------------------------------------------------------------- mail

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildMail(data: Enquiry, config: Pick<SmtpConfig, "from" | "to">): SendMailOptions {
  // Only filled fields appear, in this order.
  const rows: [string, string | undefined][] = [
    ["Full name", data.name],
    ["Phone", data.phone],
    ["Company", data.company],
    ["Email", data.email],
    ["Country/City", data.location],
    ["Industry", data.industry],
    ["Connectivity", data.connectivity],
    ["Quantity", data.quantity],
    ["Product of interest", data.product],
    ["Page city", data.city],
    ["Page URL", data.pageUrl],
  ];
  const filled = rows.filter((r): r is [string, string] => !!r[1]);

  const text = ["New enquiry from the website", "", ...filled.map(([k, v]) => `${k}: ${v}`)].join("\n");
  const html =
    `<h2 style="font-family:Arial,sans-serif;font-size:18px">New enquiry from the website</h2>` +
    `<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">` +
    filled
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;vertical-align:top">${escapeHtml(k)}</td>` +
          `<td style="padding:4px 0">${escapeHtml(v)}</td></tr>`,
      )
      .join("") +
    `</table>`;

  return {
    from: config.from,
    to: config.to,
    replyTo: data.email,
    subject: `New enquiry - ${data.industry || "General"} - ${data.name}`,
    text,
    html,
  };
}

// ---------------------------------------------------------------- entry point

export async function processEnquiry(opts: {
  rawBody: string;
  ip: string;
  env: Env;
  isDev: boolean;
  now?: number;
  createTransport?: CreateTransport;
}): Promise<EnquiryResult> {
  const { rawBody, ip, env, isDev, now = Date.now(), createTransport = defaultCreateTransport } = opts;

  if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES)
    return { status: 413, body: { ok: false, message: "Request is too large." } };

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    return { status: 400, body: { ok: false, message: "Invalid request." } };
  }

  // Honeypot: bots fill it. Pretend success so they learn nothing, and send nothing.
  const trap = (parsed as Record<string, unknown> | null)?.botcheck;
  if (trap === true || (typeof trap === "string" && trap.trim() !== "")) return { status: 200, body: { ok: true } };

  const wait = rateLimit(ip, now);
  if (wait > 0)
    return {
      status: 429,
      body: { ok: false, message: "Too many enquiries from your network. Please try again later or message us on WhatsApp." },
      retryAfter: wait,
    };

  const valid = validateEnquiry(parsed);
  if (!valid.ok) return { status: 400, body: { ok: false, message: valid.message } };

  const cfg = readSmtpConfig(env);
  if (!cfg.ok) {
    // Names the variables only, never their values.
    console.error(`[enquiry] Email not configured; missing or invalid environment variable(s): ${cfg.missing.join(", ")}`);
    return {
      status: 503,
      body: {
        ok: false,
        message: isDev
          ? `Email not configured (set ${cfg.missing.join(", ")} in .env.local). Enquiry was not sent.`
          : "Enquiries are temporarily unavailable. Please message us on WhatsApp.",
      },
    };
  }

  try {
    await createTransport(cfg.config).sendMail(buildMail(valid.data, cfg.config));
    return { status: 200, body: { ok: true } };
  } catch (error) {
    // Server log only; SMTP details (host, codes, responses) never reach the browser.
    const code = (error as { code?: string })?.code ?? "unknown";
    console.error(`[enquiry] Sending failed (${code}): ${(error as Error)?.message ?? error}`);
    return { status: 502, body: { ok: false, message: "Your enquiry could not be sent. Please try again or message us on WhatsApp." } };
  }
}
