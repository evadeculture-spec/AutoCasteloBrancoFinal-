"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import type { Vehicle } from "@/types";
import { SafeImage } from "@/components/shared/safe-image";
import { cn } from "@/lib/utils";

/** Secção Transparência: hotspots com as pequenas imperfeições da viatura */
export function Transparency({ vehicle: v }: { vehicle: Vehicle }) {
  const [active, setActive] = useState(v.imperfections[0]?.id);
  const current = v.imperfections.find((i) => i.id === active);
  return (
    <div className="grid gap-4 md:grid-cols-5">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-sand-100 md:col-span-3">
        <SafeImage src={v.images[1] ?? v.images[0]} alt={`${v.make} ${v.model} com imperfeições assinaladas`} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-navy-950/20" />
        {v.imperfections.map((imp, i) => (
          <button
            key={imp.id}
            onClick={() => setActive(imp.id)}
            style={{ left: `${imp.x}%`, top: `${imp.y}%` }}
            aria-label={`Imperfeição ${i + 1}: ${imp.title}`}
            aria-pressed={active === imp.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <span className={cn("absolute inset-0 animate-ping rounded-full", imp.severity === "moderada" ? "bg-warning-600/50" : "bg-brass-500/50")} />
            <span className={cn("relative flex size-8 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white shadow-lift transition-transform", imp.severity === "moderada" ? "bg-warning-600" : "bg-brass-500", active === imp.id && "scale-125")}>
              {i + 1}
            </span>
          </button>
        ))}
      </div>
      <div className="flex flex-col md:col-span-2">
        <p className="eyebrow mb-2">Transparência total</p>
        <h3 className="text-xl">{v.imperfections.length} {v.imperfections.length === 1 ? "pequena imperfeição assinalada" : "pequenas imperfeições assinaladas"}</h3>
        <ul className="mt-4 space-y-2">
          {v.imperfections.map((imp, i) => (
            <li key={imp.id}>
              <button onClick={() => setActive(imp.id)} className={cn("w-full rounded-lg border p-3 text-left transition-colors", active === imp.id ? "border-navy-900 bg-navy-50" : "border-sand-200 hover:border-sand-400")}>
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <span className={cn("flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] text-white", imp.severity === "moderada" ? "bg-warning-600" : "bg-brass-500")}>{i + 1}</span>
                  {imp.title}
                </span>
                <AnimatePresence initial={false}>
                  {active === imp.id && current && (
                    <motion.span initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="block overflow-hidden">
                      <span className="block pt-2 text-[13px] leading-relaxed text-ink-500">{current.detail}</span>
                      <span className="mt-2 inline-block rounded-full bg-sand-100 px-2 py-0.5 text-[11px] font-medium capitalize text-ink-700">Gravidade {imp.severity}</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-auto flex gap-2 pt-4 text-xs leading-relaxed text-ink-500">
          <ShieldCheck className="size-4 shrink-0 text-success-600" aria-hidden />
          Nenhuma imperfeição afeta a segurança ou o funcionamento. Assinalamos tudo para que não haja surpresas na entrega.
        </p>
      </div>
    </div>
  );
}
