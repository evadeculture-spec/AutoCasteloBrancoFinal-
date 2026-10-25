"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NativeSelect } from "@/components/ui/input";
import { fuels, makes, modelsOf } from "@/lib/vehicles";

const PRICE_OPTIONS = [15000, 20000, 25000, 30000, 35000, 40000];

/** Pesquisa rápida: marca, modelo, preço máximo e combustível → /viaturas com filtros */
export function QuickSearch({ total }: { total: number }) {
  const router = useRouter();
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [fuel, setFuel] = useState("");
  const models = useMemo(() => modelsOf(make || undefined), [make]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (make) p.set("marca", make);
    if (model) p.set("modelo", model);
    if (priceMax) p.set("precoMax", priceMax);
    if (fuel) p.set("combustivel", fuel);
    router.push(`/viaturas/${p.size ? `?${p}` : ""}`);
  };

  const label = "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500";
  return (
    <form onSubmit={submit} role="search" aria-label="Pesquisa rápida de viaturas" className="grid grid-cols-2 gap-3 rounded-2xl bg-white p-4 text-ink-900 shadow-panel md:grid-cols-[1fr_1fr_1fr_1fr_auto] md:items-end md:p-5">
      <div>
        <label htmlFor="qs-make" className={label}>Marca</label>
        <NativeSelect id="qs-make" value={make} onChange={(e) => { setMake(e.target.value); setModel(""); }}>
          <option value="">Todas</option>
          {makes.map((m) => <option key={m}>{m}</option>)}
        </NativeSelect>
      </div>
      <div>
        <label htmlFor="qs-model" className={label}>Modelo</label>
        <NativeSelect id="qs-model" value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="">Todos</option>
          {models.map((m) => <option key={m}>{m}</option>)}
        </NativeSelect>
      </div>
      <div>
        <label htmlFor="qs-price" className={label}>Preço máx.</label>
        <NativeSelect id="qs-price" value={priceMax} onChange={(e) => setPriceMax(e.target.value)}>
          <option value="">Sem limite</option>
          {PRICE_OPTIONS.map((p) => <option key={p} value={p}>até {p.toLocaleString("pt-PT")} €</option>)}
        </NativeSelect>
      </div>
      <div>
        <label htmlFor="qs-fuel" className={label}>Combustível</label>
        <NativeSelect id="qs-fuel" value={fuel} onChange={(e) => setFuel(e.target.value)}>
          <option value="">Todos</option>
          {fuels.map((f) => <option key={f}>{f}</option>)}
        </NativeSelect>
      </div>
      <Button type="submit" size="lg" className="col-span-2 h-12 md:col-span-1">
        <Search aria-hidden /> Ver viaturas <span className="font-normal opacity-70">({total})</span>
      </Button>
    </form>
  );
}
