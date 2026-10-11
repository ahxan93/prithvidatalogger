import ServicePage, { serviceMetadata } from "@/components/services/ServicePage";

export const metadata = serviceMetadata("temperature-mapping");

export default function TemperatureMappingPage() {
  return <ServicePage slug="temperature-mapping" />;
}
