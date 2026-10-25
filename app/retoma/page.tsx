import { Clock, Euro, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { TradeInWizard } from "@/components/forms/tradein-wizard";
import { images } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Retoma — avalie o seu carro em 2 minutos",
  description: "Indique a matrícula, os quilómetros e o estado da sua viatura e receba uma proposta de retoma estimada de imediato. Abata o valor na compra do seu próximo carro.",
  path: "/retoma/",
  image: images.tradeIn,
});

export default function RetomaPage() {
  return (
    <>
      <PageHero
        eyebrow="Retoma"
        title="Quanto vale o seu carro? Descubra em 2 minutos."
        description="Proposta estimada imediata, inspeção gratuita e pagamento rápido — ou abata o valor na compra de uma das nossas viaturas."
        image={images.tradeIn}
        compact
      >
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
          <li className="flex items-center gap-2"><Clock className="size-4 text-brass-300" aria-hidden />2 minutos</li>
          <li className="flex items-center gap-2"><Euro className="size-4 text-brass-300" aria-hidden />Sem compromisso</li>
          <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-brass-300" aria-hidden />Inspeção gratuita</li>
        </ul>
      </PageHero>
      <section className="container-site relative z-10 -mt-8 max-w-4xl pb-24 md:-mt-12">
        <TradeInWizard />
      </section>
    </>
  );
}
