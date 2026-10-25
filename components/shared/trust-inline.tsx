import { RotateCcw, ShieldCheck, Wrench } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/** Micro-elementos de confiança colocados junto aos CTAs */
export function TrustInline({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const items = [
    { icon: ShieldCheck, label: site.trust.warranty },
    { icon: Wrench, label: site.trust.review },
    { icon: RotateCcw, label: site.trust.returnPolicy },
  ];
  return (
    <ul className={cn("flex flex-wrap gap-x-4 gap-y-1.5 text-xs", tone === "dark" ? "text-ink-500" : "text-white/75", className)}>
      {items.map(({ icon: Icon, label }) => (
        <li key={label} className="inline-flex items-center gap-1.5">
          <Icon className={cn("size-3.5", tone === "dark" ? "text-brass-600" : "text-brass-300")} aria-hidden />
          {label}
          <span className="sr-only">(condições a confirmar)</span>
        </li>
      ))}
    </ul>
  );
}
