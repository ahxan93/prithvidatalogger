// Tests the enquiry mail logic with Nodemailer's jsonTransport (nothing is sent, no real SMTP needed).
// Run: npm run test:enquiry  
import nodemailer from "nodemailer";
import {
  processEnquiry,
  resetRateLimit,
} from "../src/lib/enquiry-mail.ts";

const ENV = {
  SMTP_HOST: "smtp.example.com",
  SMTP_PORT: "465",
  SMTP_SECURE: "true",
  SMTP_USER: "enquiries@example.com",
  SMTP_PASS: "test-password-not-real",
  ENQUIRY_TO: "sales@example.com",
  ENQUIRY_FROM: "Prithvi Data Loggers <enquiries@example.com>",
};

let failed = 0;
const sent = [];
const mock = () => {
  const t = nodemailer.createTransport({ jsonTransport: true });
  return {
    sendMail: async (opts) => {
      const info = await t.sendMail(opts);
      sent.push(JSON.parse(info.message));
      return info;
    },
  };
};
const run = (body, over = {}) =>
  processEnquiry({
    rawBody: typeof body === "string" ? body : JSON.stringify(body),
    ip: "1.1.1.1",
    env: ENV,
    isDev: false,
    createTransport: mock,
    ...over,
  });
function check(name, cond, detail = "") {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${detail ? "  -> " + detail : ""}`);
  if (!cond) failed++;
}

const full = {
  "Full name": "Asha <b>Rao</b>",
  Phone: "+91 98765 43210",
  Company: "Cool & Co",
  Email: "asha@example.com",
  "Country/City": "India / Pune",
  Industry: "Pharma",
  Connectivity: "WiFi, GSM",
  Quantity: "12",
  "Product of interest": "Setu series",
  "Page city": "Pune",
  page_url: "https://prithvidatalogger.com/data-logger-pune",
  consent: "Yes",
  botcheck: "",
};
const minimal = { "Full name": "Ravi Kumar", Phone: "+91 90000 11111", consent: "Yes", botcheck: "" };

console.log("--- Full submission ---");
let r = await run(full);
check("full: 200 ok", r.status === 200 && r.body.ok === true);
console.log(JSON.stringify(sent[0], null, 2));
console.log("\n--- Minimal submission ---");
resetRateLimit();
r = await run(minimal);
check("minimal: 200 ok", r.status === 200 && r.body.ok === true);
console.log(JSON.stringify(sent[1], null, 2));
console.log("\n--- Checks ---");

const [m1, m2] = sent;
check("subject uses industry", m1.subject === "New enquiry - Pharma - Asha <b>Rao</b>", m1.subject);
check("subject falls back to General", m2.subject === "New enquiry - General - Ravi Kumar", m2.subject);
check("Reply-To set when email given", m1.replyTo?.[0]?.address === "asha@example.com");
check("no Reply-To when no email", !m2.replyTo);
check("From/To from env", m1.from.address === "enquiries@example.com" && m1.to[0].address === "sales@example.com");
check("HTML escapes user text", m1.html.includes("Asha &lt;b&gt;Rao&lt;/b&gt;") && !m1.html.includes("<b>Rao"));
check("HTML escapes ampersand", m1.html.includes("Cool &amp; Co"));
check("text part present", m1.text.includes("Full name: Asha <b>Rao</b>"));
check("minimal lists only name and phone", m2.text.split("\n").filter((l) => l.includes(": ")).length === 2 && !m2.html.includes("Company"));
check("full lists page URL and page city", m1.text.includes("Page city: Pune") && m1.text.includes("Page URL: https://"));

const before = sent.length;
resetRateLimit();
r = await run({ ...minimal, "Full name": "" });
check("missing name -> 400", r.status === 400, r.body.message);
r = await run({ ...minimal, Phone: "" });
check("missing phone -> 400", r.status === 400, r.body.message);
r = await run({ ...minimal, Email: "not-an-email" });
check("bad email -> 400", r.status === 400, r.body.message);
r = await run({ ...minimal, Quantity: "0" });
check("quantity 0 -> 400", r.status === 400, r.body.message);
r = await run({ ...minimal, consent: "" });
check("no consent -> 400", r.status === 400, r.body.message);
resetRateLimit(); // invalid requests also count towards the per-IP limit
r = await run({ ...minimal, Company: "x".repeat(500) });
check("over-long field -> 400", r.status === 400, r.body.message);
r = await run("x".repeat(20000));
check("oversized body -> 413", r.status === 413);
r = await run("{not json");
check("bad JSON -> 400", r.status === 400);
check("none of the invalid requests sent mail", sent.length === before);

r = await run({ ...minimal, botcheck: "on" });
check("honeypot -> 200 ok but nothing sent", r.status === 200 && r.body.ok === true && sent.length === before);

resetRateLimit();
const codes = [];
for (let i = 0; i < 7; i++) codes.push((await run(minimal, { ip: "9.9.9.9", now: 1_000_000 + i })).status);
check("rate limit: 5 allowed then 429", codes.join() === "200,200,200,200,200,429,429", codes.join());
r = await run(minimal, { ip: "8.8.8.8", now: 1_000_100 });
check("rate limit is per IP", r.status === 200);
r = await run(minimal, { ip: "9.9.9.9", now: 1_000_000 + 11 * 60 * 1000 });
check("rate limit resets after 10 minutes", r.status === 200);

resetRateLimit();
const logs = [];
const origErr = console.error;
console.error = (...a) => logs.push(a.join(" "));
const noPass = { ...ENV, SMTP_PASS: undefined };
r = await run(minimal, { env: noPass, isDev: false });
console.error = origErr;
check("missing env (prod) -> 503, generic message", r.status === 503 && !r.body.message.includes("SMTP_"), r.body.message);
check("server log names SMTP_PASS, not its value", logs[0]?.includes("SMTP_PASS") && !logs[0].includes("test-password"), logs[0]);

console.error = (...a) => logs.push(a.join(" "));
r = await run(minimal, { env: {}, isDev: true });
console.error = origErr;
check('missing env (dev) -> 503 "Email not configured"', r.status === 503 && r.body.message.startsWith("Email not configured"), r.body.message);

console.error = (...a) => logs.push(a.join(" "));
r = await run(minimal, {
  createTransport: () => ({
    sendMail: async () => {
      throw Object.assign(new Error("535 auth failed for smtp.example.com test-password-not-real"), { code: "EAUTH" });
    },
  }),
});
console.error = origErr;
check("SMTP failure -> 502, no SMTP details to browser", r.status === 502 && !JSON.stringify(r.body).match(/535|smtp|EAUTH|password/i), r.body.message);

console.log(failed ? `\n${failed} FAILED` : "\nAll enquiry tests passed");
process.exit(failed ? 1 : 0);
