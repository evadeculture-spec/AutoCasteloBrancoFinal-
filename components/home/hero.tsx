"use client";

import { motion } from "framer-motion";
import { SafeImage } from "@/components/shared/safe-image";
import { QuickSearch } from "@/components/home/quick-search";
import { TrustInline } from "@/components/shared/trust-inline";
import { images } from "@/data/site";
import { vehicles } from "@/lib/vehicles";

const ease = [0.22, 1, 0.36, 1] as const;

/** Hero full-width com título institucional e pesquisa rápida */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-64px)] items-end overflow-hidden bg-navy-950 pb-10 pt-24 text-white md:min-h-[760px] md:items-center md:pb-24">
      <motion.div initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease }} className="absolute inset-0 -z-20">
        <SafeImage src={images.hero} alt="Viatura seminova em exposição no stand AutoCasteloBranco" fill priority sizes="100vw" quality={75} className="object-cover object-center" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/20 md:bg-gradient-to-r md:from-navy-950/95 md:via-navy-950/60 md:to-transparent" />

      <div className="container-site">
        <div className="max-w-2xl">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="eyebrow mb-5 text-brass-300">
            Stand e oficina em Castelo Branco
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="text-[2.6rem] leading-[1.02] text-white sm:text-6xl md:text-7xl"
          >
            Seminovos com a confiança de uma <em className="font-normal italic text-brass-300">oficina própria</em>.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.16, ease }} className="mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Cada viatura é inspecionada em 140 pontos, revista pelos nossos técnicos e entregue com garantia. Financiamento e retoma no mesmo dia.
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.28, ease }} className="mt-10 max-w-4xl">
          <QuickSearch total={vehicles.length} />
          <TrustInline tone="light" className="mt-4" />
        </motion.div>
      </div>
    </section>
  );
}
