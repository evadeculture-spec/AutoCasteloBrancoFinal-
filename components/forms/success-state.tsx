"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";

/** Mensagem de sucesso cuidada, partilhada por todos os formulários */
export function SuccessState({ title, children, actions }: { title: string; children?: ReactNode; actions?: ReactNode }) {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center py-6 text-center"
    >
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }}
        className="mb-5 flex size-16 items-center justify-center rounded-full bg-success-50 text-success-600"
      >
        <CheckCircle2 className="size-8" />
      </motion.span>
      <h3 className="text-2xl">{title}</h3>
      {children && <div className="mt-3 max-w-md text-sm leading-relaxed text-ink-500">{children}</div>}
      {actions && <div className="mt-6 flex flex-wrap justify-center gap-3">{actions}</div>}
    </motion.div>
  );
}

/** Simula o envio para um backend/CRM */
export const fakeSubmit = (ms = 900) => new Promise((r) => setTimeout(r, ms));
