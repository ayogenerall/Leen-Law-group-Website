import { getServices } from "./content";

/** Options for the Request Support form. Only visible services are offered. */
export function getServiceOptions() {
  return [
    { value: "consumer-administrative-support", label: "Consumer support (records, correspondence, deadlines)" },
    { value: "business-startup-administration", label: "Business startup administration" },
    ...getServices()
      .filter((s) => !["consumer-administrative-support", "business-startup-administration"].includes(s.slug))
      .map((s) => ({ value: s.slug, label: s.title })),
    { value: "general", label: "General inquiry / not sure" },
  ];
}
