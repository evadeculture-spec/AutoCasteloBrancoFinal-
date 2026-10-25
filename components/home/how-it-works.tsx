import Link from "next/link";
import { CarFront, KeyRound, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

const steps = [
  { icon: CarFront, title: "Escolha", text: "Explore o stock online com fotografias reais, visualização 360° e todas as imperfeições assinaladas. Reserve sem sair de casa." },
  { icon: Landmark, title: "Financie ou retome", text: "Simule a prestação em tempo real e receba uma proposta para a sua viatura atual em 2 minutos." },
  { icon: KeyRound, title: "Receba", text: "Levante no stand ou receba em casa. Revista, documentação tratada e com garantia." },
];

export function HowItWorks() {
  return (
    <section className="container-site py-20 md:py-28">
      <SectionHeading align="center" eyebrow="Como funciona" title="Comprar carro, sem atrito" description="Um processo transparente, do primeiro clique à entrega das chaves." />
      <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
        <div aria-hidden className="absolute left-[16.6%] right-[16.6%] top-8 hidden h-px bg-gradient-to-r from-transparent via-brass-300 to-transparent md:block" />
        {steps.map(({ icon: Icon, title, text }, i) => (
          <li key={title}>
            <Reveal delay={i * 0.1} className="relative flex flex-col items-center text-center">
              <span className="relative flex size-16 items-center justify-center rounded-full border border-sand-200 bg-white text-navy-900 shadow-soft">
                <Icon className="size-6" strokeWidth={1.6} aria-hidden />
                <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-brass-500 text-[11px] font-bold text-white">{i + 1}</span>
              </span>
              <h3 className="mt-6 text-2xl">{title}</h3>
              <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-ink-500">{text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
      <div className="mt-14 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg"><Link href="/viaturas/">Ver viaturas</Link></Button>
        <Button asChild size="lg" variant="secondary"><Link href="/financiamento/">Simular financiamento</Link></Button>
      </div>
    </section>
  );
}
