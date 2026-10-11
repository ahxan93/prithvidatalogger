// Enquiry form "Product of interest" options. Shared by EnquiryForm and
// services.ts (preselected service), and validated by `npm run check:data`.
// No "@/..." imports here: scripts/check-data.mjs imports this file directly.

import type { ProductSeries } from "./products";

export const CALIBRATION_MAPPING_OPTION = "Calibration / Temperature Mapping";
export const VALIDATION_OPTION = "Validation (IQ/OQ/PQ)";
export const NOT_SURE_OPTION = "Not sure – need guidance";

export type EnquiryOption = { value: string; label: string };

/** Every series, each accessory, the two service options, then "not sure". */
export function buildEnquiryOptions(products: ProductSeries[]): EnquiryOption[] {
  return [
    ...products.flatMap((series) =>
      series.category === "accessories"
        ? series.variants.map((v) => ({ value: v.name, label: v.name }))
        : [{ value: `${series.name} series`, label: `${series.name} series` }],
    ),
    { value: CALIBRATION_MAPPING_OPTION, label: CALIBRATION_MAPPING_OPTION },
    { value: VALIDATION_OPTION, label: VALIDATION_OPTION },
    { value: NOT_SURE_OPTION, label: NOT_SURE_OPTION },
  ];
}
