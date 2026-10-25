"use client";

import * as React from "react";
import { Tabs as T } from "radix-ui";
import { cn } from "@/lib/utils";

export const Tabs = T.Root;

export function TabsList({ className, ...props }: React.ComponentProps<typeof T.List>) {
  return <T.List className={cn("inline-flex gap-1 rounded-xl bg-sand-100 p-1", className)} {...props} />;
}

export function TabsTrigger({ className, ...props }: React.ComponentProps<typeof T.Trigger>) {
  return (
    <T.Trigger
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium text-ink-500 transition-all hover:text-ink-900 data-[state=active]:bg-white data-[state=active]:text-ink-900 data-[state=active]:shadow-soft [&_svg]:size-4",
        className,
      )}
      {...props}
    />
  );
}

export const TabsContent = T.Content;
