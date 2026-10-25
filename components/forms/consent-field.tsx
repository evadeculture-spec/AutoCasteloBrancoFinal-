"use client";

import Link from "next/link";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

/** Consentimento RGPD reutilizável */
export function ConsentField<T extends FieldValues>({ control, name, error, id }: { control: Control<T>; name: Path<T>; error?: string; id: string }) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Checkbox
              id={id}
              checked={field.value === true}
              onCheckedChange={(v) => field.onChange(v === true)}
              aria-invalid={!!error}
              aria-describedby={error ? `${id}-error` : undefined}
              className="mt-0.5"
            />
          )}
        />
        <label htmlFor={id} className="text-[13px] leading-relaxed text-ink-500">
          Li e aceito a{" "}
          <Link href="/privacidade/" className="font-medium text-navy-900 underline underline-offset-2" target="_blank">
            Política de Privacidade
          </Link>
          . Os meus dados são usados apenas para responder a este pedido.
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs font-medium text-danger-600">
          {error}
        </p>
      )}
    </div>
  );
}
