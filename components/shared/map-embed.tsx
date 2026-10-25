import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/** Mapa OpenStreetMap (sem chave de API). Em produção pode ser substituído por Google Maps Embed. */
export function MapEmbed({ className }: { className?: string }) {
  const { lat, lng } = site.geo;
  const d = 0.012;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - d}%2C${lat - d / 2}%2C${lng + d}%2C${lat + d / 2}&layer=mapnik&marker=${lat}%2C${lng}`;
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-sand-200 bg-sand-200", className)}>
      <iframe title={`Mapa — localização ${site.name}`} src={src} loading="lazy" className="size-full min-h-[inherit] grayscale-[40%]" referrerPolicy="no-referrer-when-downgrade" />
    </div>
  );
}
