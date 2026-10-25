/* Formatação para o mercado português (pt-PT) */

const NBSP = " ";

/** Agrupa milhares com espaço fino inseparável: 24900 → "24 900" (também para 4 dígitos) */
export function formatNumber(value: number, decimals = 0) {
  const fixed = Math.abs(value).toFixed(decimals);
  const [int, dec] = fixed.split(".");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
  return `${value < 0 ? "-" : ""}${grouped}${dec ? `,${dec}` : ""}`;
}

/** Preço em euros: "24 900 €" */
export function formatPrice(value: number) {
  return `${formatNumber(Math.round(value))}${NBSP}€`;
}

/** Prestação mensal: "289 €" */
export function formatMonthly(value: number) {
  return `${formatNumber(Math.round(value))}${NBSP}€`;
}

export function formatKm(value: number) {
  return `${formatNumber(value)}${NBSP}km`;
}

export function formatPercent(value: number, decimals = 1) {
  return `${formatNumber(value, decimals)}${NBSP}%`;
}

const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

/** "2022-05" → "mai 2022" */
export function formatMonthYear(iso: string) {
  const [y, m] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

export function formatDateLong(date: Date) {
  return new Intl.DateTimeFormat("pt-PT", { weekday: "long", day: "numeric", month: "long" }).format(date);
}
