import { siteConfig } from "@/config/site";
import { commonSpecs, formatMrp, type ProductSeries, type ProductVariant } from "@/data/products";

type Row = { label: string; value: (variant: ProductVariant) => string | undefined };

const sensorTypeLabel: Record<NonNullable<ProductVariant["sensorType"]>, string> = {
  internal: "Internal",
  external: "External probe",
  "internal + external": "Internal + external probe",
};

const variantRows: Row[] = [
  { label: "Measures", value: (v) => v.sensors },
  { label: "Temperature range", value: (v) => v.tempRange },
  { label: "Humidity range", value: (v) => v.rhRange },
  { label: "Sensor", value: (v) => (v.sensorType ? sensorTypeLabel[v.sensorType] : undefined) },
  { label: "Probe / cable", value: (v) => v.cable },
  { label: "Battery", value: (v) => v.battery },
  { label: "What it does", value: (v) => v.description },
  { label: "MRP (excl. 18% GST)", value: (v) => formatMrp(v.mrp) },
];

/** Key specs for one variant (used in the hero tabs). */
export function variantSpecs(variant: ProductVariant): { label: string; value: string }[] {
  return variantRows
    .filter((row) => row.label !== "MRP (excl. 18% GST)" && row.label !== "What it does")
    .map((row) => ({ label: row.label, value: row.value(variant) }))
    .filter((spec): spec is { label: string; value: string } => Boolean(spec.value) && spec.value !== "—");
}

// Full specs table with one column per variant, then the specs common to all
// loggers. Scrolls inside its own box on small screens.
export default function SpecsTable({ series, labelledBy }: { series: ProductSeries; labelledBy: string }) {
  const isLogger = series.category === "series";
  const rows = variantRows
    // No prices shown on the site (owner decision): the MRP row is dropped entirely, not just hidden.
    .filter((row) => siteConfig.showPrices || row.label !== "MRP (excl. 18% GST)")
    .filter((row) => series.variants.some((v) => row.value(v) && row.value(v) !== "—"));
  const columns = series.variants.length;

  return (
    <div
      className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-soft"
      tabIndex={0}
      role="region"
      aria-labelledby={labelledBy}
    >
      <table className="w-full border-collapse text-left text-sm" style={{ minWidth: `${12 + columns * 11}rem` }}>
        <thead>
          <tr className="border-b border-slate-200 bg-brand-50">
            <th scope="col" className="w-44 px-5 py-4 font-heading text-sm font-semibold text-ink">
              Specification
            </th>
            {series.variants.map((variant) => (
              <th key={variant.slug} scope="col" className="px-5 py-4 font-heading text-sm font-semibold text-brand-700">
                {variant.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={row.label} className="align-top">
              <th scope="row" className="px-5 py-3.5 font-medium text-ink">
                {row.label}
              </th>
              {series.variants.map((variant) => (
                <td
                  key={variant.slug}
                  className={row.label.startsWith("MRP") ? "px-5 py-3.5 font-semibold text-ink" : "px-5 py-3.5 text-muted"}
                >
                  {row.value(variant) ?? "—"}
                </td>
              ))}
            </tr>
          ))}
          {isLogger && (
            <>
              <tr className="bg-surface">
                <th scope="colgroup" colSpan={columns + 1} className="px-5 py-3 font-heading text-xs font-semibold uppercase tracking-wider text-brand-700">
                  Common to all variants
                </th>
              </tr>
              {commonSpecs.map((spec) => (
                <tr key={spec.label} className="align-top">
                  <th scope="row" className="px-5 py-3.5 font-medium text-ink">
                    {spec.label}
                  </th>
                  <td colSpan={columns} className="px-5 py-3.5 text-muted">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
