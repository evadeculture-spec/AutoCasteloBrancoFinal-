import { CheckCircle2, AlertCircle, Wrench, FileCheck2 } from "lucide-react";
import type { Vehicle } from "@/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { formatKm, formatMonthYear, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

/** Especificações técnicas */
export function Specs({ vehicle: v }: { vehicle: Vehicle }) {
  const rows: [string, string][] = [
    ["Marca", v.make],
    ["Modelo", v.model],
    ["Versão", v.version],
    ["Data da 1.ª matrícula", `${String(v.month).padStart(2, "0")}/${v.year}`],
    ["Quilómetros", formatKm(v.km)],
    ["Combustível", v.fuel],
    ["Caixa", v.gearbox],
    ["Potência", `${v.powerHp} cv`],
    ...(v.engineCc ? ([["Cilindrada", `${formatNumber(v.engineCc)} cm³`]] as [string, string][]) : []),
    ...(v.batteryKwh ? ([["Bateria", `${v.batteryKwh} kWh`], ["Autonomia (WLTP)", `${v.rangeKm} km`]] as [string, string][]) : []),
    ["Consumo combinado (WLTP)", v.consumption],
    ["Emissões CO₂ (WLTP)", `${v.co2} g/km`],
    ["Tipologia", v.bodyType],
    ["Portas / Lugares", `${v.doors} / ${v.seats}`],
    ["Cor", v.color],
    ["N.º de donos", String(v.owners)],
    ["Matrícula", v.plate],
    ["Classe de portagem", `Classe ${v.tollClass}`],
  ];
  return (
    <dl className="grid gap-x-10 sm:grid-cols-2">
      {rows.map(([k, val]) => (
        <div key={k} className="flex justify-between gap-4 border-b border-sand-200 py-3 text-sm">
          <dt className="text-ink-500">{k}</dt>
          <dd className="text-right font-medium text-ink-900">{val}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Equipamento por categorias */
export function Equipment({ vehicle: v }: { vehicle: Vehicle }) {
  return (
    <Accordion type="multiple" defaultValue={[v.equipment[0].category]}>
      {v.equipment.map((g) => (
        <AccordionItem key={g.category} value={g.category}>
          <AccordionTrigger>
            <span>{g.category} <span className="ml-1 text-sm font-normal text-ink-500">({g.items.length})</span></span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {g.items.map((i) => (
                <li key={i} className="flex gap-2 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success-600" aria-hidden />{i}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/** Histórico de revisões e donos */
export function History({ vehicle: v }: { vehicle: Vehicle }) {
  return (
    <div>
      <div className="mb-6 grid grid-cols-3 gap-3">
        {[
          { k: "Donos", v: String(v.owners) },
          { k: "Revisões registadas", v: String(v.history.length) },
          { k: "Quilometragem", v: "Verificada" },
        ].map((s) => (
          <div key={s.k} className="rounded-xl bg-sand-100 p-4">
            <p className="text-[11px] font-medium uppercase tracking-wide text-ink-500">{s.k}</p>
            <p className="mt-1 font-serif text-2xl">{s.v}</p>
          </div>
        ))}
      </div>
      <ol className="relative space-y-6 border-l border-sand-300 pl-6">
        {v.history.map((h, i) => {
          const last = i === v.history.length - 1;
          return (
            <li key={h.date + i} className="relative">
              <span className={cn("absolute -left-[33px] top-0.5 flex size-[18px] items-center justify-center rounded-full border-2 border-white", last ? "bg-brass-500" : "bg-navy-900")}>
                <Wrench className="size-2.5 text-white" aria-hidden />
              </span>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{formatMonthYear(h.date)} · {formatKm(h.km)}</p>
              <p className="mt-1 text-sm font-medium text-ink-900">{h.description}</p>
              <p className="text-xs text-ink-500">{h.workshop}</p>
            </li>
          );
        })}
      </ol>
      <p className="mt-6 text-[11px] text-ink-500">Histórico ilustrativo (MVP). Em produção: dados verificados no livro de revisões digital e na consulta de quilometragem.</p>
    </div>
  );
}

/** Relatório de inspeção pré-venda */
export function Inspection({ vehicle: v }: { vehicle: Vehicle }) {
  const total = v.inspection.reduce((s, i) => s + i.points, 0);
  return (
    <div>
      <div className="mb-6 flex items-center gap-4 rounded-xl border border-success-600/20 bg-success-50 p-5">
        <FileCheck2 className="size-8 shrink-0 text-success-600" aria-hidden />
        <div>
          <p className="font-semibold text-ink-900">Aprovado em {total} pontos de controlo</p>
          <p className="text-sm text-ink-700">Inspeção realizada pela Oficina AutoCasteloBranco · set 2026</p>
        </div>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {v.inspection.map((i) => (
          <li key={i.area} className="rounded-xl border border-sand-200 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold">{i.area}</p>
              {i.status === "ok" ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-success-600"><CheckCircle2 className="size-4" aria-hidden />OK</span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-warning-600"><AlertCircle className="size-4" aria-hidden />Nota</span>
              )}
            </div>
            <p className="mt-1 text-xs text-ink-500">{i.points} pontos verificados</p>
            {i.note && <p className="mt-2 text-xs text-ink-700">{i.note}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
