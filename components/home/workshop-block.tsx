import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/shared/safe-image";
import { Reveal } from "@/components/shared/reveal";
import { images } from "@/data/site";

const points = ["Revisões segundo o plano do fabricante, sem perder a garantia", "Diagnóstico eletrónico multimarca", "Técnicos certificados em híbridos e elétricos", "Viatura de substituição e recolha ao domicílio"];

export function WorkshopBlock() {
  return (
    <section className="bg-navy-900 text-white">
      <div className="container-site grid items-center gap-12 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="md:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <SafeImage src={images.workshop} alt="Técnico da oficina AutoCasteloBranco a trabalhar numa viatura" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-5 md:col-start-8">
          <p className="eyebrow mb-4 text-brass-300">Oficina própria</p>
          <h2 className="text-3xl leading-[1.1] text-white md:text-[2.75rem]">A mesma equipa que prepara os nossos carros cuida do seu.</h2>
          <p className="mt-5 text-base leading-relaxed text-white/75">Oficina multimarca com marcação online em 4 passos, preços transparentes e relatório digital de cada intervenção.</p>
          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex gap-3 text-[15px] text-white/90">
                <Check className="mt-0.5 size-5 shrink-0 text-brass-300" aria-hidden /> {p}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="light">
              <Link href="/oficina/#marcacao">Marcar na oficina <ArrowRight aria-hidden /></Link>
            </Button>
            <Button asChild size="lg" variant="glass">
              <Link href="/oficina/">Ver serviços</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
