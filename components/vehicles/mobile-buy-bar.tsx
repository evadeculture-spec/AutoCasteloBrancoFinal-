"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Vehicle } from "@/types";
import { Button } from "@/components/ui/button";
import { ReserveDialog } from "@/components/vehicles/lead-dialogs";
import { formatMonthly, formatPrice } from "@/lib/format";
import { monthlyOf } from "@/lib/vehicles";

/** Barra de compra que surge no telemóvel quando o bloco de compra sai do ecrã */
export function MobileBuyBar({ vehicle: v }: { vehicle: Vehicle }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 1100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          className="fixed inset-x-0 bottom-[60px] z-20 border-t border-sand-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{v.make} {v.model}</p>
              <p className="text-xs text-ink-500">{formatPrice(v.price)} · <span className="font-semibold text-navy-900">desde {formatMonthly(monthlyOf(v))}/mês</span></p>
            </div>
            <ReserveDialog vehicle={v} trigger={<Button size="sm">Reservar</Button>} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
