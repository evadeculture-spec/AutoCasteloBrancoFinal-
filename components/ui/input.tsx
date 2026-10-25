import * as React from "react";
import { cn } from "@/lib/utils";

export const fieldBase =
  "w-full rounded-lg border border-sand-300 bg-white px-3.5 text-[15px] text-ink-900 placeholder:text-sand-500 transition-colors hover:border-sand-400 focus-visible:border-navy-900 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-navy-900/10 aria-invalid:border-danger-600 aria-invalid:ring-danger-600/10 disabled:bg-sand-100";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(fieldBase, "h-12", className)} {...props} />;
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(fieldBase, "min-h-28 py-3", className)} {...props} />;
}

/** Select nativo estilizado — máxima acessibilidade e ótimo em telemóvel */
export function NativeSelect({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select className={cn(fieldBase, "h-12 appearance-none pr-10", className)} {...props}>
        {children}
      </select>
      <svg aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
    </div>
  );
}
