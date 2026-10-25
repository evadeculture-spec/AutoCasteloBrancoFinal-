"use client";

import * as React from "react";
import { Slider as S } from "radix-ui";
import { cn } from "@/lib/utils";

export function Slider({ className, thumbLabels, ...props }: React.ComponentProps<typeof S.Root> & { thumbLabels?: string[] }) {
  const count = (props.value ?? props.defaultValue ?? [0]).length;
  return (
    <S.Root className={cn("relative flex h-6 w-full touch-none select-none items-center", className)} {...props}>
      <S.Track className="relative h-1.5 grow overflow-hidden rounded-full bg-sand-200">
        <S.Range className="absolute h-full bg-navy-900" />
      </S.Track>
      {Array.from({ length: count }).map((_, i) => (
        <S.Thumb
          key={i}
          aria-label={thumbLabels?.[i]}
          className="block size-5 rounded-full border-2 border-navy-900 bg-white shadow-soft transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-navy-900/15"
        />
      ))}
    </S.Root>
  );
}
