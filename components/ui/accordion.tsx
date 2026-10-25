"use client";

import * as React from "react";
import { Accordion as A } from "radix-ui";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Accordion = A.Root;

export function AccordionItem({ className, ...props }: React.ComponentProps<typeof A.Item>) {
  return <A.Item className={cn("border-b border-sand-200", className)} {...props} />;
}

export function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof A.Trigger>) {
  return (
    <A.Header className="flex">
      <A.Trigger
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 py-5 text-left text-[15px] font-semibold text-ink-900 transition-colors hover:text-navy-700",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="size-4 shrink-0 text-ink-500 transition-transform duration-300 group-data-[state=open]:rotate-180" />
      </A.Trigger>
    </A.Header>
  );
}

export function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof A.Content>) {
  return (
    <A.Content className="overflow-hidden text-[15px] leading-relaxed text-ink-700 data-[state=closed]:animate-none" {...props}>
      <div className={cn("pb-5", className)}>{children}</div>
    </A.Content>
  );
}
