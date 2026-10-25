import type { Metadata } from "next";
import { site } from "@/data/site";
import type { Vehicle } from "@/types";

/** Metadados por página com Open Graph coerente */
export function pageMetadata({ title, description, path, image }: { title: string; description: string; path: string; image?: string }): Metadata {
  const url = `${site.url}${path}`;
  const ogImage = image ? `${image}?auto=format&fit=crop&w=1200&h=630&q=75` : `${site.url}/og.png`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | ${site.name}`, description, url, siteName: site.name, locale: "pt_PT", type: "website", images: [{ url: ogImage, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images: [ogImage] },
  };
}

const address = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  postalCode: site.address.postalCode,
  addressLocality: site.address.city,
  addressRegion: site.address.region,
  addressCountry: site.address.country,
};

export const dealerJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "@id": `${site.url}/#dealer`,
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address,
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "19:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "18:00" },
  ],
  priceRange: "€€",
};

export const repairJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": `${site.url}/oficina/#oficina`,
  name: `${site.name} — Oficina`,
  url: `${site.url}/oficina/`,
  telephone: site.phone,
  address,
  parentOrganization: { "@id": `${site.url}/#dealer` },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "18:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "13:00" },
  ],
};

const fuelMap: Record<string, string> = {
  Gasolina: "Gasoline",
  Gasóleo: "Diesel",
  Híbrido: "Hybrid",
  "Híbrido Plug-in": "PlugInHybrid",
  Elétrico: "Electric",
};

export function carJsonLd(v: Vehicle) {
  return {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${v.make} ${v.model} ${v.version}`,
    brand: { "@type": "Brand", name: v.make },
    model: v.model,
    vehicleModelDate: String(v.year),
    productionDate: `${v.year}-${String(v.month).padStart(2, "0")}`,
    mileageFromOdometer: { "@type": "QuantitativeValue", value: v.km, unitCode: "KMT" },
    fuelType: fuelMap[v.fuel],
    vehicleTransmission: v.gearbox === "Automática" ? "AutomaticTransmission" : "ManualTransmission",
    vehicleEngine: { "@type": "EngineSpecification", enginePower: { "@type": "QuantitativeValue", value: v.powerHp, unitText: "cv" }, ...(v.engineCc ? { engineDisplacement: { "@type": "QuantitativeValue", value: v.engineCc, unitCode: "CMQ" } } : {}) },
    numberOfDoors: v.doors,
    seatingCapacity: v.seats,
    color: v.color,
    numberOfPreviousOwners: v.owners,
    itemCondition: "https://schema.org/UsedCondition",
    image: v.images.slice(0, 4).map((i) => `${i}?w=1200&q=75&auto=format`),
    url: `${site.url}/viaturas/${v.slug}/`,
    offers: {
      "@type": "Offer",
      price: v.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      seller: { "@id": `${site.url}/#dealer` },
    },
  };
}
