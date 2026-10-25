"use client";

import { useEffect, useMemo, useState } from "react";
import { Controller, useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, Car, Check, Clock, Home, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input, Textarea } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { StepProgress } from "@/components/forms/step-progress";
import { ConsentField } from "@/components/forms/consent-field";
import { SuccessState, fakeSubmit } from "@/components/forms/success-state";
import { consentSchema, emailSchema, nameSchema, phoneSchema, plateSchema } from "@/components/forms/schemas";
import { ServiceIcon } from "@/components/workshop/service-icon";
import { formatDuration, services } from "@/lib/services";
import { formatPrice } from "@/lib/format";
import { normalizePlate } from "@/lib/plate";
import { nextDays, type DaySlots } from "@/lib/slots";
import { cn } from "@/lib/utils";

const schema = z
  .object({
    plate: plateSchema,
    make: z.string().trim().min(2, "Indique a marca"),
    model: z.string().trim().min(1, "Indique o modelo"),
    services: z.array(z.string()).min(1, "Escolha pelo menos um serviço"),
    day: z.string().min(1, "Escolha um dia"),
    time: z.string().min(1, "Escolha uma hora"),
    courtesyCar: z.boolean(),
    pickup: z.boolean(),
    address: z.string().trim(),
    name: nameSchema,
    phone: phoneSchema,
    email: emailSchema,
    notes: z.string().max(500).optional(),
    consent: consentSchema,
  })
  .refine((d) => !d.pickup || d.address.length > 5, { path: ["address"], message: "Indique a morada de recolha" });

type Values = z.input<typeof schema>;

const STEPS = ["Viatura", "Serviços", "Data e hora", "Contacto"];
const STEP_FIELDS: FieldPath<Values>[][] = [
  ["plate", "make", "model"],
  ["services"],
  ["day", "time"],
  ["name", "phone", "email", "address", "consent"],
];

