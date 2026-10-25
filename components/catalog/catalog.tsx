"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, SearchX, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NativeSelect } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { VehicleCard, VehicleCardSkeleton } from "@/components/vehicles/vehicle-card";
import { FiltersPanel } from "@/components/catalog/filters-panel";
import { applyFilters, defaultFilters, MONTHLY_MAX, parseFilters, serializeFilters, sortOptions, sortVehicles, type Filters, type SortKey } from "@/components/catalog/filters";
import { categories } from "@/data/site";
import { useFavorites } from "@/hooks/use-stored-list";
import { formatKm, formatPrice } from "@/lib/format";
import { vehicles } from "@/lib/vehicles";

/** Catálogo /viaturas — filtros, ordenação, chips ativos, favoritos e comparador */
export function Catalog() {
  const params = useSearchParams();
  const router = useRouter();
  const [filters, setFilters] = useState<Filters>(() => parseFilters(new URLSearchParams(params.toString())));
  const [sort, setSort] = useState<SortKey>(() => (params.get("ordenar") as SortKey) ?? "relevancia");
  const [pending, startTransition] = useTransition();
  const { list: favoriteIds } = useFavorites();
  const pushed = useRef<string[]>([]); // URLs escritas pelo próprio catálogo, ainda por confirmar

  // Sincroniza o estado com a URL (partilhável e com histórico)
  useEffect(() => {
    const qs = serializeFilters(filters, sort).toString();
    pushed.current.push(qs);
    router.replace(`/viaturas/${qs ? `?${qs}` : ""}`, { scroll: false });
  }, [filters, sort, router]);

  // Reage a navegação externa (ex: link "Favoritos" no cabeçalho com o catálogo já aberto)
  useEffect(() => {
    const incoming = params.toString();
    const idx = pushed.current.indexOf(incoming);
    if (idx !== -1) {
      pushed.current = pushed.current.slice(idx + 1); // URL escrita por nós: ignora
      return;
    }
    if (incoming !== serializeFilters(filters, sort).toString()) {
      setFilters(parseFilters(new URLSearchParams(incoming)));
      setSort((params.get("ordenar") as SortKey) ?? "relevancia");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const update = (patch: Partial<Filters>) => startTransition(() => setFilters((f) => ({ ...f, ...patch })));
  const reset = () => startTransition(() => setFilters(defaultFilters));

  const results = useMemo(() => sortVehicles(applyFilters(vehicles, filters, favoriteIds), sort), [filters, sort, favoriteIds]);

  // Chips de filtros ativos
  const chips: { label: string; clear: Partial<Filters> }[] = [];
  if (filters.make) chips.push({ label: filters.make, clear: { make: "", model: "" } });
  if (filters.model) chips.push({ label: filters.model, clear: { model: "" } });
  if (filters.priceMin !== defaultFilters.priceMin || filters.priceMax !== defaultFilters.priceMax)
    chips.push({ label: `${formatPrice(filters.priceMin)} – ${formatPrice(filters.priceMax)}`, clear: { priceMin: defaultFilters.priceMin, priceMax: defaultFilters.priceMax } });
  if (filters.monthlyMax < MONTHLY_MAX) chips.push({ label: `Até ${formatPrice(filters.monthlyMax)}/mês`, clear: { monthlyMax: MONTHLY_MAX } });
  if (filters.yearMin !== defaultFilters.yearMin || filters.yearMax !== defaultFilters.yearMax)
    chips.push({ label: `${filters.yearMin}–${filters.yearMax}`, clear: { yearMin: defaultFilters.yearMin, yearMax: defaultFilters.yearMax } });
  if (filters.kmMax !== defaultFilters.kmMax) chips.push({ label: `Até ${formatKm(filters.kmMax)}`, clear: { kmMax: defaultFilters.kmMax } });
  filters.fuels.forEach((fu) => chips.push({ label: fu, clear: { fuels: filters.fuels.filter((x) => x !== fu) } }));
  if (filters.gearbox) chips.push({ label: filters.gearbox, clear: { gearbox: "" } });
  filters.bodyTypes.forEach((b) => chips.push({ label: b, clear: { bodyTypes: filters.bodyTypes.filter((x) => x !== b) } }));
  if (filters.category) chips.push({ label: categories.find((c) => c.id === filters.category)?.label ?? filters.category, clear: { category: "" } });
  if (filters.favorites) chips.push({ label: "Favoritos", clear: { favorites: false } });

  return (
    <div className="container-site grid gap-10 pb-24 pt-8 lg:grid-cols-12">
      {/* Filtros desktop */}
      <aside className="hidden lg:col-span-3 lg:block" aria-label="Filtros">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 scrollbar-none">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-ink-500">Filtros</h2>
            {chips.length > 0 && <button onClick={reset} className="text-xs font-medium text-navy-900 underline underline-offset-2">Limpar tudo</button>}
          </div>
          <FiltersPanel filters={filters} onChange={update} idPrefix="d" />
        </div>
      </aside>

      <section className="lg:col-span-9" aria-label="Resultados">
        {/* Barra de resultados */}
        <div className="sticky top-16 z-20 -mx-4 mb-4 flex items-center justify-between gap-3 border-b border-sand-200 bg-white/95 px-4 py-3 backdrop-blur md:static md:mx-0 md:border-0 md:bg-transparent md:px-0 md:py-0">
          <p className="text-sm text-ink-700" aria-live="polite">
            <span className="font-serif text-2xl text-ink-900">{results.length}</span> {results.length === 1 ? "viatura" : "viaturas"}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant={filters.favorites ? "primary" : "outline"}
              size="sm"
              onClick={() => update({ favorites: !filters.favorites })}
              aria-pressed={filters.favorites}
              className="hidden sm:inline-flex"
            >
              <Heart aria-hidden className={filters.favorites ? "fill-current" : ""} /> Favoritos ({favoriteIds.length})
            </Button>
            <label htmlFor="sort" className="sr-only">Ordenar por</label>
            <NativeSelect id="sort" value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="h-9 w-[170px] text-[13px] sm:w-[210px]">
              {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </NativeSelect>
            {/* Drawer de filtros (mobile) */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <SlidersHorizontal aria-hidden /> Filtros{chips.length > 0 && ` (${chips.length})`}
                </Button>
              </DialogTrigger>
              <DialogContent side="bottom" className="pb-28">
                <DialogTitle className="mb-6">Filtros</DialogTitle>
                <FiltersPanel filters={filters} onChange={update} idPrefix="m" />
                <div className="fixed inset-x-0 bottom-0 flex gap-3 border-t border-sand-200 bg-white p-4">
                  <Button variant="outline" className="flex-1" onClick={reset}>Limpar</Button>
                  <DialogClose asChild>
                    <Button className="flex-[2]">Ver {results.length} viaturas</Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {chips.length > 0 && (
          <ul className="mb-6 flex flex-wrap gap-2" aria-label="Filtros ativos">
            {chips.map((c) => (
              <li key={c.label}>
                <button onClick={() => update(c.clear)} className="inline-flex items-center gap-1.5 rounded-full bg-navy-50 py-1.5 pl-3 pr-2 text-xs font-medium text-navy-900 transition-colors hover:bg-navy-100" aria-label={`Remover filtro ${c.label}`}>
                  {c.label} <X className="size-3.5" aria-hidden />
                </button>
              </li>
            ))}
            <li><button onClick={reset} className="px-2 py-1.5 text-xs font-medium text-ink-500 underline underline-offset-2 hover:text-ink-900">Limpar filtros</button></li>
          </ul>
        )}

        {pending ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <VehicleCardSkeleton key={i} />)}
          </div>
        ) : results.length === 0 ? (
          <EmptyState favorites={filters.favorites} onReset={reset} />
        ) : (
          <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {results.map((v, i) => <VehicleCard key={v.id} vehicle={v} priority={i < 3} />)}
            </AnimatePresence>
          </motion.div>
        )}

        <p className="mt-10 text-xs leading-relaxed text-ink-500">
          Preços com IVA incluído. Prestação “desde” calculada com entrada de 15 % e 84 meses a uma TAN ilustrativa — simulação sem valor contratual, condições a confirmar com a entidade financeira.
        </p>
      </section>
    </div>
  );
}

function EmptyState({ favorites, onReset }: { favorites: boolean; onReset: () => void }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-sand-300 bg-sand-50 px-6 py-20 text-center">
      <span className="mb-5 flex size-14 items-center justify-center rounded-full bg-white text-ink-500 shadow-soft">
        {favorites ? <Heart className="size-6" /> : <SearchX className="size-6" />}
      </span>
      <h3 className="text-2xl">{favorites ? "Ainda não guardou favoritos" : "Sem resultados para estes filtros"}</h3>
      <p className="mt-2 max-w-md text-sm text-ink-500">
        {favorites ? "Toque no coração de qualquer viatura para a guardar aqui." : "Experimente alargar o intervalo de preço ou remover alguns filtros. Também podemos procurar a viatura por si."}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button onClick={onReset}>Ver todas as viaturas</Button>
        <Button asChild variant="outline"><a href="/contactos/?assunto=procura#formulario">Pedir pesquisa personalizada</a></Button>
      </div>
    </div>
  );
}

export function CatalogSkeleton() {
  return (
    <div className="container-site grid gap-10 pb-24 pt-8 lg:grid-cols-12">
      <div className="hidden space-y-4 lg:col-span-3 lg:block">
        {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-14" />)}
      </div>
      <div className="lg:col-span-9">
        <div className="skeleton mb-6 h-9 w-40" />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <VehicleCardSkeleton key={i} />)}
        </div>
      </div>
    </div>
  );
}
