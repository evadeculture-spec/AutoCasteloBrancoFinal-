"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, Images, Rotate3d, ScanSearch } from "lucide-react";
import { Dialog as D } from "radix-ui";
import type { Vehicle } from "@/types";
import { SafeImage } from "@/components/shared/safe-image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Viewer360 } from "@/components/vehicles/viewer-360";
import { Transparency } from "@/components/vehicles/transparency";
import { FavoriteButton } from "@/components/vehicles/favorite-button";

/** Galeria premium: fotografias com fullscreen, visualizador 360° simulado e transparência */
export function Gallery({ vehicle: v }: { vehicle: Vehicle }) {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const total = v.images.length;
  const title = `${v.make} ${v.model}`;
  const go = useCallback((d: number) => setIndex((i) => (i + d + total) % total), [total]);

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullscreen, go]);

  return (
    <Tabs defaultValue="fotos">
      <TabsContent value="fotos" className="focus-visible:outline-none">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-sand-100">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="absolute inset-0">
              <SafeImage src={v.images[index]} alt={`${title} — fotografia ${index + 1} de ${total}`} fill priority={index === 0} sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/50 to-transparent p-4">
            <span className="rounded-full bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur">{index + 1} / {total}</span>
            <button onClick={() => setFullscreen(true)} className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-ink-900 shadow-soft hover:bg-white">
              <Expand className="size-3.5" aria-hidden /> Ecrã inteiro
            </button>
          </div>
          <FavoriteButton id={v.id} label={title} className="absolute right-4 top-4" />
          <button onClick={() => go(-1)} aria-label="Fotografia anterior" className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-soft transition hover:bg-white">
            <ChevronLeft className="size-5" />
          </button>
          <button onClick={() => go(1)} aria-label="Fotografia seguinte" className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-soft transition hover:bg-white">
            <ChevronRight className="size-5" />
          </button>
        </div>
        <ul className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {v.images.map((img, i) => (
            <li key={img + i} className="shrink-0">
              <button
                onClick={() => setIndex(i)}
                aria-label={`Ver fotografia ${i + 1}`}
                aria-current={i === index}
                className={`relative block h-16 w-24 overflow-hidden rounded-lg transition md:h-20 md:w-28 ${i === index ? "ring-2 ring-navy-900 ring-offset-2" : "opacity-70 hover:opacity-100"}`}
              >
                <SafeImage src={img} alt="" fill sizes="120px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      </TabsContent>

      <TabsContent value="360" className="focus-visible:outline-none">
        <Viewer360 images={v.images.filter((_, i) => i !== 3)} title={title} />
      </TabsContent>

      <TabsContent value="transparencia" className="focus-visible:outline-none">
        <Transparency vehicle={v} />
      </TabsContent>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <TabsList aria-label="Modo de visualização">
          <TabsTrigger value="fotos"><Images aria-hidden /> Fotografias</TabsTrigger>
          <TabsTrigger value="360"><Rotate3d aria-hidden /> 360°</TabsTrigger>
          <TabsTrigger value="transparencia"><ScanSearch aria-hidden /> Transparência <span className="rounded-full bg-brass-100 px-1.5 text-[10px] font-bold text-brass-700">{v.imperfections.length}</span></TabsTrigger>
        </TabsList>
        <p className="text-[11px] text-ink-500">Fotografias ilustrativas no MVP</p>
      </div>

      {/* Fullscreen */}
      <D.Root open={fullscreen} onOpenChange={setFullscreen}>
        <D.Portal>
          <D.Overlay className="fixed inset-0 z-50 bg-black/95" />
          <D.Content className="fixed inset-0 z-50 flex flex-col focus:outline-none" aria-describedby={undefined}>
            <div className="flex items-center justify-between p-4 text-white">
              <D.Title className="font-serif text-lg">{title} <span className="ml-2 text-sm text-white/60">{index + 1} / {total}</span></D.Title>
              <D.Close className="rounded-full px-4 py-2 text-sm font-medium hover:bg-white/10">Fechar</D.Close>
            </div>
            <div className="relative flex-1">
              <SafeImage src={v.images[index]} alt={`${title} — fotografia ${index + 1}`} fill sizes="100vw" quality={85} className="object-contain" />
              <button onClick={() => go(-1)} aria-label="Anterior" className="absolute left-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"><ChevronLeft /></button>
              <button onClick={() => go(1)} aria-label="Seguinte" className="absolute right-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"><ChevronRight /></button>
            </div>
          </D.Content>
        </D.Portal>
      </D.Root>
    </Tabs>
  );
}
