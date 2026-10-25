import { BatteryCharging, CircleDot, ClipboardCheck, Cpu, Disc3, ShieldCheck, Snowflake, Wrench, type LucideIcon } from "lucide-react";

const map: Record<string, LucideIcon> = { BatteryCharging, CircleDot, ClipboardCheck, Cpu, Disc3, ShieldCheck, Snowflake, Wrench };

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? Wrench;
  return <Icon className={className} strokeWidth={1.6} aria-hidden />;
}
