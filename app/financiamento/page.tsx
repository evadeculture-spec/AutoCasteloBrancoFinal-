import Link from "next/link";
import { BadgePercent, FileCheck2, Timer } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { PlaceholderNote } from "@/components/shared/placeholder-note";
import { FinanceSimulator } from "@/components/vehicles/finance-simulator";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { images } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Financiamento automóvel — simulador",
  description: "Simule a prestação mensal do seu próximo carro em tempo real. Entrada, prazo até 96 meses e resposta rápida. Valores ilustrativos.",
  path: "/financiamento/",
  image: images.finance,
});

const steps = [
  { icon: BadgePercent, title: "Simule", text: "Escolha o valor, a entrada e o prazo. A prestação é calculada em tempo real." },
  { icon: FileCheck2, title: "Envie os documentos", text: "Cartão de Cidadão, comprovativo de morada, IRS e recibos de vencimento. Tudo online." },
  { icon: Timer, title: "Resposta rápida", text: "Análise pela entidade financeira parceira, normalmente em 24 h úteis (a confirmar)." },
];

const faq = [
  ["O que é a TAN e a TAEG?", "A TAN (Taxa Anual Nominal) é a taxa de juro aplicada ao montante financiado. A TAEG (Taxa Anual de Encargos Efetiva Global) inclui, além dos juros, comissões, seguros obrigatórios e impostos — é o melhor indicador para comparar propostas."],
  ["Posso financiar sem entrada?", "Depende da análise de risco da entidade financeira. Em muitos casos é possível financiar até 100 % do valor. (Condição a confirmar.)"],
  ["Posso usar a retoma como entrada?", "Sim. O valor da retoma da sua viatura atual pode ser utilizado, total ou parcialmente, como entrada."],
  ["Posso liquidar antecipadamente?", "Sim, nos termos do Decreto-Lei n.º 133/2009 (crédito aos consumidores), com eventual comissão de reembolso antecipado limitada por lei. (Texto informativo a validar.)"],
  ["Que documentos são necessários?", "Cartão de Cidadão, comprovativo de morada, última declaração de IRS e os três últimos recibos de vencimento (ou equivalente para trabalhadores independentes)."],
];

export default function FinanciamentoPage() {
  return (
    <>
      <PageHero eyebrow="Financiamento" title="A prestação certa para si, antes de escolher o carro." description="Simule em segundos. Sem compromisso e sem afetar o seu historial de crédito." image={images.finance} compact>
        <Button asChild size="lg" variant="light"><Link href="#simulador">Simular agora</Link></Button>
      </PageHero>

      <section id="simulador" className="container-site scroll-mt-20 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Simulador" title="Calcule a sua prestação" description="Ajuste o preço da viatura, a entrada e o prazo. Depois veja as viaturas que cabem no seu orçamento." className="mb-8" />
            <PlaceholderNote>TAN, TAEG e condições apresentadas são ilustrativas e não constituem proposta contratual. A definir com a entidade financeira parceira.</PlaceholderNote>
            <Button asChild variant="secondary" className="mt-6"><Link href="/viaturas/?ordenar=prestacao-asc">Ver viaturas por prestação</Link></Button>
          </div>
          <div className="rounded-2xl border border-sand-200 bg-white p-6 shadow-panel md:p-8 lg:col-span-7">
            <FinanceSimulator price={22000} editablePrice />
          </div>
        </div>
      </section>

      <section className="bg-sand-100 py-16 md:py-24">
        <div className="container-site">
          <SectionHeading align="center" eyebrow="Como funciona" title="Simples, em três passos" />
          <ol className="grid gap-6 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="rounded-xl bg-white p-7 shadow-soft">
                <span className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-navy-900 text-white"><Icon className="size-5" aria-hidden /></span>
                  <span className="font-serif text-4xl text-sand-300">0{i + 1}</span>
                </span>
                <h3 className="mt-5 text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-site grid gap-10 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-4">
          <p className="eyebrow mb-3">FAQ</p>
          <h2 className="text-3xl md:text-4xl">Perguntas frequentes</h2>
        </div>
        <Accordion type="single" collapsible className="md:col-span-8">
          {faq.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger>{q}</AccordionTrigger>
              <AccordionContent>{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
