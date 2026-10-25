"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { GitCompareArrows, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/shared/safe-image";
import { COMPARE_MAX, useCompare } from "@/hooks/use-stored-list";
import { vehicles } from "@/lib/vehicles";

/** Barra flutuante do comparador (até 3 viaturas) */
export function CompareBar() {
  const { list, remove, clear } = useCompare();
  const pathname = usePathname();
  const selected = list.map((id) => vehicles.find((v) => v.id === id)).filter(Boolean);
  const show = selected.length > 0 && !pathname.startsWith("/comparar");

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-[76px] z-30 mx-auto max-w-3xl rounded-xl border border-sand-200 bg-white p-3 shadow-panel md:bottom-6"
          role="region"
          aria-label="Comparador de viaturas"
        >
          <div className="flex items-center gap-3">
            <GitCompareArrows className="ml-1 hidden size-5 text-brass-600 sm:block" aria-hidden />
            <ul className="flex flex-1 gap-2 overflow-x-auto scrollbar-none">
              {Array.from({ length: COMPARE_MAX }).map((_, i) => {
                const v = selected[i];
                return (
                  <li key={i} className="relative flex h-12 min-w-0 flex-1 items-center gap-2 rounded-lg border border-dashed border-sand-300 px-1.5">
                    {v ? (
                      <>
                        <span className="relative size-9 shrink-0 overflow-hidden rounded-md bg-sand-100">
                          <SafeImage src={v.images[0]} alt="" fill sizes="40px" className="object-cover" />
                        </span>
                        <span className="truncate text-xs font-medium">{v.make} {v.model}</span>
                        <button onClick={() => remove(v.id)} className="ml-auto rounded p-1 text-ink-500 hover:bg-sand-100" aria-label={`Remover ${v.make} ${v.model} do comparador`}>
                          <X className="size-3.5" />
                        </button>
                      </>
                    ) : (
                      <span className="truncate px-1 text-xs text-ink-500">Adicionar</span>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="flex shrink-0 flex-col gap-1 sm:flex-row sm:items-center">
              <Button asChild size="sm" disabled={selected.length < 2}>
                <Link href="/comparar/" aria-disabled={selected.length < 2}>Comparar ({selected.length})</Link>
              </Button>
              <button onClick={clear} className="text-[11px] text-ink-500 underline sm:hidden">Limpar</button>
              <Button variant="ghost" size="sm" onClick={clear} className="hidden sm:inline-flex">Limpar</Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
