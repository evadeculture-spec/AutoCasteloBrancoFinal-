"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import { SafeImage } from "@/components/shared/safe-image";

/**
 * Visualizador 360° SIMULADO: arrastar (rato ou dedo) percorre uma sequência de imagens.
 * Em produção: sequência de 36–72 fotos captadas em plataforma rotativa (ex: Spyne, Glo3D).
 */
export function Viewer360({ images, title }: { images: string[]; title: string }) {
  const [frame, setFrame] = useState(0);
  const [hint, setHint] = useState(true);
  const start = useRef<{ x: number; frame: number } | null>(null);
  const n = images.length;
  const angle = Math.round((frame / n) * 360);

  const onDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, frame };
    setHint(false);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!start.current) return;
    const delta = Math.round((e.clientX - start.current.x) / 60);
    setFrame((((start.current.frame - delta) % n) + n) % n);
  };
  const onUp = () => (start.current = null);

  return (
    <div>
      <div
        role="slider"
        tabIndex={0}
        aria-label={`Rodar ${title} em 360 graus`}
        aria-valuemin={0}
        aria-valuemax={360}
        aria-valuenow={angle}
        aria-valuetext={`${angle} graus`}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") setFrame((f) => (f + 1) % n);
          if (e.key === "ArrowLeft") setFrame((f) => (f - 1 + n) % n);
        }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="relative aspect-[16/10] cursor-grab touch-pan-y select-none overflow-hidden rounded-2xl bg-gradient-to-b from-sand-100 to-sand-200 active:cursor-grabbing"
      >
        {images.map((img, i) => (
          <div key={img + i} className="absolute inset-0 transition-opacity duration-150" style={{ opacity: i === frame ? 1 : 0 }} aria-hidden={i !== frame}>
            <SafeImage src={img} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="pointer-events-none object-cover" draggable={false} />
          </div>
        ))}
        {hint && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center bg-navy-950/30">
            <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-900 shadow-lift">
              <motion.span animate={{ x: [-6, 6, -6] }} transition={{ repeat: Infinity, duration: 1.6 }}><MoveHorizontal className="size-4" /></motion.span>
              Arraste para rodar
            </span>
          </motion.div>
        )}
        {/* Indicador de ângulo */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 shadow-soft backdrop-blur">
          {images.map((_, i) => <span key={i} className={`h-1.5 rounded-full transition-all ${i === frame ? "w-5 bg-navy-900" : "w-1.5 bg-sand-300"}`} />)}
          <span className="ml-1 text-[11px] font-semibold tabular-nums text-ink-700">{angle}°</span>
        </div>
      </div>
      <p className="mt-2 text-[11px] text-ink-500">Visualização 360° simulada para demonstração. Em produção: sequência fotográfica em estúdio rotativo.</p>
    </div>
  );
}
