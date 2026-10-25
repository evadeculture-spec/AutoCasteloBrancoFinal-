import { Suspense } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { MapEmbed } from "@/components/shared/map-embed";
import { WhatsAppIcon } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Contactos e horários",
  description: "Fale connosco por telefone, WhatsApp ou email. Horários do stand e da oficina e localização em Castelo Branco.",
  path: "/contactos/",
});

export default function ContactosPage() {
  return (
    <>
      <section className="border-b border-sand-200 bg-sand-50">
        <div className="container-site py-12 md:py-16">
          <p className="eyebrow mb-3">Contactos</p>
          <h1 className="max-w-2xl text-4xl md:text-6xl">Estamos aqui para ajudar.</h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg"><a href={`tel:${site.phone.replace(/\s/g, "")}`}><Phone aria-hidden /> Ligar {site.phoneDisplay}</a></Button>
            <Button asChild size="lg" variant="whatsapp"><a href={whatsappLink("Olá! Gostaria de mais informações.")} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="size-4" /> WhatsApp</a></Button>
            <Button asChild size="lg" variant="outline"><a href={`mailto:${site.email}`}><Mail aria-hidden /> Email</a></Button>
          </div>
        </div>
      </section>

      <div className="container-site grid gap-12 py-16 md:py-20 lg:grid-cols-12">
        <section id="formulario" className="scroll-mt-24 lg:col-span-7" aria-labelledby="form-t">
          <h2 id="form-t" className="mb-2 text-3xl">Envie-nos uma mensagem</h2>
          <p className="mb-8 text-ink-500">Respondemos em até 1 dia útil.</p>
          <Suspense fallback={<div className="space-y-4">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12" />)}</div>}>
            <ContactForm />
          </Suspense>
        </section>

        <aside className="space-y-8 lg:col-span-5">
          <div className="rounded-2xl border border-sand-200 p-6">
            <h2 className="flex items-center gap-2 font-sans text-base font-semibold"><MapPin className="size-5 text-brass-600" aria-hidden />Morada</h2>
            <p className="mt-2 text-sm text-ink-700">{site.address.street}<br />{site.address.postalCode} {site.address.city}</p>
            <p className="mt-3 text-sm text-ink-700">Telefone {site.phone} <span className="text-xs text-ink-500">(rede fixa nacional)</span><br />Telemóvel {site.mobile} <span className="text-xs text-ink-500">(rede móvel nacional)</span></p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {(["stand", "oficina"] as const).map((k) => (
              <div key={k} className="rounded-2xl bg-sand-100 p-6">
                <h2 className="flex items-center gap-2 font-sans text-base font-semibold"><Clock className="size-5 text-brass-600" aria-hidden />{k === "stand" ? "Stand" : "Oficina"}</h2>
                <dl className="mt-3 space-y-2 text-sm">
                  {site.hours[k].map((h) => (
                    <div key={h.days}><dt className="text-ink-500">{h.days}</dt><dd className="font-medium">{h.hours}</dd></div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <MapEmbed className="h-80" />
        </aside>
      </div>
    </>
  );
}
