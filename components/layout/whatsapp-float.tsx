"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/shared/icons";
import { whatsappLink } from "@/lib/utils";

/** Botão WhatsApp flutuante (desktop/tablet — no telemóvel está na barra fixa) */
export function WhatsAppFloat() {
  return (
    <motion.a
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.4 }}
      href={whatsappLink("Olá! Gostaria de mais informações.")}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-30 hidden items-center gap-2 rounded-full bg-[#1f8f4e] py-3.5 pl-4 pr-4 text-white shadow-lift transition-all hover:pr-5 md:inline-flex"
      aria-label="Falar connosco por WhatsApp"
    >
      <WhatsAppIcon className="size-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-40">Fale connosco</span>
    </motion.a>
  );
}
