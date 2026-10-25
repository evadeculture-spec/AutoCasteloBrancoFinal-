"use client";

import * as React from "react";
import { Dialog as D } from "radix-ui";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Dialog = D.Root;
export const DialogTrigger = D.Trigger;
export const DialogClose = D.Close;

export function DialogContent({
  className,
  children,
  side,
  ...props
}: React.ComponentProps<typeof D.Content> & { side?: "center" | "left" | "right" | "bottom" }) {
  const position = {
    center:
      "left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl max-h-[calc(100dvh-2rem)] overflow-y-auto",
    right: "inset-y-0 right-0 h-full w-full max-w-md overflow-y-auto",
    left: "inset-y-0 left-0 h-full w-full max-w-sm overflow-y-auto",
    bottom: "inset-x-0 bottom-0 max-h-[92dvh] overflow-y-auto rounded-t-2xl",
  }[side ?? "center"];
  return (
    <D.Portal>
      <D.Overlay className="fixed inset-0 z-50 bg-navy-950/50 backdrop-blur-[2px] data-[state=open]:animate-[fade-in_200ms_ease-out]" />
      <D.Content
        className={cn("fixed z-50 bg-white p-6 shadow-panel focus:outline-none data-[state=open]:animate-[dialog-in_250ms_var(--ease-premium)]", position, className)}
        {...props}
      >
        {children}
        <D.Close className="absolute right-4 top-4 rounded-full p-2 text-ink-500 transition-colors hover:bg-sand-100 hover:text-ink-900">
          <X className="size-5" />
          <span className="sr-only">Fechar</span>
        </D.Close>
      </D.Content>
    </D.Portal>
  );
}

export function DialogTitle({ className, ...props }: React.ComponentProps<typeof D.Title>) {
  return <D.Title className={cn("pr-8 font-serif text-2xl text-ink-900", className)} {...props} />;
}

export function DialogDescription({ className, ...props }: React.ComponentProps<typeof D.Description>) {
  return <D.Description className={cn("mt-1.5 text-sm text-ink-500", className)} {...props} />;
}
