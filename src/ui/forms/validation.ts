export const requireNonEmpty = (
  value: string,
  fieldName: string,
): null | string => {
  return value.trim() ? null : `${fieldName} is required`
}

export const requireNonNegative = (
  value: number,
  fieldName: string,
): null | string => {
  return value >= 0 ? null : `${fieldName} must be >= 0`
}

export const requirePositive = (
  value: number,
  fieldName: string,
): null | string => {
  return value > 0 ? null : `${fieldName} must be > 0`
}
