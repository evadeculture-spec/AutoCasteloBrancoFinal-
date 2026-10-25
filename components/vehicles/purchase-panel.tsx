"use client";

import { useState } from "react";
import { CalendarCheck, ChevronDown, Lock } from "lucide-react";
import type { Vehicle } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FinanceSimulator } from "@/components/vehicles/finance-simulator";
import { ReserveDialog, TestDriveDialog } from "@/components/vehicles/lead-dialogs";
import { TrustInline } from "@/components/shared/trust-inline";
import { WhatsAppIcon } from "@/components/shared/icons";
import { formatKm, formatMonthly, formatPrice } from "@/lib/format";
import { monthlyOf } from "@/lib/vehicles";
import { cn, whatsappLink } from "@/lib/utils";

/** Bloco de compra (fixo no desktop): preço, prestação, simulador e CTAs */
export function PurchasePanel({ vehicle: v, headingAs: Heading = "h1" }: { vehicle: Vehicle; headingAs?: "h1" | "h2" }) {
  const [openSim, setOpenSim] = useState(false);
  const [monthly, setMonthly] = useState(monthlyOf(v));
  const title = `${v.make} ${v.model}`;
  return (
    <div className="rounded-2xl border border-sand-200 bg-white p-6 shadow-panel">
      <div className="flex flex-wrap gap-1.5">
        {v.badges.map((b) => <Badge key={b} variant={b === "Revisto" ? "success" : b === "Novo stock" ? "navy" : "soft"}>{b === "Garantia" ? `Garantia ${v.warrantyMonths} meses*` : b}</Badge>)}
      </div>
      <Heading className="mt-4 text-3xl leading-tight md:text-[2.1rem]">{title}</Heading>
      <p className="mt-1 text-[15px] text-ink-500">{v.version}</p>
      <p className="mt-3 text-sm text-ink-700">{v.year} · {formatKm(v.km)} · {v.fuel} · {v.gearbox} · {v.powerHp} cv</p>

      <div className="mt-6 flex items-end justify-between gap-4 border-t border-sand-200 pt-5">
        <div>
          {v.previousPrice && <p className="text-sm text-ink-500 line-through">{formatPrice(v.previousPrice)}</p>}
          <p className="text-3xl font-semibold tracking-tight">{formatPrice(v.price)}</p>
          <p className="text-xs text-ink-500">IVA incluído{v.vatDeductible ? " · IVA dedutível" : ""}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-navy-700">{openSim ? "a sua simulação" : "desde"}</p>
          <p className="text-2xl font-bold text-navy-900 tabular-nums">{formatMonthly(monthly)}<span className="text-sm font-semibold">/mês</span></p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpenSim((o) => !o)}
        aria-expanded={openSim}
        className="mt-4 flex w-full items-center justify-between rounded-lg bg-sand-100 px-4 py-3 text-sm font-semibold text-ink-900 transition-colors hover:bg-sand-200"
      >
        Simular financiamento
        <ChevronDown className={cn("size-4 transition-transform", openSim && "rotate-180")} aria-hidden />
      </button>
      {openSim && (
        <div className="mt-4">
          <FinanceSimulator price={v.price} compact onMonthlyChange={setMonthly} />
        </div>
      )}

      <div className="mt-5 grid gap-2.5">
        <ReserveDialog vehicle={v} trigger={<Button size="lg" className="w-full"><Lock aria-hidden /> Reservar online</Button>} />
        <div className="grid grid-cols-2 gap-2.5">
          <TestDriveDialog vehicle={v} trigger={<Button variant="outline" className="w-full"><CalendarCheck aria-hidden /> Test-drive</Button>} />
          <Button asChild variant="whatsapp" className="w-full">
            <a href={whatsappLink(`Olá! Tenho interesse no ${title} ${v.version} (${v.year}, ${v.plate}) — ref. ${v.id}.`)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" /> WhatsApp
            </a>
          </Button>
        </div>
      </div>
      <TrustInline className="mt-5 justify-center" />
      <p className="mt-3 text-center text-[11px] text-ink-500">Ref. {v.id.toUpperCase()} · * condições a confirmar</p>
    </div>
  );
}
