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
const SITE_HOST = "prithvidataloggers.com";

/** Product dropdown: every series, each accessory, the service options, then "not sure". */
const PRODUCT_OPTIONS = buildEnquiryOptions(products);

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
  company: string;
  countryCode: string;
  phone: string;
  email: string;
  location: string;
  product: string;
  quantity: string;
  message: string;
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

  if (!v.email.trim()) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    errors.email = "Please enter a valid email address.";

  if (v.location.trim().length < 2) errors.location = "Please enter your city and country.";
  if (v.quantity && !/^\d{1,6}$/.test(v.quantity.trim())) errors.quantity = "Please enter a number.";
  if (!v.consent) errors.consent = "Please accept the privacy policy so we can contact you.";
  return errors;
}

type EnquiryFormProps = {
  /** Pre-selected product, e.g. "Setu series". Must match a dropdown value. */
  defaultProduct?: string;
  /** Single column without the optional Company and Quantity fields. */
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
  const [values, setValues] = useState<Values>({
    name: "",
    company: "",
    countryCode: "+91",
    phone: "",
    email: "",
    location: "",
    product: PRODUCT_OPTIONS.some((o) => o.value === defaultProduct) ? defaultProduct : "",
    quantity: "",
    message: "",
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

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({
      name: true, phone: true, email: true, location: true, quantity: true, consent: true,
    });
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

    const product = values.product || "General";
    const phone =
      values.countryCode === "other" ? values.phone.trim() : `${values.countryCode} ${values.phone.trim()}`;

    setStatus("submitting");
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New solution enquiry – ${city ?? product} – ${SITE_HOST}`,
          from_name: "Prithvi Data Loggers website",
          page_url: window.location.href,
          name: values.name.trim(),
          company: values.company.trim() || undefined,
          phone,
          email: values.email.trim(),
          replyto: values.email.trim(),
          city_country: values.location.trim(),
          city: city || undefined,
          product,
          quantity: values.quantity.trim() || undefined,
          message: values.message.trim() || undefined,
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
      "block rounded-lg border bg-white px-3.5 py-2.5 text-base text-ink shadow-sm transition-colors placeholder:text-slate-400 focus:outline-2 focus:outline-offset-0 focus:outline-brand-500",
      errors[name] && touched[name] ? "border-red-600" : "border-slate-300 hover:border-slate-400",
      name !== "countryCode" && "w-full",
    );

  const describedBy = (name: FieldName) => (errors[name] && touched[name] ? errorId(name) : undefined);

  function fieldError(name: FieldName) {
    if (!errors[name] || !touched[name]) return null;
    return (
      <p id={errorId(name)} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-700">
        <AlertCircleIcon className="size-4 shrink-0" />
        {errors[name]}
      </p>
    );
  }

  function fieldLabel(name: FieldName, children: string, required = false) {
    return (
      <label htmlFor={fieldId(name)} className="mb-1.5 block text-sm font-medium text-ink">
        {children}
        {required && (
          <span className="text-red-700" aria-hidden="true">
            {" "}*
          </span>
        )}
      </label>
    );
  }

  const whatsappFallback = whatsappHref(values.product || undefined);

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
        compact ? "p-5 pb-24 sm:pb-5" : "p-6 pb-24 sm:p-8",
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

      <div className={cn("grid gap-5", !compact && "sm:grid-cols-2")}>
        <div>
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

        {!compact && (
          <div>
            {fieldLabel("company", "Company")}
            <input
              id={fieldId("company")}
              name="company"
              autoComplete="organization"
              value={values.company}
              onChange={(e) => update("company", e.target.value)}
              className={inputClass("company")}
            />
          </div>
        )}

        <div>
          {fieldLabel("phone", "Phone with country code", true)}
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
              className={cn(inputClass("countryCode"), "w-28 shrink-0 pr-2")}
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
              className={inputClass("phone")}
            />
          </div>
          {fieldError("phone")}
        </div>

        <div>
          {fieldLabel("email", "Email", true)}
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => onBlur("email")}
            aria-invalid={!!describedBy("email")}
            aria-describedby={describedBy("email")}
            className={inputClass("email")}
          />
          {fieldError("email")}
        </div>

        <div>
          {fieldLabel("location", "City / Country", true)}
          <input
            id={fieldId("location")}
            name="location"
            autoComplete="address-level2"
            required
            placeholder="e.g. Mumbai, India"
            value={values.location}
            onChange={(e) => update("location", e.target.value)}
            onBlur={() => onBlur("location")}
            aria-invalid={!!describedBy("location")}
            aria-describedby={describedBy("location")}
            className={inputClass("location")}
          />
          {fieldError("location")}
        </div>

        <div>
          {fieldLabel("product", "Product of interest")}
          <select
            id={fieldId("product")}
            name="product"
            value={values.product}
            onChange={(e) => update("product", e.target.value)}
            className={inputClass("product")}
          >
            <option value="">Select a product…</option>
            {PRODUCT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {!compact && (
          <div>
            {fieldLabel("quantity", "Quantity")}
            <input
              id={fieldId("quantity")}
              name="quantity"
              inputMode="numeric"
              placeholder="e.g. 10"
              value={values.quantity}
              onChange={(e) => update("quantity", e.target.value)}
              onBlur={() => onBlur("quantity")}
              aria-invalid={!!describedBy("quantity")}
              aria-describedby={describedBy("quantity")}
              className={inputClass("quantity")}
            />
            {fieldError("quantity")}
          </div>
        )}

        <div className={cn(!compact && "sm:col-span-2")}>
          {fieldLabel("message", "Message")}
          <textarea
            id={fieldId("message")}
            name="message"
            rows={compact ? 3 : 4}
            placeholder="Tell us about your application, e.g. cold room, freezer, warehouse…"
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            className={cn(inputClass("message"), "resize-y")}
          />
        </div>

        <div className={cn(!compact && "sm:col-span-2")}>
          {/* One label wraps the box and its text, so the whole row is the tap target. */}
          <label htmlFor={fieldId("consent")} className="flex min-h-11 cursor-pointer items-start gap-3">
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
            <span className="text-sm text-muted">
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
      </div>

      {status === "error" && (
        <div role="alert" className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
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

      <div className={cn("mt-6 flex flex-col gap-3", !compact && "sm:flex-row sm:items-center sm:justify-between")}>
        <p className="text-xs text-muted">
          <span aria-hidden="true">* </span>Required fields
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className={cn(compact ? "w-full" : "w-full sm:w-auto")}
        >
          {status === "submitting" ? (
            <>
              <SpinnerIcon className="size-5" />
              Sending…
            </>
          ) : (
            "Send enquiry"
          )}
        </Button>
      </div>
      <p className="sr-only" aria-live="polite">
        {status === "submitting" ? "Sending your enquiry" : ""}
      </p>
    </form>
  );
}
