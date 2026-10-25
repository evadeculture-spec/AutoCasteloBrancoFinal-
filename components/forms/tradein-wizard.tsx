"use client";

import { useState } from "react";
import Link from "next/link";
import { Controller, useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Camera, ImagePlus, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input, NativeSelect } from "@/components/ui/input";
import { StepProgress } from "@/components/forms/step-progress";
import { ConsentField } from "@/components/forms/consent-field";
import { fakeSubmit } from "@/components/forms/success-state";
import { consentSchema, emailSchema, kmSchema, nameSchema, phoneSchema, plateSchema } from "@/components/forms/schemas";
import { TrustInline } from "@/components/shared/trust-inline";
import { formatPrice } from "@/lib/format";
import { normalizePlate } from "@/lib/plate";
import { estimateTradeIn, type Condition } from "@/lib/tradein";
import { cn } from "@/lib/utils";

const schema = z.object({
  plate: plateSchema,
  make: z.string().trim().min(2, "Indique a marca"),
  model: z.string().trim().min(1, "Indique o modelo"),
  year: z.number({ message: "Indique o ano" }).int().min(1995, "Ano inválido").max(2026, "Ano inválido"),
  km: kmSchema,
  condition: z.enum(["excelente", "bom", "razoavel", "danos"], { message: "Escolha o estado" }),
  owners: z.string(),
  serviceBook: z.string(),
  name: nameSchema,
  phone: phoneSchema,
  email: emailSchema,
  consent: consentSchema,
});
type Values = z.input<typeof schema>;

const STEPS = ["Viatura", "Quilómetros e estado", "Fotografias", "Contacto"];
const STEP_FIELDS: FieldPath<Values>[][] = [["plate", "make", "model", "year"], ["km", "condition"], [], ["name", "phone", "email", "consent"]];

const CONDITIONS: { value: Condition; label: string; text: string }[] = [
  { value: "excelente", label: "Excelente", text: "Sem marcas visíveis, como novo" },
  { value: "bom", label: "Bom", text: "Pequenas marcas normais de uso" },
  { value: "razoavel", label: "Razoável", text: "Riscos ou desgaste visíveis" },
  { value: "danos", label: "Com danos", text: "Danos na carroçaria ou avarias" },
];

