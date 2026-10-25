/** Validação de matrículas portuguesas (formatos 1992–hoje) */
export const PLATE_REGEX = /^([A-Z]{2}-\d{2}-\d{2}|\d{2}-\d{2}-[A-Z]{2}|\d{2}-[A-Z]{2}-\d{2}|[A-Z]{2}-\d{2}-[A-Z]{2})$/;

/** Normaliza "aa00aa" / "aa 00 aa" → "AA-00-AA" */
export function normalizePlate(input: string) {
  const raw = input.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
  return raw.replace(/(.{2})(?=.)/g, "$1-");
}

/** Ano aproximado a partir da matrícula (simulação) */
export function yearFromPlate(plate: string): number {
  const p = plate.toUpperCase();
  if (/^[A-Z]{2}-\d{2}-[A-Z]{2}$/.test(p)) {
    const first = p.charCodeAt(0) - 65; // A=2020
    return Math.min(2026, 2020 + first * 1 + Math.floor((p.charCodeAt(1) - 65) / 9));
  }
  if (/^\d{2}-[A-Z]{2}-\d{2}$/.test(p)) return 2012;
  if (/^\d{2}-\d{2}-[A-Z]{2}$/.test(p)) return 2008;
  return 2002;
}
