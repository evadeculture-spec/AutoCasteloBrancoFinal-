"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Fuel, Gauge, Settings2 } from "lucide-react";
import type { Vehicle } from "@/types";
import { SafeImage } from "@/components/shared/safe-image";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/vehicles/favorite-button";
import { CompareToggle } from "@/components/vehicles/compare-toggle";
import { formatKm, formatMonthly, formatPrice } from "@/lib/format";
import { monthlyOf } from "@/lib/vehicles";

/** Cartão de viatura: foto grande, dados essenciais e prestação mensal em destaque */
export function VehicleCard({ vehicle: v, priority }: { vehicle: Vehicle; priority?: boolean }) {
  const title = `${v.make} ${v.model}`;
  const highlight = v.badges.find((b) => b === "Novo stock" || b === "Baixa quilometragem");
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-sand-200 bg-white transition-shadow duration-300 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sand-100">
        <SafeImage
          src={v.images[0]}
          alt={`${title} ${v.version}`}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {highlight && <Badge variant="navy">{highlight}</Badge>}
          {v.previousPrice && <Badge variant="brass">Preço reduzido</Badge>}
        </div>
        <FavoriteButton id={v.id} label={title} className="absolute right-3 top-3 z-10" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 flex items-start justify-between gap-3">
          <h3 className="font-sans text-[17px] font-semibold leading-snug text-ink-900">
            <Link href={`/viaturas/${v.slug}/`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
              {title}
            </Link>
          </h3>
          <CompareToggle id={v.id} className="relative z-10 -mr-2 -mt-0.5" />
        </div>
        <p className="line-clamp-1 text-sm text-ink-500">{v.version}</p>

        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-ink-700">
          <li>{v.year}</li>
          <li aria-hidden className="text-sand-400">·</li>
          <li className="inline-flex items-center gap-1"><Gauge className="size-3.5 text-ink-500" aria-hidden />{formatKm(v.km)}</li>
          <li aria-hidden className="text-sand-400">·</li>
          <li className="inline-flex items-center gap-1"><Fuel className="size-3.5 text-ink-500" aria-hidden />{v.fuel}</li>
          <li aria-hidden className="text-sand-400">·</li>
          <li className="inline-flex items-center gap-1"><Settings2 className="size-3.5 text-ink-500" aria-hidden />{v.gearbox}</li>
        </ul>

        <div className="mb-5 mt-3 flex flex-wrap gap-1.5">
          {v.badges
            .filter((b) => b === "Revisto" || b === "Garantia" || b === "IVA dedutível")
            .map((b) => (
              <Badge key={b} variant={b === "Revisto" ? "success" : "outline"}>
                {b === "Garantia" ? `Garantia ${v.warrantyMonths} meses*` : b}
              </Badge>
            ))}
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-sand-200 pt-4">
          <div>
            {v.previousPrice && <p className="text-xs text-ink-500 line-through">{formatPrice(v.previousPrice)}</p>}
            <p className="text-xl font-semibold tracking-tight text-ink-900">{formatPrice(v.price)}</p>
            <p className="text-[11px] text-ink-500">IVA incluído</p>
          </div>
          <div className="rounded-lg bg-navy-50 px-3 py-2 text-right">
            <p className="text-[11px] font-medium text-navy-700">desde</p>
            <p className="text-lg font-bold leading-none text-navy-900">
              {formatMonthly(monthlyOf(v))}
              <span className="text-xs font-semibold">/mês</span>
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function VehicleCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-sand-200 bg-white">
      <div className="skeleton aspect-[4/3] rounded-none" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-5 w-2/3" />
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-4 w-full" />
        <div className="flex justify-between pt-4">
          <div className="skeleton h-8 w-24" />
          <div className="skeleton h-10 w-24" />
        </div>
      </div>
    </div>
  );
}
