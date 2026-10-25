import Link from "next/link";
import { cn } from "@/lib/utils";

/** Logótipo provisório: monograma geométrico + nome em serif */
export function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)} aria-label="AutoCasteloBranco — página inicial">
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden>
        <rect width="32" height="32" rx="8" className={inverted ? "fill-white" : "fill-navy-900"} />
        <path d="M8 22 16 9l8 13" fill="none" strokeWidth="2.2" strokeLinejoin="round" className={inverted ? "stroke-navy-900" : "stroke-white"} />
        <path d="M11.5 18h9" strokeWidth="2.2" className="stroke-brass-500" />
      </svg>
      <span className={cn("font-serif text-[19px] font-medium leading-none tracking-tight", inverted ? "text-white" : "text-navy-900")}>
        Auto<span className="font-semibold">CasteloBranco</span>
      </span>
    </Link>
  );
}
