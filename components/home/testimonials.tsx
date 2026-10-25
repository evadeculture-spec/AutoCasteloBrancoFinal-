import { Quote, Star } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { PlaceholderNote } from "@/components/shared/placeholder-note";

/* ⚠️ Testemunhos FICTÍCIOS para demonstração — substituir por avaliações reais (ex: Google Reviews) */
const items = [
  { name: "Cliente exemplo A", place: "Castelo Branco", text: "Processo muito claro do início ao fim. As pequenas imperfeições estavam todas indicadas no site — sem surpresas na entrega." },
  { name: "Cliente exemplo B", place: "Covilhã", text: "Fiz a simulação de financiamento online e a retoma do meu carro antigo no mesmo dia. Atendimento formal e muito profissional." },
  { name: "Cliente exemplo C", place: "Fundão", text: "Marquei a revisão pelo site em dois minutos e recolheram o carro em casa. É assim que deve ser." },
];

export function Testimonials() {
  return (
    <section className="container-site py-20 md:py-28">
      <SectionHeading eyebrow="Testemunhos" title="O que dizem os nossos clientes" />
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08}>
            <figure className="flex h-full flex-col rounded-xl border border-sand-200 bg-white p-7">
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5 text-brass-500" aria-label="Classificação ilustrativa de 5 em 5">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="size-4 fill-current" aria-hidden />)}
                </div>
                <Quote className="size-6 text-sand-300" aria-hidden />
              </div>
              <blockquote className="mt-5 flex-1 font-serif text-lg leading-relaxed text-ink-900">“{t.text}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-sand-200 pt-5">
                <span className="flex size-10 items-center justify-center rounded-full bg-navy-50 text-sm font-semibold text-navy-900">{t.name.slice(-1)}</span>
                <span className="text-sm">
                  <span className="block font-semibold text-ink-900">{t.name}</span>
                  <span className="text-ink-500">{t.place}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <PlaceholderNote className="mt-6">Testemunhos de exemplo (placeholder) para demonstração do MVP — não correspondem a clientes reais.</PlaceholderNote>
    </section>
  );
}
