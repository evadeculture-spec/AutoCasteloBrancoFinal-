import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Gallery } from "@/components/vehicles/gallery";
import { PurchasePanel } from "@/components/vehicles/purchase-panel";
import { Equipment, History, Inspection, Specs } from "@/components/vehicles/vehicle-details";
import { TradeInInline } from "@/components/vehicles/tradein-inline";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { MobileBuyBar } from "@/components/vehicles/mobile-buy-bar";
import { JsonLd } from "@/components/shared/json-ld";
import { Button } from "@/components/ui/button";
import { carJsonLd, pageMetadata } from "@/lib/seo";
import { formatKm, formatPrice } from "@/lib/format";
import { getSimilar, getVehicle, vehicles } from "@/lib/vehicles";

export const dynamicParams = false;

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = getVehicle(slug);
  if (!v) return {};
  return pageMetadata({
    title: `${v.make} ${v.model} ${v.version} ${v.year} — ${formatPrice(v.price)}`,
    description: `${v.make} ${v.model} ${v.version} de ${v.year}, ${formatKm(v.km)}, ${v.fuel.toLowerCase()}, caixa ${v.gearbox.toLowerCase()}. Revisto, com garantia e financiamento. ${formatPrice(v.price)} IVA incluído.`,
    path: `/viaturas/${v.slug}/`,
    image: v.images[0],
  });
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-t`} className="scroll-mt-28 border-t border-sand-200 py-10 md:py-12">
      <h2 id={`${id}-t`} className="mb-6 text-2xl md:text-3xl">{title}</h2>
      {children}
    </section>
  );
}

export default async function VehiclePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = getVehicle(slug);
  if (!v) notFound();
  const similar = getSimilar(v, 3);
  const sections = [
    ["especificacoes", "Especificações"],
    ["equipamento", "Equipamento"],
    ["historico", "Histórico"],
    ["inspecao", "Inspeção"],
    ["retoma", "Retoma"],
  ];

  return (
    <>
      <JsonLd data={carJsonLd(v)} />
      <div className="container-site pb-32 pt-6 md:pb-20">
        <nav aria-label="Breadcrumb" className="mb-5 text-xs text-ink-500">
          <Link href="/" className="hover:text-ink-900">Início</Link> <span aria-hidden>/</span>{" "}
          <Link href="/viaturas/" className="hover:text-ink-900">Viaturas</Link> <span aria-hidden>/</span>{" "}
          <span aria-current="page" className="text-ink-900">{v.make} {v.model}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7 xl:col-span-8">
            <Gallery vehicle={v} />

            {/* Bloco de compra no telemóvel/tablet aparece logo após a galeria */}
            <div className="mt-8 lg:hidden">
              <PurchasePanel vehicle={v} headingAs="h2" />
            </div>

            <div className="mt-10 rounded-2xl bg-sand-100 p-6 md:p-8">
              <p className="eyebrow mb-2">Resumo</p>
              <p className="font-serif text-xl leading-relaxed text-ink-900 md:text-2xl">{v.summary}</p>
            </div>

            <nav aria-label="Secções da ficha" className="sticky top-16 z-10 -mx-4 mt-10 overflow-x-auto bg-white/95 px-4 backdrop-blur scrollbar-none md:top-[72px]">
              <ul className="flex gap-1 border-b border-sand-200">
                {sections.map(([id, label]) => (
                  <li key={id}><a href={`#${id}`} className="block whitespace-nowrap px-3 py-3 text-sm font-medium text-ink-500 hover:text-ink-900">{label}</a></li>
                ))}
              </ul>
            </nav>

            <Block id="especificacoes" title="Especificações"><Specs vehicle={v} /></Block>
            <Block id="equipamento" title="Equipamento"><Equipment vehicle={v} /></Block>
            <Block id="historico" title="Histórico"><History vehicle={v} /></Block>
            <Block id="inspecao" title="Relatório de inspeção pré-venda"><Inspection vehicle={v} /></Block>
            <section id="retoma" className="scroll-mt-28 border-t border-sand-200 py-10 md:py-12"><TradeInInline price={v.price} /></section>

            <div className="flex items-start gap-3 rounded-xl border border-sand-200 p-5 text-sm text-ink-700">
              <ShieldCheck className="size-5 shrink-0 text-brass-600" aria-hidden />
              <p>Garantia de {v.warrantyMonths} meses, devolução em 14 dias e revisão completa antes da entrega. <span className="text-ink-500">Condições placeholder — a confirmar.</span></p>
            </div>
          </div>

          <aside className="hidden lg:col-span-5 lg:block xl:col-span-4" aria-label="Comprar esta viatura">
            <div className="sticky top-24">
              <PurchasePanel vehicle={v} />
            </div>
          </aside>
        </div>

        {similar.length > 0 && (
          <section className="mt-16 border-t border-sand-200 pt-14" aria-labelledby="similar-t">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 id="similar-t" className="text-3xl">Viaturas semelhantes</h2>
              <Button asChild variant="link"><Link href="/viaturas/">Ver todas <ArrowRight aria-hidden /></Link></Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((s) => <VehicleCard key={s.id} vehicle={s} />)}
            </div>
          </section>
        )}
      </div>
      <MobileBuyBar vehicle={v} />
    </>
  );
}
