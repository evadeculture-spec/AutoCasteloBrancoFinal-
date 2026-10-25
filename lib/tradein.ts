import { hashString } from "@/lib/utils";
import { yearFromPlate } from "@/lib/plate";

export type Condition = "excelente" | "bom" | "razoavel" | "danos";

/**
 * Estimativa de retoma SIMULADA.
 * Em produção: integração com fonte de cotações (ex: Eurotax/Autovista, Indicata) + inspeção física.
 */
export function estimateTradeIn({ plate, km, condition = "bom", year }: { plate: string; km: number; condition?: Condition; year?: number }) {
  const y = year ?? yearFromPlate(plate);
  const age = Math.max(0, 2026 - y);
  const base = 9000 + (hashString(plate) % 18000); // valor "de mercado" fictício
  const ageFactor = Math.pow(0.88, age);
  const kmFactor = Math.max(0.35, 1 - km / 400000);
  const condFactor = { excelente: 1.05, bom: 1, razoavel: 0.9, danos: 0.75 }[condition];
  const mid = Math.max(500, base * ageFactor * kmFactor * condFactor);
  const round = (n: number) => Math.round(n / 100) * 100;
  return { min: round(mid * 0.94), max: round(mid * 1.06), year: y };
}
