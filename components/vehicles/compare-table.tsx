"use client";

import Link from "next/link";
import { GitCompareArrows, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/shared/safe-image";
import { COMPARE_MAX, useCompare } from "@/hooks/use-stored-list";
import { formatKm, formatMonthly, formatPrice } from "@/lib/format";
import { monthlyOf, vehicles } from "@/lib/vehicles";
import type { Vehicle } from "@/types";
import { cn } from "@/lib/utils";

const rows: { label: string; get: (v: Vehicle) => string | number; best?: "min" | "max" }[] = [
  { label: "Preço (IVA incl.)", get: (v) => v.price, best: "min" },
  { label: "Prestação desde", get: (v) => Math.round(monthlyOf(v)), best: "min" },
  { label: "Ano", get: (v) => v.year, best: "max" },
  { label: "Quilómetros", get: (v) => v.km, best: "min" },
  { label: "Combustível", get: (v) => v.fuel },
  { label: "Caixa", get: (v) => v.gearbox },
  { label: "Potência (cv)", get: (v) => v.powerHp, best: "max" },
  { label: "Emissões CO₂ (g/km)", get: (v) => v.co2, best: "min" },
  { label: "Consumo", get: (v) => v.consumption },
  { label: "Tipologia", get: (v) => v.bodyType },
  { label: "N.º de donos", get: (v) => v.owners, best: "min" },
  { label: "Garantia (meses)", get: (v) => v.warrantyMonths, best: "max" },
  { label: "Itens de equipamento", get: (v) => v.equipment.reduce((s, g) => s + g.items.length, 0), best: "max" },
];

function display(label: string, val: string | number) {
  if (typeof val !== "number") return val;
  if (label.startsWith("Preço")) return formatPrice(val);
  if (label.startsWith("Prestação")) return `${formatMonthly(val)}/mês`;
  if (label === "Quilómetros") return formatKm(val);
  return String(val);
}

export function CompareTable() {
  const { list, remove } = useCompare();
  const selected = list.map((id) => vehicles.find((v) => v.id === id)).filter((v): v is Vehicle => !!v);

  if (selected.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-sand-300 bg-sand-50 px-6 py-20 text-center">
        <GitCompareArrows className="size-10 text-ink-500" aria-hidden />
        <h2 className="mt-4 text-2xl">Ainda não escolheu viaturas</h2>
        <p className="mt-2 max-w-md text-sm text-ink-500">No catálogo, toque em “Comparar” em até {COMPARE_MAX} viaturas.</p>
        <Button asChild className="mt-6"><Link href="/viaturas/">Ir para o catálogo</Link></Button>
      </div>
    );
  }

  return (
    <div className="mt-10 overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <caption className="sr-only">Comparação de viaturas</caption>
        <thead>
          <tr>
            <th scope="col" className="w-48 p-3 text-left align-bottom text-xs font-semibold uppercase tracking-wide text-ink-500">Viatura</th>
            {selected.map((v) => (
              <th key={v.id} scope="col" className="p-3 text-left align-top font-normal">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sand-100">
                  <SafeImage src={v.images[0]} alt="" fill sizes="300px" className="object-cover" />
                  <button onClick={() => remove(v.id)} aria-label={`Remover ${v.make} ${v.model}`} className="absolute right-2 top-2 rounded-full bg-white/95 p-1.5 shadow-soft"><X className="size-4" /></button>
                </div>
                <Link href={`/viaturas/${v.slug}/`} className="mt-3 block font-semibold text-ink-900 hover:underline">{v.make} {v.model}</Link>
                <span className="text-xs text-ink-500">{v.version}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const values = selected.map(r.get);
            const nums = values.filter((x): x is number => typeof x === "number");
            const best = r.best && nums.length > 1 ? (r.best === "min" ? Math.min(...nums) : Math.max(...nums)) : null;
            return (
              <tr key={r.label} className="border-t border-sand-200">
                <th scope="row" className="p-3 text-left font-medium text-ink-500">{r.label}</th>
                {values.map((val, i) => (
                  <td key={i} className={cn("p-3 tabular-nums", best !== null && val === best && "font-semibold text-success-600")}>
                    {display(r.label, val)}
                  </td>
                ))}
              </tr>
            );
          })}
          <tr className="border-t border-sand-200">
            <td />
            {selected.map((v) => (
              <td key={v.id} className="p-3"><Button asChild size="sm" className="w-full"><Link href={`/viaturas/${v.slug}/`}>Ver ficha</Link></Button></td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
