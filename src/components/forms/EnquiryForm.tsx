"use client";

import Link from "next/link";
import { useId, useRef, useState, type FormEvent } from "react";
import { products } from "@/data/products";
import { buildEnquiryOptions } from "@/data/enquiry";
import Button from "@/components/ui/Button";
import { AlertCircleIcon, CheckCircleIcon, SpinnerIcon, WhatsAppIcon } from "@/components/ui/icons";
import { whatsappHref } from "@/lib/contact";
import { cn } from "@/lib/cn";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const SITE_HOST = "prithvidatalogger.com";
const COMPANY_MAX_LENGTH = 120;

/** Collapse whitespace, drop control characters and angle brackets, trim and cap the length. */
function cleanText(value: string, max: number): string {
  return value
    .replace(/[\u0000-\u001f\u007f<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

/** Product options only validate the preselected product (set by Get Solution buttons). */
const PRODUCT_OPTIONS = buildEnquiryOptions(products);

const INDUSTRY_OPTIONS = [
  "Pharma",
  "Cold Chain Warehousing / Logistics",
  "Reefer Vehicles / Containers",
  "Server Rooms / Data Centres",
  "F&B / FMCG",
  "Engineering / Manufacturing",
  "Others",
] as const;

// Connection types only; product names are never listed here (Vayu is not promoted on Gulf pages).
const CONNECTIVITY_OPTIONS = ["WiFi", "GSM", "LoRa", "Offline"] as const;

// Countries served first, then "Other" for anything else.
const COUNTRY_CODES = [
  { code: "+91", label: "India (+91)" },
  { code: "+966", label: "Saudi Arabia (+966)" },
  { code: "+971", label: "UAE (+971)" },
  { code: "+974", label: "Qatar (+974)" },
  { code: "+968", label: "Oman (+968)" },
  { code: "+965", label: "Kuwait (+965)" },
  { code: "+973", label: "Bahrain (+973)" },
  { code: "+967", label: "Yemen (+967)" },
  { code: "other", label: "Other" },
];

type Values = {
  name: string;
  countryCode: string;
  phone: string;
  company: string;
  email: string;
  location: string;
  industry: string;
  connectivity: string[];
  quantity: string;
  consent: boolean;
};

type FieldName = keyof Values;
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "success" | "error";

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (v.name.trim().length < 2) errors.name = "Please enter your full name.";

  const digits = v.phone.replace(/[\s()-]/g, "");
  if (!digits) errors.phone = "Please enter your phone number.";
  else if (v.countryCode === "other" && !/^\+\d{7,15}$/.test(digits))
    errors.phone = "Include your country code, e.g. +44 7911 123456.";
  else if (v.countryCode !== "other" && !/^\d{6,14}$/.test(digits))
    errors.phone = "Please enter a valid phone number (digits only).";

  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    errors.email = "Please enter a valid email address.";

  if (v.quantity.trim() && (!/^\d{1,6}$/.test(v.quantity.trim()) || Number(v.quantity) < 1))
    errors.quantity = "Please enter a number of 1 or more.";
  if (!v.consent) errors.consent = "Please accept the privacy policy so we can contact you.";
  return errors;
}

type EnquiryFormProps = {
  /** Pre-selected product, e.g. "Setu series". Must match a dropdown value. */
  defaultProduct?: string;
  /** Single column without the optional Quantity field. */
  variant?: "default" | "compact";
  /** City page the visitor is on; sent as a hidden field and named in the email subject. */
  city?: string;
  title?: string;
  className?: string;
};

export default function EnquiryForm({
  defaultProduct = "",
  variant = "default",
  city,
  title,
  className,
}: EnquiryFormProps) {
  const compact = variant === "compact";
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const product = PRODUCT_OPTIONS.some((o) => o.value === defaultProduct) ? defaultProduct : "";
  const [values, setValues] = useState<Values>({
    name: "",
    countryCode: "+91",
    phone: "",
    company: "",
    email: "",
    location: "",
    industry: "",
    connectivity: [],
    quantity: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const fieldId = (name: FieldName) => `${id}-${name}`;
  const errorId = (name: FieldName) => `${id}-${name}-error`;

  function update<K extends FieldName>(name: K, value: Values[K]) {
    const next = { ...values, [name]: value };
    setValues(next);
    // Re-validate live once a field has been visited, so errors clear as you type.
    if (touched[name]) setErrors(validate(next));
  }

  function onBlur(name: FieldName) {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(values));
  }

  function toggleConnectivity(option: string, checked: boolean) {
    update(
      "connectivity",
      checked ? [...values.connectivity, option] : values.connectivity.filter((c) => c !== option),
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, phone: true, email: true, quantity: true, consent: true });
    const firstInvalid = Object.keys(found)[0] as FieldName | undefined;
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(fieldId(firstInvalid))}`)?.focus();
      return;
    }

    const form = new FormData(e.currentTarget);
    // Honeypot: real users never see or fill this field.
    if (form.get("botcheck")) {
      setStatus("success");
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!accessKey) {
      console.error("NEXT_PUBLIC_WEB3FORMS_KEY is not set; enquiry not sent.");
      setStatus("error");
      return;
    }

    const name = values.name.trim();
    const company = cleanText(values.company, COMPANY_MAX_LENGTH);
    const email = values.email.trim();
    // "Name (Company)" in the subject, falling back to the name alone when no company was given.
    const sender = company ? `${name} (${company})` : name;
    const phone =
      values.countryCode === "other" ? values.phone.trim() : `${values.countryCode} ${values.phone.trim()}`;

    setStatus("submitting");
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        // Keys are the labels shown in the notification email, in this order.
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New enquiry from ${sender} – ${city ?? (product || "General")} – ${SITE_HOST}`,
          from_name: "Prithvi Data Loggers website",
          page_url: window.location.href,
          "Full name": name,
          Phone: phone,
          Company: company || undefined,
          Email: email || undefined,
          replyto: email || undefined,
          "Country/City": cleanText(values.location, COMPANY_MAX_LENGTH) || undefined,
          Industry: values.industry || undefined,
          Connectivity: values.connectivity.length ? values.connectivity.join(", ") : undefined,
          Quantity: values.quantity.trim() || undefined,
          "Page city": city || undefined,
          "Product of interest": product || undefined,
          consent: "Yes",
          botcheck: "",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: boolean };
      setStatus(res.ok && data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputClass = (name: FieldName) =>
    cn(
      "block h-11 rounded-lg border bg-white px-3 text-base text-ink shadow-sm transition-colors placeholder:text-slate-400 focus:outline-2 focus:outline-offset-0 focus:outline-brand-500",
      errors[name] && touched[name] ? "border-red-600" : "border-slate-300 hover:border-slate-400",
      name !== "countryCode" && "w-full",
    );

  const describedBy = (name: FieldName) => (errors[name] && touched[name] ? errorId(name) : undefined);

  function fieldError(name: FieldName) {
    if (!errors[name] || !touched[name]) return null;
    return (
      <p id={errorId(name)} className="mt-1 flex items-center gap-1.5 text-sm text-red-700">
        <AlertCircleIcon className="size-4 shrink-0" />
        {errors[name]}
      </p>
    );
  }

  function fieldLabel(name: FieldName, children: string, required = false) {
    return (
      <label htmlFor={fieldId(name)} className="mb-1 block text-sm font-medium text-ink">
        {children}
        {required && (
          <span className="text-red-700" aria-hidden="true">
            {" "}*
          </span>
        )}
      </label>
    );
  }

  const whatsappFallback = whatsappHref(product || undefined);

  if (status === "success") {
    return (
      <div
        role="status"
        className={cn("rounded-2xl border border-green-200 bg-green-50 p-8 text-center", className)}
      >
        <CheckCircleIcon className="mx-auto size-12 text-green-700" />
        <p className="mt-4 font-heading text-xl font-semibold text-ink">
          Thank you! Our team will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-labelledby={title ? `${id}-title` : undefined}
      aria-label={title ? undefined : "Enquiry form"}
      className={cn(
        "rounded-2xl border border-slate-200 bg-white text-ink shadow-soft",
        // Extra bottom clearance on mobile: the submit button is full-width
        // there, so it can end up directly behind the fixed floating buttons.
        compact ? "p-5 pb-16 sm:pb-5" : "p-6 pb-16 sm:p-8",
        className,
      )}
    >
      {title && (
        <h2 id={`${id}-title`} className="mb-6 font-heading text-2xl font-bold text-ink">
          {title}
        </h2>
      )}

      {/* Honeypot – invisible to people and assistive tech, but not
          display:none, which bots specifically check for and skip. */}
      <div className="sr-only" aria-hidden="true">
        <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
      </div>
      {city && <input type="hidden" name="city" value={city} />}

      <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 max-[339px]:grid-cols-1">
        {/* Full width on phones: the country-code select leaves a half-width phone input too narrow for the digits. */}
        <div className="col-span-2 max-[339px]:col-span-1 sm:col-span-1">
          {fieldLabel("name", "Full name", true)}
          <input
            id={fieldId("name")}
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => onBlur("name")}
            aria-invalid={!!describedBy("name")}
            aria-describedby={describedBy("name")}
            className={inputClass("name")}
          />
          {fieldError("name")}
        </div>

        <div className="col-span-2 max-[339px]:col-span-1 sm:col-span-1">
          {fieldLabel("phone", "Phone number", true)}
          <div className="flex gap-2">
            <label htmlFor={`${id}-countryCode`} className="sr-only">
              Country code
            </label>
            <select
              id={`${id}-countryCode`}
              name="countryCode"
              autoComplete="tel-country-code"
              value={values.countryCode}
              onChange={(e) => update("countryCode", e.target.value)}
              className={cn(inputClass("countryCode"), "w-[5.5rem] shrink-0 px-2")}
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code === "other" ? "Other" : c.code}
                </option>
              ))}
            </select>
            <input
              id={fieldId("phone")}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete={values.countryCode === "other" ? "tel" : "tel-national"}
              required
              placeholder={values.countryCode === "other" ? "+44 7911 123456" : "98765 43210"}
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
              onBlur={() => onBlur("phone")}
              aria-invalid={!!describedBy("phone")}
              aria-describedby={describedBy("phone")}
              className={cn(inputClass("phone"), "min-w-0")}
            />
          </div>
          {fieldError("phone")}
        </div>

        <div className="min-w-0">
          {fieldLabel("company", "Company name")}
          <input
            id={fieldId("company")}
            name="company"
            autoComplete="organization"
            maxLength={COMPANY_MAX_LENGTH}
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            className={inputClass("company")}
          />
        </div>

        <div className="min-w-0">
          {fieldLabel("email", "Email")}
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => onBlur("email")}
            aria-invalid={!!describedBy("email")}
            aria-describedby={describedBy("email")}
            className={inputClass("email")}
          />
          {fieldError("email")}
        </div>

        <div className="min-w-0">
          {fieldLabel("location", "Country / city")}
          <input
            id={fieldId("location")}
            name="location"
            autoComplete="address-level2"
            value={values.location}
            onChange={(e) => update("location", e.target.value)}
            className={inputClass("location")}
          />
        </div>

        <div className="min-w-0">
          {fieldLabel("quantity", "Quantity")}
          <input
            id={fieldId("quantity")}
            name="quantity"
            type="number"
            min={1}
            step={1}
            inputMode="numeric"
            value={values.quantity}
            onChange={(e) => update("quantity", e.target.value)}
            onBlur={() => onBlur("quantity")}
            aria-invalid={!!describedBy("quantity")}
            aria-describedby={describedBy("quantity")}
            className={inputClass("quantity")}
          />
          {fieldError("quantity")}
        </div>

        <fieldset className="col-span-2 min-w-0 max-[339px]:col-span-1">
          <legend className="mb-0.5 block text-sm font-medium text-ink">Industry</legend>
          <div className="grid grid-cols-2 gap-x-3 max-[339px]:grid-cols-1">
            {INDUSTRY_OPTIONS.map((option) => (
              <label key={option} className="flex min-h-11 cursor-pointer items-center gap-2 text-sm leading-tight text-ink">
                <input
                  type="radio"
                  name="industry"
                  value={option}
                  checked={values.industry === option}
                  onChange={() => update("industry", option)}
                  // Industry is optional: tapping the selected option again clears it.
                  onClick={() => values.industry === option && update("industry", "")}
                  className="size-4 shrink-0 accent-brand-600"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="col-span-2 min-w-0 max-[339px]:col-span-1">
          <legend className="mb-0.5 block text-sm font-medium text-ink">Connectivity</legend>
          <div className="grid grid-cols-2 gap-x-3 max-[339px]:grid-cols-1">
            {CONNECTIVITY_OPTIONS.map((option) => (
              <label key={option} className="flex min-h-11 cursor-pointer items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  name="connectivity"
                  value={option}
                  checked={values.connectivity.includes(option)}
                  onChange={(e) => toggleConnectivity(option, e.target.checked)}
                  className="size-4 shrink-0 rounded border-slate-400 accent-brand-600"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-0.5">
        {/* One label wraps the box and its text, so the whole row is the tap target. */}
        <label htmlFor={fieldId("consent")} className="flex cursor-pointer items-start gap-2.5">
          <input
            id={fieldId("consent")}
            name="consent"
            type="checkbox"
            required
            checked={values.consent}
            onChange={(e) => {
              update("consent", e.target.checked);
              setTouched((t) => ({ ...t, consent: true }));
              setErrors(validate({ ...values, consent: e.target.checked }));
            }}
            aria-invalid={!!describedBy("consent")}
            aria-describedby={describedBy("consent")}
            className="mt-0.5 size-5 shrink-0 rounded border-slate-400 accent-brand-600"
          />
          <span className="text-xs leading-snug text-muted">
            I agree to the{" "}
            <Link href="/privacy-policy" className="font-medium text-brand-600 underline underline-offset-2">
              Privacy Policy
            </Link>{" "}
            and consent to Prithvi Data Loggers contacting me about this{" "}
            <span className="whitespace-nowrap">
              enquiry.
              <span className="text-red-700" aria-hidden="true">
                {" "}*
              </span>
            </span>
          </span>
        </label>
        {fieldError("consent")}
      </div>

      {status === "error" && (
        <div role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <p className="flex items-center gap-2 font-semibold">
            <AlertCircleIcon className="size-5 shrink-0" />
            Sorry, your enquiry could not be sent.
          </p>
          <p className="mt-1">Please try again, or message us directly on WhatsApp.</p>
          <a
            href={whatsappFallback}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-whatsapp px-4 py-2 font-semibold text-navy-950 hover:brightness-95"
          >
            <WhatsAppIcon className="size-4" />
            Chat on WhatsApp
          </a>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className={cn("mt-3 w-full", !compact && "sm:w-auto")}
      >
        {status === "submitting" ? (
          <>
            <SpinnerIcon className="size-5" />
            Sending…
          </>
        ) : (
          "Get Solution"
        )}
      </Button>
      <p className="sr-only" aria-live="polite">
        {status === "submitting" ? "Sending your enquiry" : ""}
      </p>
    </form>
  );
}
