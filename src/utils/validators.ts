// Validar campo requerido genérico
export function required(value: string | number | null | undefined): boolean {
  return value !== null && value !== undefined && String(value).trim() !== ''
}

// Validar número
export function isNumber(value: string | number): boolean {
  return !isNaN(Number(value))
}

// Validar número > 0
export function isPositive(value: string | number): boolean {
  return Number(value) > 0
}

// Validar rango de fechas
export function isValidDateRange(start: string, end: string): boolean {
  if (!start || !end) return false
  return new Date(start) <= new Date(end)
}

// Validar solapamiento simple
export function doRangesOverlap(
  startA: string,
  endA: string,
  startB: string,
  endB: string
): boolean {
  return !(endA < startB || startA > endB)
}
