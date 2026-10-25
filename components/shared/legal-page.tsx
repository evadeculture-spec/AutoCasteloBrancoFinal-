import type { ReactNode } from "react";
import { PlaceholderNote } from "@/components/shared/placeholder-note";

/** Estrutura comum às páginas legais */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <div className="container-site max-w-3xl pb-24 pt-12 md:pt-16">
      <p className="eyebrow mb-3">Informação legal</p>
      <h1 className="text-4xl md:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-ink-500">Última atualização: {updated}</p>
      <PlaceholderNote className="mt-6">Texto-modelo para demonstração. Deve ser revisto e validado por um jurista antes da publicação.</PlaceholderNote>
      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-ink-700 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:text-ink-900 [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1.5">{children}</div>
    </div>
  );
}
