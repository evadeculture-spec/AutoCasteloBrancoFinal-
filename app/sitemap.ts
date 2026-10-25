import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { vehicles } from "@/lib/vehicles";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "viaturas/", "retoma/", "financiamento/", "oficina/", "sobre/", "contactos/", "privacidade/", "cookies/", "termos/"];
  return [
    ...pages.map((p) => ({ url: `${site.url}/${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...vehicles.map((v) => ({ url: `${site.url}/viaturas/${v.slug}/`, changeFrequency: "daily" as const, priority: 0.8 })),
  ];
}