/** Retoma em passos com proposta estimada no final (SIMULADA) */
export function TradeInWizard() {
  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState<string[]>([]);
  const [result, setResult] = useState<{ min: number; max: number; values: Values } | null>(null);
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { plate: "", make: "", model: "", owners: "1", serviceBook: "sim", name: "", phone: "", email: "", consent: false },
  });
  const { errors, isSubmitting } = form.formState;

  const next = async () => {
    if (!(await form.trigger(STEP_FIELDS[step]))) return;
    if (step < STEPS.length - 1) return setStep((s) => s + 1);
    await form.handleSubmit(async (v) => {
      await fakeSubmit(1400);
      const est = estimateTradeIn({ plate: v.plate, km: v.km as number, condition: v.condition as Condition, year: v.year as number });
      const bonus = (v.serviceBook === "sim" ? 1.03 : 1) * (photos.length >= 3 ? 1.01 : 1);
      setResult({ min: Math.round((est.min * bonus) / 100) * 100, max: Math.round((est.max * bonus) / 100) * 100, values: v });
    })();
  };

  const onFiles = (files: FileList | null) => {
    if (!files) return;
    // Pré-visualização local — nenhum ficheiro é enviado (MVP)
    const urls = Array.from(files).slice(0, 8 - photos.length).map((f) => URL.createObjectURL(f));
    setPhotos((p) => [...p, ...urls]);
  };

  if (result) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-2xl bg-white shadow-panel" role="status" aria-live="polite">
        <div className="bg-navy-900 p-8 text-white md:p-10">
          <p className="eyebrow text-brass-300">Proposta estimada</p>
          <p className="mt-2 text-sm text-white/70">{result.values.make} {result.values.model} · {result.values.year} · {Number(result.values.km).toLocaleString("pt-PT")} km · {result.values.plate}</p>
          <p className="mt-4 font-serif text-5xl md:text-6xl">{formatPrice(result.min)} <span className="text-white/50">–</span> {formatPrice(result.max)}</p>
          <p className="mt-3 text-sm text-white/70">Proposta válida por 7 dias, sujeita a inspeção presencial gratuita (≈ 20 minutos).</p>
        </div>
        <div className="grid gap-6 p-8 md:grid-cols-2 md:p-10">
          <div>
            <h3 className="text-xl">Próximos passos</h3>
            <ol className="mt-4 space-y-3 text-sm text-ink-700">
              <li className="flex gap-3"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-navy-50 text-xs font-bold text-navy-900">1</span>Um consultor contacta-o em até 24 h úteis.</li>
              <li className="flex gap-3"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-navy-50 text-xs font-bold text-navy-900">2</span>Inspeção rápida no stand ou ao domicílio.</li>
              <li className="flex gap-3"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-navy-50 text-xs font-bold text-navy-900">3</span>Valor abatido na compra ou pagamento por transferência.</li>
            </ol>
          </div>
          <div className="flex flex-col justify-center gap-3">
            <Button asChild size="lg"><Link href={`/viaturas/?precoMax=${Math.ceil((result.max + 15000) / 1000) * 1000}`}>Ver viaturas para trocar <ArrowRight aria-hidden /></Link></Button>
            <Button variant="outline" onClick={() => { setResult(null); setStep(0); setPhotos([]); form.reset(); }}>Avaliar outra viatura</Button>
          </div>
          <p className="text-[11px] text-ink-500 md:col-span-2">Estimativa simulada para demonstração (MVP). Em produção: cotação com base em dados de mercado e histórico da viatura.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="rounded-2xl border border-sand-200 bg-white p-5 shadow-panel md:p-8">
      <StepProgress steps={STEPS} current={step} />
      <form noValidate className="mt-8" onSubmit={(e) => { e.preventDefault(); next(); }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            {step === 0 && (
              <fieldset className="space-y-5">
                <legend className="mb-1 font-serif text-2xl">Identifique a viatura</legend>
                <Field label="Matrícula" htmlFor="t-plate" error={errors.plate?.message}>
                  <Input id="t-plate" placeholder="AA-00-AA" autoComplete="off" className="font-mono text-lg uppercase tracking-widest" aria-invalid={!!errors.plate} {...form.register("plate", { onChange: (e) => form.setValue("plate", normalizePlate(e.target.value)) })} />
                </Field>
                <div className="grid gap-5 sm:grid-cols-3">
                  <Field label="Marca" htmlFor="t-make" error={errors.make?.message}><Input id="t-make" aria-invalid={!!errors.make} {...form.register("make")} /></Field>
                  <Field label="Modelo" htmlFor="t-model" error={errors.model?.message}><Input id="t-model" aria-invalid={!!errors.model} {...form.register("model")} /></Field>
                  <Field label="Ano" htmlFor="t-year" error={errors.year?.message}><Input id="t-year" type="number" inputMode="numeric" placeholder="2018" aria-invalid={!!errors.year} {...form.register("year", { valueAsNumber: true })} /></Field>
                </div>
              </fieldset>
            )}
            {step === 1 && (
              <fieldset className="space-y-6">
                <legend className="mb-1 font-serif text-2xl">Quilómetros e estado</legend>
                <div className="grid gap-5 sm:grid-cols-3">
                  <Field label="Quilómetros" htmlFor="t-km" error={errors.km?.message}><Input id="t-km" type="number" inputMode="numeric" placeholder="85000" aria-invalid={!!errors.km} {...form.register("km", { valueAsNumber: true })} /></Field>
                  <Field label="N.º de donos" htmlFor="t-owners">
                    <NativeSelect id="t-owners" {...form.register("owners")}><option value="1">1</option><option value="2">2</option><option value="3">3 ou mais</option></NativeSelect>
                  </Field>
                  <Field label="Livro de revisões" htmlFor="t-book">
                    <NativeSelect id="t-book" {...form.register("serviceBook")}><option value="sim">Completo</option><option value="parcial">Parcial</option><option value="nao">Não tem</option></NativeSelect>
                  </Field>
                </div>
                <div>
                  <p className="mb-3 text-sm font-medium" id="cond-label">Estado geral</p>
                  <Controller
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                      <div role="radiogroup" aria-labelledby="cond-label" className="grid gap-3 sm:grid-cols-2">
                        {CONDITIONS.map((c) => (
                          <button type="button" role="radio" aria-checked={field.value === c.value} key={c.value} onClick={() => field.onChange(c.value)} className={cn("rounded-xl border p-4 text-left transition-colors", field.value === c.value ? "border-navy-900 bg-navy-50" : "border-sand-200 hover:border-sand-400")}>
                            <span className="block text-sm font-semibold">{c.label}</span>
                            <span className="text-xs text-ink-500">{c.text}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  />
                  {errors.condition && <p role="alert" className="mt-2 text-xs font-medium text-danger-600">{errors.condition.message}</p>}
                </div>
              </fieldset>
            )}
            {step === 2 && (
              <fieldset>
                <legend className="mb-1 font-serif text-2xl">Fotografias <span className="font-sans text-sm font-normal text-ink-500">(opcional)</span></legend>
                <p className="mb-5 text-sm text-ink-500">Com 3 ou mais fotografias (frente, traseira, interior, painel) a proposta é mais precisa.</p>
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-sand-300 bg-sand-50 px-6 py-10 text-center transition-colors hover:border-navy-900">
                  <ImagePlus className="size-8 text-ink-500" aria-hidden />
                  <span className="mt-3 text-sm font-semibold">Adicionar fotografias</span>
                  <span className="text-xs text-ink-500">JPG ou PNG · até 8 imagens</span>
                  <input type="file" accept="image/*" multiple capture="environment" className="sr-only" onChange={(e) => onFiles(e.target.files)} />
                </label>
                {photos.length > 0 && (
                  <ul className="mt-4 grid grid-cols-4 gap-2">
                    {photos.map((p, i) => (
                      <li key={p} className="relative aspect-square overflow-hidden rounded-lg">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p} alt={`Fotografia ${i + 1}`} className="size-full object-cover" />
                        <button type="button" onClick={() => setPhotos((ph) => ph.filter((x) => x !== p))} aria-label={`Remover fotografia ${i + 1}`} className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white"><X className="size-3" /></button>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-4 flex items-center gap-2 text-xs text-ink-500"><Camera className="size-3.5" aria-hidden />No telemóvel pode tirar as fotografias diretamente.</p>
              </fieldset>
            )}
            {step === 3 && (
              <fieldset className="space-y-5">
                <legend className="mb-1 font-serif text-2xl">Para onde enviamos a proposta?</legend>
                <Field label="Nome" htmlFor="t-name" error={errors.name?.message}><Input id="t-name" autoComplete="name" aria-invalid={!!errors.name} {...form.register("name")} /></Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Telemóvel" htmlFor="t-phone" error={errors.phone?.message}><Input id="t-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="912 345 678" aria-invalid={!!errors.phone} {...form.register("phone")} /></Field>
                  <Field label="Email" htmlFor="t-email" error={errors.email?.message}><Input id="t-email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...form.register("email")} /></Field>
                </div>
                <ConsentField control={form.control} name="consent" id="t-consent" error={errors.consent?.message} />
              </fieldset>
            )}
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex items-center justify-between gap-3 border-t border-sand-200 pt-6">
          <Button type="button" variant="ghost" onClick={() => setStep((s) => s - 1)} className={step === 0 ? "invisible" : ""}><ArrowLeft aria-hidden /> Anterior</Button>
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 className="animate-spin" /> A calcular…</> : step === STEPS.length - 1 ? "Ver proposta" : step === 2 && photos.length === 0 ? <>Saltar <ArrowRight aria-hidden /></> : <>Continuar <ArrowRight aria-hidden /></>}
          </Button>
        </div>
        <TrustInline className="mt-5 justify-center" />
      </form>
    </div>
  );
}
