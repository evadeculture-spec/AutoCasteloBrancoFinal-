"use client";

import { useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceIcon } from "@/components/workshop/service-icon";
import { BookingWizard } from "@/components/workshop/booking-wizard";
import { Badge } from "@/components/ui/badge";
import { formatDuration, services } from "@/lib/services";
import { formatPrice } from "@/lib/format";

/** Grelha de serviços + marcação (o serviço escolhido num cartão fica pré-selecionado) */
export function WorkshopSection() {
  const [preselected, setPreselected] = useState<string>();
  const pick = (id: string) => {
    setPreselected(id);
    document.getElementById("marcacao")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <section className="container-site py-20 md:py-28" aria-labelledby="servicos">
        <SectionHeading eyebrow="Serviços" title={<span id="servicos">Tudo o que o seu carro precisa, num só lugar</span>} description="Oficina multimarca com equipamento de diagnóstico atualizado e peças de qualidade original." />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <li key={s.id}>
              <Reveal delay={(i % 4) * 0.05} className="h-full">
                <button onClick={() => pick(s.id)} className="group flex h-full w-full flex-col rounded-xl border border-sand-200 bg-white p-6 text-left transition-all hover:-translate-y-0.5 hover:border-navy-900 hover:shadow-lift">
                  <div className="flex items-start justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-navy-50 text-navy-900"><ServiceIcon name={s.icon} className="size-5" /></span>
                    {s.popular && <Badge variant="brass">Mais pedido</Badge>}
                  </div>
                  <h3 className="mt-5 font-sans text-[17px] font-semibold">{s.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{s.description}</p>
                  <div className="mt-5 flex items-end justify-between border-t border-sand-200 pt-4">
                    <span className="flex items-center gap-1 text-xs text-ink-500"><Clock className="size-3.5" aria-hidden />{formatDuration(s.durationMin)}</span>
                    <span className="text-right">
                      <span className="block text-[11px] text-ink-500">desde</span>
                      <span className="font-semibold">{formatPrice(s.priceFrom)}*</span>
                    </span>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy-900">Marcar <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
                </button>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-ink-500">* Preços “desde” e durações estimadas são placeholders a confirmar. IVA incluído.</p>
      </section>

      <section id="marcacao" className="scroll-mt-20 bg-sand-100 py-20 md:py-28" aria-labelledby="marcacao-t">
        <div className="container-site">
          <SectionHeading eyebrow="Marcação online" title={<span id="marcacao-t">Marque em menos de 2 minutos</span>} description="Escolha a viatura, os serviços e o horário. Confirmamos por SMS e email." />
          <BookingWizard preselected={preselected} />
        </div>
      </section>
    </>
  );
}
