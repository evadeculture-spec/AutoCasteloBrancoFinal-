"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { kmSchema, plateSchema } from "@/components/forms/schemas";
import { fakeSubmit } from "@/components/forms/success-state";
import { formatPrice } from "@/lib/format";
import { normalizePlate } from "@/lib/plate";
import { estimateTradeIn } from "@/lib/tradein";

const schema = z.object({ plate: plateSchema, km: kmSchema });
type Values = z.input<typeof schema>;

/** Avaliação de retoma inline (matrícula + km → estimativa simulada) */
export function TradeInInline({ price }: { price: number }) {
  const [result, setResult] = useState<{ min: number; max: number } | null>(null);
  const form = useForm<Values>({ resolver: zodResolver(schema) });
  const { errors, isSubmitting } = form.formState;
  return (
    <div className="rounded-2xl border border-sand-200 bg-sand-50 p-6 md:p-8">
      <div className="flex items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-navy-900 shadow-soft"><Repeat className="size-5" aria-hidden /></span>
        <div>
          <h3 className="text-2xl">Quanto vale o seu carro?</h3>
          <p className="mt-1 text-sm text-ink-500">Abata o valor da retoma ao preço desta viatura. Estimativa imediata.</p>
        </div>
      </div>
      <form
        noValidate
        className="mt-6 grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-start"
        onSubmit={form.handleSubmit(async (v) => {
          await fakeSubmit(800);
          setResult(estimateTradeIn({ plate: v.plate, km: v.km }));
        })}
      >
        <Field label="Matrícula" htmlFor="ti-plate" error={errors.plate?.message}>
          <Input id="ti-plate" placeholder="AA-00-AA" autoComplete="off" className="font-mono uppercase tracking-wider" aria-invalid={!!errors.plate} {...form.register("plate", { onChange: (e) => form.setValue("plate", normalizePlate(e.target.value)) })} />
        </Field>
        <Field label="Quilómetros" htmlFor="ti-km" error={errors.km?.message}>
          <Input id="ti-km" type="number" inputMode="numeric" placeholder="85000" aria-invalid={!!errors.km} {...form.register("km", { valueAsNumber: true })} />
        </Field>
        <Button type="submit" size="lg" className="h-12 sm:mt-[26px]" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin" /> : null} Avaliar
        </Button>
      </form>
      {result && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} role="status" className="mt-6 grid gap-4 rounded-xl bg-white p-5 shadow-soft sm:grid-cols-2 sm:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Estimativa de retoma</p>
            <p className="mt-1 font-serif text-3xl text-navy-900">{formatPrice(result.min)} – {formatPrice(result.max)}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-xs text-ink-500">Diferença a pagar desde</p>
            <p className="text-xl font-semibold">{formatPrice(Math.max(0, price - result.max))}</p>
            <Button asChild variant="link" className="mt-1 text-sm">
              <Link href="/retoma/">Obter proposta detalhada <ArrowRight aria-hidden /></Link>
            </Button>
          </div>
          <p className="text-[11px] text-ink-500 sm:col-span-2">Estimativa simulada e não vinculativa. Valor final após inspeção presencial (≈ 20 min).</p>
        </motion.div>
      )}
    </div>
  );
}
