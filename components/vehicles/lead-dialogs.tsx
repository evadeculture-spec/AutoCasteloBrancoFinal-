"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarCheck, Loader2, Lock } from "lucide-react";
import type { Vehicle } from "@/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { Input, NativeSelect } from "@/components/ui/input";
import { ConsentField } from "@/components/forms/consent-field";
import { SuccessState, fakeSubmit } from "@/components/forms/success-state";
import { consentSchema, emailSchema, nameSchema, phoneSchema } from "@/components/forms/schemas";
import { TrustInline } from "@/components/shared/trust-inline";
import { formatPrice } from "@/lib/format";
import { nextDays } from "@/lib/slots";

const reserveSchema = z.object({ name: nameSchema, phone: phoneSchema, email: emailSchema, consent: consentSchema });
type ReserveValues = z.input<typeof reserveSchema>;

/** Reserva online (simulada): bloqueia a viatura mediante sinal */
export function ReserveDialog({ vehicle, trigger }: { vehicle: Vehicle; trigger: React.ReactNode }) {
  const [done, setDone] = useState(false);
  const form = useForm<ReserveValues>({ resolver: zodResolver(reserveSchema), defaultValues: { name: "", phone: "", email: "", consent: false } });
  const { errors, isSubmitting } = form.formState;
  return (
    <Dialog onOpenChange={(o) => !o && setTimeout(() => { setDone(false); form.reset(); }, 300)}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        {done ? (
          <SuccessState title="Pedido de reserva recebido" actions={<Button asChild variant="outline"><a href="/viaturas/">Continuar a explorar</a></Button>}>
            Reservámos provisoriamente o {vehicle.make} {vehicle.model} durante 48 horas. Um consultor vai contactá-lo para confirmar o sinal e os próximos passos.
            <span className="mt-2 block text-[11px]">(Simulação — nenhum pagamento foi efetuado.)</span>
          </SuccessState>
        ) : (
          <>
            <DialogTitle>Reservar {vehicle.make} {vehicle.model}</DialogTitle>
            <DialogDescription>Bloqueamos a viatura durante 48 h. Sinal de reserva reembolsável (valor a confirmar).</DialogDescription>
            <div className="mt-5 flex items-center justify-between rounded-lg bg-sand-100 px-4 py-3 text-sm">
              <span className="text-ink-500">{vehicle.version}</span>
              <span className="font-semibold">{formatPrice(vehicle.price)}</span>
            </div>
            <form
              noValidate
              className="mt-5 space-y-4"
              onSubmit={form.handleSubmit(async () => {
                await fakeSubmit();
                setDone(true);
              })}
            >
              <Field label="Nome" htmlFor="r-name" error={errors.name?.message}>
                <Input id="r-name" autoComplete="name" aria-invalid={!!errors.name} {...form.register("name")} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Telemóvel" htmlFor="r-phone" error={errors.phone?.message}>
                  <Input id="r-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="912 345 678" aria-invalid={!!errors.phone} {...form.register("phone")} />
                </Field>
                <Field label="Email" htmlFor="r-email" error={errors.email?.message}>
                  <Input id="r-email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...form.register("email")} />
                </Field>
              </div>
              <ConsentField control={form.control} name="consent" id="r-consent" error={errors.consent?.message} />
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin" /> : <Lock aria-hidden />} Pedir reserva
              </Button>
              <TrustInline className="justify-center" />
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

const tdSchema = z.object({ day: z.string().min(1, "Escolha um dia"), time: z.string().min(1, "Escolha uma hora"), name: nameSchema, phone: phoneSchema, consent: consentSchema });
type TdValues = z.input<typeof tdSchema>;

/** Marcação de test-drive (simulada) */
export function TestDriveDialog({ vehicle, trigger }: { vehicle: Vehicle; trigger: React.ReactNode }) {
  const [done, setDone] = useState<TdValues | null>(null);
  const days = nextDays(10).filter((d) => !d.closed);
  const form = useForm<TdValues>({ resolver: zodResolver(tdSchema), defaultValues: { day: "", time: "", name: "", phone: "", consent: false } });
  const { errors, isSubmitting } = form.formState;
  const day = days.find((d) => d.key === form.watch("day"));
  return (
    <Dialog onOpenChange={(o) => !o && setTimeout(() => { setDone(null); form.reset(); }, 300)}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        {done ? (
          <SuccessState title="Test-drive pedido">
            {vehicle.make} {vehicle.model} · {days.find((d) => d.key === done.day)?.date.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long" })} às {done.time}.
            Enviaremos a confirmação por SMS. Traga a carta de condução. <span className="mt-2 block text-[11px]">(Simulação)</span>
          </SuccessState>
        ) : (
          <>
            <DialogTitle>Marcar test-drive</DialogTitle>
            <DialogDescription>{vehicle.make} {vehicle.model} {vehicle.version} · cerca de 30 minutos, com um consultor.</DialogDescription>
            <form noValidate className="mt-5 space-y-4" onSubmit={form.handleSubmit(async (v) => { await fakeSubmit(); setDone(v); })}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Dia" htmlFor="td-day" error={errors.day?.message}>
                  <NativeSelect id="td-day" aria-invalid={!!errors.day} {...form.register("day", { onChange: () => form.setValue("time", "") })}>
                    <option value="">Escolher dia</option>
                    {days.map((d) => <option key={d.key} value={d.key}>{d.date.toLocaleDateString("pt-PT", { weekday: "short", day: "numeric", month: "short" })}</option>)}
                  </NativeSelect>
                </Field>
                <Field label="Hora" htmlFor="td-time" error={errors.time?.message}>
                  <NativeSelect id="td-time" disabled={!day} aria-invalid={!!errors.time} {...form.register("time")}>
                    <option value="">Escolher hora</option>
                    {day?.slots.map((s) => <option key={s.time} value={s.time} disabled={!s.available}>{s.time}{!s.available ? " (ocupado)" : ""}</option>)}
                  </NativeSelect>
                </Field>
              </div>
              <Field label="Nome" htmlFor="td-name" error={errors.name?.message}>
                <Input id="td-name" autoComplete="name" aria-invalid={!!errors.name} {...form.register("name")} />
              </Field>
              <Field label="Telemóvel" htmlFor="td-phone" error={errors.phone?.message}>
                <Input id="td-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="912 345 678" aria-invalid={!!errors.phone} {...form.register("phone")} />
              </Field>
              <ConsentField control={form.control} name="consent" id="td-consent" error={errors.consent?.message} />
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin" /> : <CalendarCheck aria-hidden />} Confirmar test-drive
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
