import { siteConfig } from "@/config/site";

// Accreditation and certification wording, in one place. Everything here is
// attributed to the parent company (VEGA Calibrations, not Prithvi) and is only
// asserted once siteConfig.certificatesValid is true.

const parent = siteConfig.parentCompany;

export const certificatesValid: boolean = siteConfig.certificatesValid;

/** For "built on the work of …": the lab, with its credentials only when current. */
export const labPhrase = certificatesValid ? `an ${parent.accreditation}` : "its calibration laboratory";

/** A sentence-final credentials clause, or an empty string while unconfirmed. */
export const labCredentialsClause = certificatesValid ? `, an ${parent.accreditation}, ${parent.certification}` : "";
