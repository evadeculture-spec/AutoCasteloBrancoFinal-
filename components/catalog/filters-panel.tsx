"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { NativeSelect } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { categories } from "@/data/site";
import { formatKm, formatPrice } from "@/lib/format";
import { bodyTypes, fuels, gearboxes, kmMax, makes, modelsOf, priceBounds, yearBounds } from "@/lib/vehicles";
import { MONTHLY_MAX, type Filters } from "@/components/catalog/filters";
import { cn } from "@/lib/utils";

function Group({ title, children, htmlFor }: { title: string; children: React.ReactNode; htmlFor?: string }) {
  const Title = htmlFor ? "label" : "p";
  return (
    <div className="border-b border-sand-200 py-5 first:pt-0 last:border-0">
      <Title {...(htmlFor ? { htmlFor } : {})} className="mb-3 block text-[13px] font-semibold text-ink-900">
        {title}
      </Title>
      {children}
    </div>
  );
}

function Toggle({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors",
        active ? "border-navy-900 bg-navy-900 text-white" : "border-sand-300 bg-white text-ink-700 hover:border-navy-900",
      )}
    >
      {children}
    </button>
  );
}

/** Painel de filtros — partilhado entre a barra lateral (desktop) e o drawer (mobile) */
export function FiltersPanel({ filters: f, onChange, idPrefix }: { filters: Filters; onChange: (patch: Partial<Filters>) => void; idPrefix: string }) {
  const toggleIn = (arr: string[], v: string) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  return (
    <div>
      <Group title="Marca" htmlFor={`${idPrefix}-make`}>
        <NativeSelect id={`${idPrefix}-make`} value={f.make} onChange={(e) => onChange({ make: e.target.value, model: "" })}>
          <option value="">Todas as marcas</option>
          {makes.map((m) => <option key={m}>{m}</option>)}
        </NativeSelect>
      </Group>
      <Group title="Modelo" htmlFor={`${idPrefix}-model`}>
        <NativeSelect id={`${idPrefix}-model`} value={f.model} onChange={(e) => onChange({ model: e.target.value })}>
          <option value="">Todos os modelos</option>
          {modelsOf(f.make || undefined).map((m) => <option key={m}>{m}</option>)}
        </NativeSelect>
      </Group>

      <Group title="Preço">
        <Slider
          min={priceBounds.min}
          max={priceBounds.max}
          step={500}
          value={[f.priceMin, f.priceMax]}
          onValueChange={([a, b]) => onChange({ priceMin: a, priceMax: b })}
          thumbLabels={["Preço mínimo", "Preço máximo"]}
        />
        <div className="mt-2 flex justify-between text-xs text-ink-500"><span>{formatPrice(f.priceMin)}</span><span>{formatPrice(f.priceMax)}</span></div>
      </Group>

      <Group title="Prestação mensal máxima">
        <Slider min={150} max={MONTHLY_MAX} step={10} value={[f.monthlyMax]} onValueChange={([v]) => onChange({ monthlyMax: v })} thumbLabels={["Prestação máxima"]} />
        <p className="mt-2 text-xs text-ink-500">{f.monthlyMax >= MONTHLY_MAX ? "Sem limite" : `Até ${formatPrice(f.monthlyMax)}/mês`}</p>
      </Group>

      <Group title="Ano">
        <Slider min={yearBounds.min} max={yearBounds.max} step={1} value={[f.yearMin, f.yearMax]} onValueChange={([a, b]) => onChange({ yearMin: a, yearMax: b })} thumbLabels={["Ano mínimo", "Ano máximo"]} />
        <div className="mt-2 flex justify-between text-xs text-ink-500"><span>{f.yearMin}</span><span>{f.yearMax}</span></div>
      </Group>

      <Group title="Quilómetros máximos">
        <Slider min={10000} max={kmMax} step={5000} value={[f.kmMax]} onValueChange={([v]) => onChange({ kmMax: v })} thumbLabels={["Quilómetros máximos"]} />
        <p className="mt-2 text-xs text-ink-500">Até {formatKm(f.kmMax)}</p>
      </Group>

      <Group title="Combustível">
        <div className="space-y-2.5">
          {fuels.map((fu) => (
            <label key={fu} className="flex cursor-pointer items-center gap-3 text-sm text-ink-700">
              <Checkbox checked={f.fuels.includes(fu)} onCheckedChange={() => onChange({ fuels: toggleIn(f.fuels, fu) })} />
              {fu}
            </label>
          ))}
        </div>
      </Group>

      <Group title="Caixa">
        <div className="flex flex-wrap gap-2">
          <Toggle active={!f.gearbox} onClick={() => onChange({ gearbox: "" })}>Todas</Toggle>
          {gearboxes.map((g) => <Toggle key={g} active={f.gearbox === g} onClick={() => onChange({ gearbox: f.gearbox === g ? "" : g })}>{g}</Toggle>)}
        </div>
      </Group>

      <Group title="Tipologia">
        <div className="flex flex-wrap gap-2">
          {bodyTypes.map((b) => <Toggle key={b} active={f.bodyTypes.includes(b)} onClick={() => onChange({ bodyTypes: toggleIn(f.bodyTypes, b) })}>{b}</Toggle>)}
        </div>
      </Group>

      <Group title="Categoria" htmlFor={`${idPrefix}-cat`}>
        <NativeSelect id={`${idPrefix}-cat`} value={f.category} onChange={(e) => onChange({ category: e.target.value as Filters["category"] })}>
          <option value="">Todas</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
        </NativeSelect>
      </Group>
    </div>
  );
}
