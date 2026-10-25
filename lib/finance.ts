import { site } from "@/data/site";

/**
 * Cálculos de financiamento — ILUSTRATIVOS.
 * Prestação pelo método francês (prestações constantes) com base na TAN.
 * Em produção estes valores devem vir da entidade financeira parceira.
 */
export function monthlyPayment(principal: number, annualRatePct: number, months: number) {
  if (principal <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}

/** "Desde X €/mês" apresentado nos cartões: entrada e prazo por omissão */
export function fromMonthly(price: number) {
  const down = price * site.finance.defaultDownPct;
  return monthlyPayment(price - down, site.finance.tan, site.finance.defaultTerm);
}

export interface Simulation {
  financed: number;
  monthly: number;
  totalPaid: number;
  totalInterest: number;
  mtic: number;
}

export function simulate(price: number, down: number, months: number, tan = site.finance.tan): Simulation {
  const financed = Math.max(0, price - down);
  const monthly = monthlyPayment(financed, tan, months);
  const totalPaid = monthly * months;
  return {
    financed,
    monthly,
    totalPaid,
    totalInterest: totalPaid - financed,
    // MTIC ilustrativo: total de prestações + comissões estimadas (placeholder)
    mtic: totalPaid + (financed > 0 ? 300 : 0),
  };
}
