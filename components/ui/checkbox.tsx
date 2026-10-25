"use client";

import * as React from "react";
import { Checkbox as C } from "radix-ui";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Checkbox({ className, ...props }: React.ComponentProps<typeof C.Root>) {
  return (
    <C.Root
      className={cn(
        "peer size-5 shrink-0 rounded-[5px] border border-sand-400 bg-white transition-colors data-[state=checked]:border-navy-900 data-[state=checked]:bg-navy-900 aria-invalid:border-danger-600",
        className,
      )}
      {...props}
    >
      <C.Indicator className="flex items-center justify-center text-white">
        <Check className="size-3.5" strokeWidth={3} />
      </C.Indicator>
    </C.Root>
  );
}
