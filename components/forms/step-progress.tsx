import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** Indicador de progresso para fluxos em passos */
export function StepProgress({ steps, current }: { steps: string[]; current: number }) {
  return (
    <nav aria-label="Progresso">
      <p className="mb-3 text-xs font-medium text-ink-500 sm:hidden">
        Passo {Math.min(current + 1, steps.length)} de {steps.length} · <span className="text-ink-900">{steps[Math.min(current, steps.length - 1)]}</span>
      </p>
      <div className="h-1 overflow-hidden rounded-full bg-sand-200 sm:hidden">
        <div className="h-full bg-navy-900 transition-all duration-500" style={{ width: `${(Math.min(current + 1, steps.length) / steps.length) * 100}%` }} />
      </div>
      <ol className="hidden items-center gap-2 sm:flex">
        {steps.map((s, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={s} className="flex flex-1 items-center gap-2" aria-current={active ? "step" : undefined}>
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
                  done ? "bg-navy-900 text-white" : active ? "bg-brass-500 text-white" : "bg-sand-200 text-ink-500",
                )}
              >
                {done ? <Check className="size-3.5" strokeWidth={3} /> : i + 1}
              </span>
              <span className={cn("whitespace-nowrap text-[13px] font-medium", active ? "text-ink-900" : "text-ink-500")}>{s}</span>
              {i < steps.length - 1 && <span className={cn("h-px flex-1", done ? "bg-navy-900" : "bg-sand-300")} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
