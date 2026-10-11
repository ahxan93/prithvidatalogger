import ServicePage, { serviceMetadata } from "@/components/services/ServicePage";

export const metadata = serviceMetadata("validation");

export default function ValidationPage() {
  return <ServicePage slug="validation" />;
}
