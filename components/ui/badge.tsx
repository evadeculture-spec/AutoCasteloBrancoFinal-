import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold leading-none tracking-wide", {
  variants: {
    variant: {
      navy: "bg-navy-900 text-white",
      soft: "bg-navy-50 text-navy-900",
      brass: "bg-brass-100 text-brass-700",
      success: "bg-success-50 text-success-600",
      warning: "bg-warning-50 text-warning-600",
      white: "bg-white/95 text-ink-900 shadow-soft backdrop-blur",
      outline: "border border-sand-300 text-ink-700",
    },
  },
  defaultVariants: { variant: "soft" },
});

export function Badge({ className, variant, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
