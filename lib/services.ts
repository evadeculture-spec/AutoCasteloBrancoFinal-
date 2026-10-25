import data from "@/data/services.json";
import type { WorkshopService } from "@/types";

export const services = data as WorkshopService[];

export function formatDuration(min: number) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}
