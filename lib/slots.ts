import { hashString } from "@/lib/utils";

/**
 * Gera slots de marcação para os próximos 14 dias (SIMULADO).
 * A ocupação é pseudoaleatória mas estável para cada dia/hora.
 * Em produção: integração com a agenda da oficina (ex: API do DMS, Google Calendar, Cal.com).
 */
export interface DaySlots {
  date: Date;
  key: string; // AAAA-MM-DD
  closed: boolean;
  slots: { time: string; available: boolean }[];
}

const WEEKDAY_TIMES = ["08:30", "09:30", "10:30", "11:30", "14:00", "15:00", "16:00", "17:00"];
const SATURDAY_TIMES = ["09:00", "10:00", "11:00", "12:00"];

function toKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function nextDays(count = 14, from = new Date()): DaySlots[] {
  const days: DaySlots[] = [];
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  for (let i = 1; i <= count; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const key = toKey(date);
    const dow = date.getDay();
    const closed = dow === 0;
    const times = dow === 6 ? SATURDAY_TIMES : WEEKDAY_TIMES;
    days.push({
      date,
      key,
      closed,
      slots: closed ? [] : times.map((time) => ({ time, available: hashString(key + time) % 10 > 3 })),
    });
  }
  return days;
}
