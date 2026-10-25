"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useFavorites } from "@/hooks/use-stored-list";
import { cn } from "@/lib/utils";

export function FavoriteButton({ id, label, className }: { id: string; label: string; className?: string }) {
  const { has, toggle } = useFavorites();
  const active = has(id);
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.85 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      aria-pressed={active}
      aria-label={active ? `Remover ${label} dos favoritos` : `Guardar ${label} nos favoritos`}
      className={cn(
        "flex size-10 items-center justify-center rounded-full bg-white/95 shadow-soft backdrop-blur transition-colors hover:bg-white",
        className,
      )}
    >
      <Heart className={cn("size-[18px] transition-colors", active ? "fill-danger-600 text-danger-600" : "text-ink-900")} />
    </motion.button>
  );
}
