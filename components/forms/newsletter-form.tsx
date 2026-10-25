"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { emailSchema } from "@/components/forms/schemas";
import { fakeSubmit } from "@/components/forms/success-state";
import { cn } from "@/lib/utils";

const schema = z.object({ email: emailSchema });

export function NewsletterForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });
  const dark = tone === "dark";
  const id = `newsletter-${tone}`;

  if (done) {
    return (
      <p role="status" className={cn("flex items-center gap-2 text-sm font-medium", dark ? "text-white" : "text-success-600")}>
        <Check className="size-4" /> Subscrição registada (simulação). Obrigado!
      </p>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async () => {
        await fakeSubmit(700);
        setDone(true);
      })}
    >
      <label htmlFor={id} className="sr-only">
        Email
      </label>
      <div className={cn("flex overflow-hidden rounded-lg border focus-within:ring-2", dark ? "border-white/20 bg-white/5 focus-within:ring-brass-500/50" : "border-sand-300 bg-white focus-within:ring-navy-900/15")}>
        <input
          id={id}
          type="email"
          autoComplete="email"
          placeholder="O seu email"
          aria-invalid={!!formState.errors.email}
          aria-describedby={formState.errors.email ? `${id}-error` : undefined}
          className={cn("h-12 min-w-0 flex-1 bg-transparent px-4 text-sm focus:outline-none", dark ? "text-white placeholder:text-white/45" : "text-ink-900 placeholder:text-sand-500")}
          {...register("email")}
        />
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className={cn("flex items-center gap-2 px-4 text-sm font-semibold transition-colors", dark ? "bg-brass-500 text-navy-950 hover:bg-brass-300" : "bg-navy-900 text-white hover:bg-navy-800")}
        >
          {formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
          <span className="sr-only sm:not-sr-only">Subscrever</span>
        </button>
      </div>
      {formState.errors.email && (
        <p id={`${id}-error`} role="alert" className={cn("mt-1.5 text-xs", dark ? "text-brass-300" : "text-danger-600")}>
          {formState.errors.email.message}
        </p>
      )}
      <p className={cn("mt-2 text-[11px]", dark ? "text-white/45" : "text-ink-500")}>Pode cancelar a qualquer momento. Sem spam.</p>
    </form>
  );
}
