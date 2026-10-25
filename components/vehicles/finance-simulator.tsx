"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { site } from "@/data/site";
import { formatMonthly, formatPercent, formatPrice } from "@/lib/format";
import { simulate } from "@/lib/finance";
import { cn } from "@/lib/utils";

/**
 * Simulador de financiamento em tempo real (ILUSTRATIVO).
 * `price` fixo (ficha de viatura) ou editável (página de financiamento).
 */
export function FinanceSimulator({
  price: initialPrice,
  editablePrice,
  compact,
  onMonthlyChange,
}: {
  price: number;
  editablePrice?: boolean;
  compact?: boolean;
  onMonthlyChange?: (m: number) => void;
}) {
  const [price, setPrice] = useState(initialPrice);
  const [down, setDown] = useState(Math.round((initialPrice * site.finance.defaultDownPct) / 100) * 100);
  const [term, setTerm] = useState<number>(site.finance.defaultTerm);
  const maxDown = Math.round((price * 0.6) / 100) * 100;
  const d = Math.min(down, maxDown);
  const sim = useMemo(() => simulate(price, d, term), [price, d, term]);
  useEffect(() => {
    onMonthlyChange?.(sim.monthly);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sim.monthly]);

  return (
    <div className={cn(compact ? "space-y-5" : "space-y-7")}>
      {editablePrice && (
        <div>
          <div className="mb-3 flex items-baseline justify-between">
            <span id="sim-price" className="text-sm font-medium">Preço da viatura</span>
            <span className="text-sm font-semibold tabular-nums">{formatPrice(price)}</span>
          </div>
          <Slider min={8000} max={60000} step={500} value={[price]} onValueChange={([v]) => setPrice(v)} thumbLabels={["Preço da viatura"]} />
        </div>
      )}
      <div>
        <div className="mb-3 flex items-baseline justify-between">
          <span className="text-sm font-medium">Entrada</span>
          <span className="text-sm font-semibold tabular-nums">{formatPrice(d)}</span>
        </div>
        <Slider min={0} max={maxDown} step={100} value={[d]} onValueChange={([v]) => setDown(v)} thumbLabels={["Valor de entrada"]} />
      </div>
      <div>
        <p className="mb-3 text-sm font-medium" id="term-label">Prazo</p>
        <div role="radiogroup" aria-labelledby="term-label" className="grid grid-cols-4 gap-1.5 sm:grid-cols-7">
          {site.finance.terms.map((t) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={term === t}
              onClick={() => setTerm(t)}
              className={cn("rounded-lg border py-2 text-[13px] font-medium tabular-nums transition-colors", term === t ? "border-navy-900 bg-navy-900 text-white" : "border-sand-300 hover:border-navy-900")}
            >
              {t}
              <span className="sr-only"> meses</span>
            </button>
          ))}
        </div>
        <p className="mt-1.5 text-[11px] text-ink-500">meses</p>
      </div>

      <div className="rounded-xl bg-navy-900 p-5 text-white">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/60">Prestação mensal estimada</p>
        <p className="mt-1 font-serif text-4xl tabular-nums" aria-live="polite">
          <motion.span key={Math.round(sim.monthly)} initial={{ opacity: 0.4, y: 4 }} animate={{ opacity: 1, y: 0 }} className="inline-block">
            {formatMonthly(sim.monthly)}
          </motion.span>
          <span className="text-lg text-white/70">/mês</span>
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-white/15 pt-4 text-xs">
          <dt className="text-white/60">Montante financiado</dt>
          <dd className="text-right font-medium tabular-nums">{formatPrice(sim.financed)}</dd>
          <dt className="text-white/60">TAN (ilustrativa)</dt>
          <dd className="text-right font-medium tabular-nums">{formatPercent(site.finance.tan, 2)}</dd>
          <dt className="text-white/60">TAEG (ilustrativa)</dt>
          <dd className="text-right font-medium tabular-nums">{formatPercent(site.finance.taeg, 1)}</dd>
          {!compact && (
            <>
              <dt className="text-white/60">Total de juros</dt>
              <dd className="text-right font-medium tabular-nums">{formatPrice(sim.totalInterest)}</dd>
              <dt className="text-white/60">MTIC (estimado)</dt>
              <dd className="text-right font-medium tabular-nums">{formatPrice(sim.mtic)}</dd>
            </>
          )}
        </dl>
      </div>
      <p className="text-[11px] leading-relaxed text-ink-500">
        Simulação meramente ilustrativa, sem valor contratual. TAN, TAEG e MTIC a confirmar pela entidade financeira parceira e sujeitos a análise e aprovação de crédito.
        Valores placeholder — condições reais a definir.
      </p>
    </div>
  );
}
