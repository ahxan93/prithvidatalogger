import ServicePage, { serviceMetadata } from "@/components/services/ServicePage";

export const metadata = serviceMetadata("calibration");

export default function CalibrationPage() {
  return <ServicePage slug="calibration" />;
}
