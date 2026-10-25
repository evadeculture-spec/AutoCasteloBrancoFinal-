"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input, NativeSelect, Textarea } from "@/components/ui/input";
import { ConsentField } from "@/components/forms/consent-field";
import { SuccessState, fakeSubmit } from "@/components/forms/success-state";
import { consentSchema, emailSchema, nameSchema, phoneSchema } from "@/components/forms/schemas";

const SUBJECTS = {
  visita: "Marcar visita ao stand",
  viatura: "Informação sobre uma viatura",
  procura: "Procuro uma viatura específica",
  financiamento: "Financiamento",
  retoma: "Retoma",
  oficina: "Oficina",
  outro: "Outro assunto",
} as const;

const schema = z.object({
  subject: z.string().min(1),
  name: nameSchema,
  phone: phoneSchema,
  email: emailSchema,
  message: z.string().trim().min(10, "Escreva pelo menos 10 caracteres").max(1500),
  consent: consentSchema,
});
type Values = z.input<typeof schema>;

export function ContactForm() {
  const params = useSearchParams();
  const [done, setDone] = useState(false);
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { subject: "visita", name: "", phone: "", email: "", message: "", consent: false } });
  const { errors, isSubmitting } = form.formState;

  useEffect(() => {
    const s = params.get("assunto");
    if (s && s in SUBJECTS) form.setValue("subject", s);
  }, [params, form]);

  if (done) {
    return (
      <SuccessState title="Mensagem enviada" actions={<Button variant="outline" onClick={() => { setDone(false); form.reset(); }}>Enviar outra mensagem</Button>}>
        Obrigado pelo contacto. Respondemos em até 1 dia útil (simulação — nenhuma mensagem foi enviada).
      </SuccessState>
    );
  }

  return (
    <form noValidate className="space-y-5" onSubmit={form.handleSubmit(async () => { await fakeSubmit(); setDone(true); })}>
      <Field label="Assunto" htmlFor="c-subject">
        <NativeSelect id="c-subject" {...form.register("subject")}>
          {Object.entries(SUBJECTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </NativeSelect>
      </Field>
      <Field label="Nome" htmlFor="c-name" error={errors.name?.message}>
        <Input id="c-name" autoComplete="name" aria-invalid={!!errors.name} {...form.register("name")} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Telemóvel" htmlFor="c-phone" error={errors.phone?.message}>
          <Input id="c-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="912 345 678" aria-invalid={!!errors.phone} {...form.register("phone")} />
        </Field>
        <Field label="Email" htmlFor="c-email" error={errors.email?.message}>
          <Input id="c-email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...form.register("email")} />
        </Field>
      </div>
      <Field label="Mensagem" htmlFor="c-message" error={errors.message?.message}>
        <Textarea id="c-message" placeholder="Em que podemos ajudar? Para visitas, indique o dia e a hora preferidos." aria-invalid={!!errors.message} {...form.register("message")} />
      </Field>
      <ConsentField control={form.control} name="consent" id="c-consent" error={errors.consent?.message} />
      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="animate-spin" /> : <Send aria-hidden />} Enviar mensagem
      </Button>
    </form>
  );
}
