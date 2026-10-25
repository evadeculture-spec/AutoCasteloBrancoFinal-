import Link from "next/link";
import { Clock, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { MapEmbed } from "@/components/shared/map-embed";
import { site } from "@/data/site";

export function Location() {
  return (
    <section className="bg-sand-100 py-20 md:py-28">
      <div className="container-site grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <SectionHeading eyebrow="Visite-nos" title="Stand e oficina no mesmo espaço" className="mb-8 md:mb-10" />
          <p className="flex gap-3 text-[15px] text-ink-700">
            <MapPin className="mt-0.5 size-5 shrink-0 text-brass-600" aria-hidden />
            <span>{site.address.street}<br />{site.address.postalCode} {site.address.city}</span>
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {(["stand", "oficina"] as const).map((k) => (
              <div key={k}>
                <p className="mb-2 flex items-center gap-2 text-sm font-semibold"><Clock className="size-4 text-brass-600" aria-hidden />{k === "stand" ? "Stand" : "Oficina"}</p>
                <dl className="space-y-1.5 text-[13px]">
                  {site.hours[k].map((h) => (
                    <div key={h.days}>
                      <dt className="text-ink-500">{h.days}</dt>
                      <dd className="font-medium text-ink-900">{h.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild><Link href="/contactos/?assunto=visita#formulario">Marcar visita</Link></Button>
            <Button asChild variant="outline">
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${site.geo.lat},${site.geo.lng}`} target="_blank" rel="noopener noreferrer"><Navigation aria-hidden /> Obter direções</a>
            </Button>
          </div>
        </div>
        <div className="md:col-span-7">
          <MapEmbed className="h-[360px] md:h-full md:min-h-[460px]" />
        </div>
      </div>
    </section>
  );
}
