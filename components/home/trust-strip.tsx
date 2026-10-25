import { BadgeCheck, FileSearch, HandCoins, Repeat, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

const items = [
  { icon: ShieldCheck, title: "Garantia até 24 meses", text: "Cobertura de componentes mecânicos e eletrónicos." },
  { icon: BadgeCheck, title: "Revisão completa", text: "Feita na nossa oficina antes de cada entrega." },
  { icon: FileSearch, title: "Histórico verificado", text: "Quilometragem e manutenções confirmadas." },
  { icon: HandCoins, title: "Financiamento", text: "Simulação imediata e resposta em 24 h." },
  { icon: Repeat, title: "Retoma", text: "Proposta estimada em 2 minutos." },
];

/** Faixa de confiança — valores placeholder, a confirmar */
export function TrustStrip() {
  return (
    <section aria-label="As nossas garantias" className="border-b border-sand-200 bg-sand-50">
      <div className="container-site py-10 md:py-12">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-5">
          {items.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className={i === 4 ? "col-span-2 md:col-span-1" : undefined}>
              <Reveal delay={i * 0.05} className="flex flex-col gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-white text-navy-900 shadow-soft">
                  <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                </span>
                <div>
                  <p className="text-[15px] font-semibold text-ink-900">{title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink-500">{text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-[11px] text-ink-500">* Valores e condições de garantia, devolução e financiamento são placeholders a confirmar.</p>
      </div>
    </section>
  );
}
