"use client";

import { useState } from "react";
import { GitCompareArrows } from "lucide-react";
import { COMPARE_MAX, useCompare } from "@/hooks/use-stored-list";
import { cn } from "@/lib/utils";

export function CompareToggle({ id, className }: { id: string; className?: string }) {
  const { has, toggle } = useCompare();
  const [full, setFull] = useState(false);
  const active = has(id);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const ok = toggle(id);
        setFull(!ok);
        if (!ok) setTimeout(() => setFull(false), 2500);
      }}
      aria-pressed={active}
      className={cn(
        "relative inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors",
        active ? "bg-navy-50 text-navy-900" : "text-ink-500 hover:bg-sand-100 hover:text-ink-900",
        className,
      )}
    >
      <GitCompareArrows className="size-3.5" aria-hidden />
      {active ? "A comparar" : "Comparar"}
      {full && (
        <span role="alert" className="absolute bottom-full left-0 mb-1 whitespace-nowrap rounded-md bg-ink-900 px-2 py-1 text-[11px] text-white">
          Máximo de {COMPARE_MAX} viaturas
        </span>
      )}
    </button>
  );
}
