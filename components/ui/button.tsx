import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* Botão base (shadcn/ui) com as variantes do design system AutoCasteloBranco */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 ease-[var(--ease-premium)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-navy-900 text-white shadow-soft hover:bg-navy-800 hover:shadow-lift",
        secondary: "border border-brass-500 bg-white text-brass-700 hover:bg-brass-100",
        outline: "border border-sand-300 bg-white text-ink-900 hover:border-navy-900 hover:bg-sand-50",
        ghost: "text-ink-900 hover:bg-sand-100",
        light: "bg-white text-navy-900 shadow-soft hover:bg-sand-100",
        glass: "border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20",
        whatsapp: "bg-[#1f8f4e] text-white hover:bg-[#187a41]",
        link: "h-auto px-0 text-navy-900 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3.5 text-[13px]",
        md: "h-11 px-5",
        lg: "h-13 px-7 text-[15px]",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
