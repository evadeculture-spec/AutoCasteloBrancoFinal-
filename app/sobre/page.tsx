import Link from "next/link";
import { Eye, Handshake, ShieldCheck, Sparkles } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { PlaceholderNote } from "@/components/shared/placeholder-note";
import { SafeImage } from "@/components/shared/safe-image";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { images } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sobre nós",
  description: "A história, a equipa e os valores da AutoCasteloBranco — stand de viaturas seminovas com oficina própria em Castelo Branco.",
  path: "/sobre/",
  image: images.showroom,
});

// ⚠️ Números e equipa são PLACEHOLDERS
const numbers = [
  { v: "00+", l: "anos de experiência" },
  { v: "0 000+", l: "viaturas entregues" },
  { v: "140", l: "pontos de inspeção" },
  { v: "0,0/5", l: "avaliação média" },
];
const values = [
  { icon: Eye, title: "Transparência", text: "Mostramos cada imperfeição e todo o histórico. A confiança constrói-se com factos." },
  { icon: ShieldCheck, title: "Rigor técnico", text: "Cada viatura passa pela nossa oficina antes de chegar às suas mãos." },
  { icon: Handshake, title: "Compromisso", text: "Acompanhamos o cliente depois da venda, na manutenção e na próxima troca." },
  { icon: Sparkles, title: "Exigência", text: "Selecionamos poucas viaturas, muito bem escolhidas." },
];
const team = [
  { name: "Nome Apelido", role: "Direção-geral" },
  { name: "Nome Apelido", role: "Responsável comercial" },
  { name: "Nome Apelido", role: "Chefe de oficina" },
  { name: "Nome Apelido", role: "Financiamento e seguros" },
];

export default function SobrePage() {
  return (
    <>
      <PageHero eyebrow="Sobre nós" title="Uma casa de confiança, em Castelo Branco." description="Nascemos da oficina. É por isso que vendemos apenas carros que conhecemos por dentro." image={images.showroom}>
        <Button asChild size="lg" variant="light"><Link href="/viaturas/">Ver viaturas</Link></Button>
      </PageHero>

      <section className="container-site grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <p className="eyebrow mb-3">A nossa história</p>
          <h2 className="text-3xl leading-tight md:text-4xl">Da oficina ao stand, sempre com o mesmo rigor.</h2>
        </div>
        <div className="space-y-5 text-[17px] leading-relaxed text-ink-700 md:col-span-6 md:col-start-7">
          <p>[Placeholder] A AutoCasteloBranco começou como uma oficina de mecânica geral. Ao longo dos anos, os clientes passaram a pedir-nos conselho na compra do próximo carro — e foi assim que nasceu o stand.</p>
          <p>Hoje selecionamos viaturas seminovas com histórico verificado, preparamo-las na nossa própria oficina e entregamo-las com garantia. Um processo simples, digital e transparente, com o acompanhamento de quem conhece a região.</p>
          <PlaceholderNote>Texto institucional provisório — a substituir pela história real da empresa.</PlaceholderNote>
        </div>
      </section>

      <section className="bg-navy-900 py-16 text-white md:py-20">
        <dl className="container-site grid grid-cols-2 gap-8 md:grid-cols-4">
          {numbers.map((n) => (
            <div key={n.l} className="flex flex-col-reverse">
              <dt className="text-sm text-white/65">{n.l}</dt>
              <dd className="font-serif text-5xl text-white md:text-6xl">{n.v}</dd>
            </div>
          ))}
        </dl>
        <p className="container-site mt-8 text-xs text-white/50">Números placeholder — a confirmar.</p>
      </section>

      <section className="container-site py-20 md:py-28">
        <SectionHeading eyebrow="Valores" title="O que nos guia" />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.06} className="h-full rounded-xl border border-sand-200 p-7">
                <Icon className="size-6 text-brass-600" strokeWidth={1.6} aria-hidden />
                <h3 className="mt-5 text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-sand-100 py-20 md:py-28">
        <div className="container-site">
          <SectionHeading eyebrow="Instalações" title="Stand e oficina no mesmo espaço" />
          <div className="grid gap-4 md:grid-cols-3">
            {[images.showroom, images.workshop, images.workshop3].map((src, i) => (
              <div key={src} className={`relative overflow-hidden rounded-xl ${i === 0 ? "aspect-[4/3] md:col-span-2 md:row-span-2 md:aspect-auto" : "aspect-[4/3]"}`}>
                <SafeImage src={src} alt={["Showroom", "Oficina", "Área técnica"][i]} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-20 md:py-28">
        <SectionHeading eyebrow="Equipa" title="Pessoas que conhece pelo nome" />
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {team.map((t, i) => (
            <li key={i} className="text-center">
              <div className="mx-auto flex aspect-square w-full max-w-[220px] items-center justify-center rounded-2xl bg-gradient-to-br from-navy-50 to-sand-200 font-serif text-4xl text-navy-900/40">{String.fromCharCode(65 + i)}</div>
              <p className="mt-4 font-semibold">{t.name}</p>
              <p className="text-sm text-ink-500">{t.role}</p>
            </li>
          ))}
        </ul>
        <PlaceholderNote className="mx-auto mt-8 max-w-md justify-center">Equipa placeholder — fotografias e nomes reais a fornecer.</PlaceholderNote>
      </section>
    </>
  );
}
