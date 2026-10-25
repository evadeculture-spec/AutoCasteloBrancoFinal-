import { Info } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Nota visível que marca conteúdos de demonstração (placeholders a confirmar) */
export function PlaceholderNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-start gap-2 rounded-lg border border-dashed border-brass-300 bg-brass-100/50 px-3 py-2 text-xs leading-relaxed text-brass-700", className)}>
      <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
      <span>{children}</span>
    </p>
  );
}
