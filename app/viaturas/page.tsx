import { Suspense } from "react";
import Link from "next/link";
import { Catalog, CatalogSkeleton } from "@/components/catalog/catalog";
import { TrustInline } from "@/components/shared/trust-inline";
import { pageMetadata } from "@/lib/seo";
import { vehicles } from "@/lib/vehicles";

export const metadata = pageMetadata({
  title: "Viaturas seminovas em stock",
  description: `${vehicles.length} viaturas seminovas revistas, com garantia e prestação mensal visível. Filtre por marca, preço, prestação, combustível e tipologia.`,
  path: "/viaturas/",
});

export default function ViaturasPage() {
  return (
    <>
      <section className="border-b border-sand-200 bg-sand-50">
        <div className="container-site flex flex-col gap-4 py-10 md:flex-row md:items-end md:justify-between md:py-14">
          <div>
            <nav aria-label="Breadcrumb" className="mb-3 text-xs text-ink-500">
              <Link href="/" className="hover:text-ink-900">Início</Link> <span aria-hidden>/</span> <span aria-current="page">Viaturas</span>
            </nav>
            <h1 className="text-4xl md:text-5xl">Viaturas em stock</h1>
            <p className="mt-3 max-w-xl text-ink-500">Todas inspecionadas em 140 pontos e revistas na nossa oficina. Sem surpresas.</p>
          </div>
          <TrustInline />
        </div>
      </section>
      <Suspense fallback={<CatalogSkeleton />}>
        <Catalog />
      </Suspense>
    </>
  );
}