/** Marcação online da oficina em 4 passos (agenda SIMULADA) */
export function BookingWizard({ preselected }: { preselected?: string }) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [done, setDone] = useState<{ ref: string; values: Values } | null>(null);
  const [days, setDays] = useState<DaySlots[]>([]);
  // Os slots dependem da data atual: calculados no cliente
  useEffect(() => setDays(nextDays(14)), []);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { plate: "", make: "", model: "", services: preselected ? [preselected] : [], day: "", time: "", courtesyCar: false, pickup: false, address: "", name: "", phone: "", email: "", notes: "", consent: false },
  });
  const { errors, isSubmitting } = form.formState;
  const values = form.watch();

  useEffect(() => {
    if (preselected) form.setValue("services", Array.from(new Set([...form.getValues("services"), preselected])));
  }, [preselected, form]);

  const chosen = useMemo(() => services.filter((s) => values.services.includes(s.id)), [values.services]);
  const totalMin = chosen.reduce((s, x) => s + x.durationMin, 0);
  const totalFrom = chosen.reduce((s, x) => s + x.priceFrom, 0);
  const selectedDay = days.find((d) => d.key === values.day);

  const next = async () => {
    const ok = await form.trigger(STEP_FIELDS[step]);
    if (!ok) return;
    if (step < STEPS.length - 1) {
      setDir(1);
      setStep((s) => s + 1);
    } else {
      await form.handleSubmit(async (v) => {
        await fakeSubmit(1100);
        setDone({ ref: `OF-${Date.now().toString(36).toUpperCase().slice(-6)}`, values: v });
      })();
    }
  };
  const back = () => {
    setDir(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  if (done) {
    const d = days.find((x) => x.key === done.values.day);
    return (
      <div className="rounded-2xl border border-sand-200 bg-white p-6 shadow-panel md:p-10">
        <SuccessState
          title="Marcação confirmada"
          actions={
            <Button variant="outline" onClick={() => { setDone(null); setStep(0); form.reset(); }}>
              Fazer nova marcação
            </Button>
          }
        >
          <p>Referência <b className="font-mono text-ink-900">{done.ref}</b> · enviámos a confirmação para {done.values.email} (simulação).</p>
          <dl className="mt-5 grid gap-2 rounded-xl bg-sand-100 p-4 text-left text-sm">
            <div className="flex justify-between gap-4"><dt className="text-ink-500">Viatura</dt><dd className="font-medium">{done.values.make} {done.values.model} · {done.values.plate}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-ink-500">Data</dt><dd className="font-medium capitalize">{d?.date.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long" })} · {done.values.time}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-ink-500">Serviços</dt><dd className="text-right font-medium">{chosen.map((c) => c.name).join(", ")}</dd></div>
            {done.values.courtesyCar && <div className="flex justify-between gap-4"><dt className="text-ink-500">Extra</dt><dd className="font-medium">Viatura de substituição</dd></div>}
            {done.values.pickup && <div className="flex justify-between gap-4"><dt className="text-ink-500">Recolha</dt><dd className="text-right font-medium">{done.values.address}</dd></div>}
          </dl>
        </SuccessState>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="rounded-2xl border border-sand-200 bg-white p-5 shadow-panel md:p-8 lg:col-span-8">
        <StepProgress steps={STEPS} current={step} />

        <form noValidate onSubmit={(e) => { e.preventDefault(); next(); }} className="mt-8">
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              initial={{ opacity: 0, x: dir * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -24 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === 0 && (
                <fieldset className="space-y-5">
                  <legend className="mb-1 font-serif text-2xl">Qual é a sua viatura?</legend>
                  <Field label="Matrícula" htmlFor="b-plate" error={errors.plate?.message}>
                    <Input id="b-plate" placeholder="AA-00-AA" autoComplete="off" className="font-mono text-lg uppercase tracking-widest" aria-invalid={!!errors.plate} {...form.register("plate", { onChange: (e) => form.setValue("plate", normalizePlate(e.target.value)) })} />
                  </Field>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Marca" htmlFor="b-make" error={errors.make?.message}>
                      <Input id="b-make" placeholder="ex: Renault" aria-invalid={!!errors.make} {...form.register("make")} />
                    </Field>
                    <Field label="Modelo" htmlFor="b-model" error={errors.model?.message}>
                      <Input id="b-model" placeholder="ex: Clio" aria-invalid={!!errors.model} {...form.register("model")} />
                    </Field>
                  </div>
                </fieldset>
              )}

              {step === 1 && (
                <fieldset>
                  <legend className="mb-1 font-serif text-2xl">Que serviços precisa?</legend>
                  <p className="mb-5 text-sm text-ink-500">Pode escolher vários. Se não tem a certeza, escolha “Diagnóstico eletrónico”.</p>
                  <Controller
                    control={form.control}
                    name="services"
                    render={({ field }) => (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {services.map((s) => {
                          const checked = field.value.includes(s.id);
                          return (
                            <label key={s.id} className={cn("flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors", checked ? "border-navy-900 bg-navy-50" : "border-sand-200 hover:border-sand-400")}>
                              <Checkbox
                                checked={checked}
                                onCheckedChange={(v) => field.onChange(v ? [...field.value, s.id] : field.value.filter((x) => x !== s.id))}
                                className="mt-0.5"
                              />
                              <span className="flex-1">
                                <span className="flex items-center gap-2 text-sm font-semibold"><ServiceIcon name={s.icon} className="size-4 text-brass-600" />{s.name}</span>
                                <span className="mt-1 block text-xs text-ink-500">{formatDuration(s.durationMin)} · desde {formatPrice(s.priceFrom)}*</span>
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  />
                  {errors.services && <p role="alert" className="mt-3 text-xs font-medium text-danger-600">{errors.services.message}</p>}
                </fieldset>
              )}

              {step === 2 && (
                <fieldset>
                  <legend className="mb-1 font-serif text-2xl">Quando lhe dá jeito?</legend>
                  <p className="mb-5 text-sm text-ink-500">Disponibilidade dos próximos 14 dias.</p>
                  <div role="radiogroup" aria-label="Dia" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 scrollbar-none">
                    {days.length === 0
                      ? Array.from({ length: 7 }).map((_, i) => <div key={i} className="skeleton h-[84px] w-[68px] shrink-0" />)
                      : days.map((d) => {
                          const active = values.day === d.key;
                          const free = d.slots.filter((s) => s.available).length;
                          return (
                            <button
                              type="button"
                              role="radio"
                              aria-checked={active}
                              key={d.key}
                              disabled={d.closed || free === 0}
                              onClick={() => { form.setValue("day", d.key, { shouldValidate: true }); form.setValue("time", ""); }}
                              className={cn(
                                "flex w-[68px] shrink-0 flex-col items-center rounded-xl border py-3 transition-colors disabled:cursor-not-allowed disabled:opacity-40",
                                active ? "border-navy-900 bg-navy-900 text-white" : "border-sand-200 hover:border-navy-900",
                              )}
                            >
                              <span className="text-[11px] font-medium uppercase">{d.date.toLocaleDateString("pt-PT", { weekday: "short" }).replace(".", "")}</span>
                              <span className="font-serif text-2xl leading-tight">{d.date.getDate()}</span>
                              <span className={cn("text-[10px]", active ? "text-white/70" : "text-ink-500")}>{d.closed ? "Fechado" : `${free} vagas`}</span>
                            </button>
                          );
                        })}
                  </div>
                  {errors.day && <p role="alert" className="mt-2 text-xs font-medium text-danger-600">{errors.day.message}</p>}

                  {selectedDay && (
                    <div className="mt-6">
                      <p className="mb-3 text-sm font-medium capitalize">{selectedDay.date.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long" })}</p>
                      <div role="radiogroup" aria-label="Hora" className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                        {selectedDay.slots.map((s) => (
                          <button
                            type="button"
                            role="radio"
                            aria-checked={values.time === s.time}
                            key={s.time}
                            disabled={!s.available}
                            onClick={() => form.setValue("time", s.time, { shouldValidate: true })}
                            className={cn(
                              "rounded-lg border py-2.5 text-sm font-medium tabular-nums transition-colors disabled:cursor-not-allowed disabled:border-dashed disabled:text-sand-400 disabled:line-through",
                              values.time === s.time ? "border-navy-900 bg-navy-900 text-white" : "border-sand-300 hover:border-navy-900",
                            )}
                          >
                            {s.time}
                          </button>
                        ))}
                      </div>
                      {errors.time && <p role="alert" className="mt-2 text-xs font-medium text-danger-600">{errors.time.message}</p>}
                    </div>
                  )}

                  <div className="mt-8 space-y-3 rounded-xl bg-sand-100 p-4">
                    <label className="flex cursor-pointer items-start gap-3 text-sm">
                      <Controller control={form.control} name="courtesyCar" render={({ field }) => <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} className="mt-0.5" />} />
                      <span><b className="flex items-center gap-1.5"><Car className="size-4 text-brass-600" aria-hidden />Viatura de substituição</b><span className="text-ink-500">Sujeito a disponibilidade (condições a confirmar).</span></span>
                    </label>
                    <label className="flex cursor-pointer items-start gap-3 text-sm">
                      <Controller control={form.control} name="pickup" render={({ field }) => <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} className="mt-0.5" />} />
                      <span><b className="flex items-center gap-1.5"><Home className="size-4 text-brass-600" aria-hidden />Recolha e entrega ao domicílio</b><span className="text-ink-500">Na área de Castelo Branco (custo a confirmar).</span></span>
                    </label>
                  </div>
                </fieldset>
              )}

              {step === 3 && (
                <fieldset className="space-y-5">
                  <legend className="mb-1 font-serif text-2xl">Os seus contactos</legend>
                  <Field label="Nome" htmlFor="b-name" error={errors.name?.message}>
                    <Input id="b-name" autoComplete="name" aria-invalid={!!errors.name} {...form.register("name")} />
                  </Field>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Telemóvel" htmlFor="b-phone" error={errors.phone?.message}>
                      <Input id="b-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="912 345 678" aria-invalid={!!errors.phone} {...form.register("phone")} />
                    </Field>
                    <Field label="Email" htmlFor="b-email" error={errors.email?.message}>
                      <Input id="b-email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...form.register("email")} />
                    </Field>
                  </div>
                  {values.pickup && (
                    <Field label="Morada de recolha" htmlFor="b-address" error={errors.address?.message}>
                      <Input id="b-address" autoComplete="street-address" aria-invalid={!!errors.address} {...form.register("address")} />
                    </Field>
                  )}
                  <Field label="Observações" htmlFor="b-notes" optional>
                    <Textarea id="b-notes" placeholder="Ex: ruído ao travar, luz de aviso acesa…" {...form.register("notes")} />
                  </Field>
                  <ConsentField control={form.control} name="consent" id="b-consent" error={errors.consent?.message} />
                </fieldset>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-sand-200 pt-6">
            <Button type="button" variant="ghost" onClick={back} disabled={step === 0} className={step === 0 ? "invisible" : ""}>
              <ArrowLeft aria-hidden /> Anterior
            </Button>
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="animate-spin" /> : null}
              {step === STEPS.length - 1 ? "Confirmar marcação" : "Continuar"} {step < STEPS.length - 1 && <ArrowRight aria-hidden />}
            </Button>
          </div>
        </form>
      </div>

      {/* Resumo */}
      <aside className="lg:col-span-4" aria-label="Resumo da marcação">
        <div className="sticky top-24 rounded-2xl bg-navy-900 p-6 text-white">
          <p className="eyebrow text-brass-300">Resumo</p>
          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="text-white/55">Viatura</dt>
              <dd className="font-medium">{values.make || values.plate ? `${values.make} ${values.model} ${values.plate}`.trim() : "—"}</dd>
            </div>
            <div>
              <dt className="text-white/55">Serviços</dt>
              <dd>
                {chosen.length ? (
                  <ul className="mt-1 space-y-1">
                    {chosen.map((c) => (
                      <li key={c.id} className="flex justify-between gap-3"><span className="flex items-center gap-1.5"><Check className="size-3.5 text-brass-300" aria-hidden />{c.name}</span><span className="text-white/70">{formatPrice(c.priceFrom)}</span></li>
                    ))}
                  </ul>
                ) : "—"}
              </dd>
            </div>
            <div className="flex gap-6">
              <div>
                <dt className="flex items-center gap-1 text-white/55"><CalendarDays className="size-3.5" aria-hidden />Data</dt>
                <dd className="font-medium capitalize">{selectedDay ? `${selectedDay.date.toLocaleDateString("pt-PT", { weekday: "short", day: "numeric", month: "short" })}${values.time ? ` · ${values.time}` : ""}` : "—"}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-1 text-white/55"><Clock className="size-3.5" aria-hidden />Duração</dt>
                <dd className="font-medium">{totalMin ? `≈ ${formatDuration(totalMin)}` : "—"}</dd>
              </div>
            </div>
          </dl>
          <div className="mt-6 flex items-end justify-between border-t border-white/15 pt-4">
            <span className="text-sm text-white/70">Total estimado desde</span>
            <span className="font-serif text-3xl">{formatPrice(totalFrom)}</span>
          </div>
          <p className="mt-3 text-[11px] text-white/50">* Preços “desde” placeholder, IVA incluído. Orçamento final após diagnóstico.</p>
        </div>
      </aside>
    </div>
  );
}
