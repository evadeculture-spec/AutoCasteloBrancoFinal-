"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { CarFront } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * next/image com fallback elegante: se a fotografia remota falhar,
 * mostra um placeholder da marca em vez de uma imagem partida.
 */
export function SafeImage({ className, alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 text-white/30",
          className,
        )}
      >
        <CarFront className="size-1/4 max-h-24 max-w-24" strokeWidth={1} />
      </div>
    );
  }
  return <Image alt={alt} className={className} onError={() => setFailed(true)} {...props} />;
}
