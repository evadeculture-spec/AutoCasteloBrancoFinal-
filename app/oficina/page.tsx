import Link from "next/link";
import { Car, FileText, Home, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { WorkshopSection } from "@/components/workshop/workshop-section";
import { images, site } from "@/data/site";
import { pageMetadata, repairJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Oficina multimarca — marcação online",
  description: "Revisões, diagnóstico, travões, pneus, ar condicionado, preparação para IPO e manutenção de híbridos e elétricos em Castelo Branco. Marque online em 4 passos.",
  path: "/oficina/",
  image: images.workshop,
});

const perks = [
  { icon: Car, title: "Viatura de substituição", text: "Continue a sua rotina enquanto tratamos do seu carro." },
  { icon: Home, title: "Recolha e entrega", text: "Vamos buscar e devolvemos a viatura à sua porta." },
  { icon: FileText, title: "Orçamento prévio", text: "Nenhum trabalho é feito sem a sua aprovação." },
  { icon: ShieldCheck, title: "Garantia mantida", text: "Plano do fabricante cumprido, com registo digital." },
];

const faq = [
  ["Fazer a revisão fora da marca faz perder a garantia do fabricante?", "Não. Ao abrigo do regulamento europeu de isenção por categoria, pode fazer a manutenção numa oficina independente desde que siga o plano do fabricante e use peças de qualidade equivalente. (Texto informativo a validar juridicamente.)"],
  ["Quanto tempo demora uma revisão?", "Em regra, entre 1 h e 2 h. Pode aguardar na nossa sala de espera ou optar por viatura de substituição."],
  ["Trabalham com todas as marcas?", "Sim, somos uma oficina multimarca, incluindo híbridos e elétricos."],
  ["Como recebo o orçamento?", "Após o diagnóstico enviamos o orçamento por SMS/email com fotografias, para aprovação antes de qualquer intervenção."],
];

export default function OficinaPage() {
  return (
    <>
      <JsonLd data={repairJsonLd} />
      <PageHero
        eyebrow="Oficina AutoCasteloBranco"
        title="Manutenção de confiança, com marcação online."
        description="A mesma equipa técnica que prepara as nossas viaturas para venda cuida agora do seu carro. Multimarca, transparente e sem surpresas."
        image={images.workshop2}
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" variant="light"><Link href="#marcacao">Marcar agora</Link></Button>
          <Button asChild size="lg" variant="glass"><a href={`tel:${site.phone.replace(/\s/g, "")}`}>Ligar {site.phoneDisplay}</a></Button>
        </div>
      </PageHero>

      <section className="border-b border-sand-200 bg-sand-50">
        <ul className="container-site grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-navy-900 shadow-soft"><Icon className="size-5" strokeWidth={1.6} aria-hidden /></span>
              <span>
                <span className="block text-[15px] font-semibold">{title}</span>
                <span className="text-[13px] text-ink-500">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <WorkshopSection />

      <section className="container-site grid gap-10 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-4">
          <p className="eyebrow mb-3">Perguntas frequentes</p>
          <h2 className="text-3xl md:text-4xl">Oficina</h2>
          <p className="mt-4 text-ink-500">Horário da oficina: {site.hours.oficina.slice(0, 2).map((h) => `${h.days} ${h.hours}`).join(" · ")}.</p>
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
