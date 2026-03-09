import type { MacroTargets, RecommendedInputs } from '@/domain/profile/types'

const ACTIVITY_MULTIPLIERS: Record<RecommendedInputs['activity'], number> = {
  athlete: 1.9,
  high: 1.725,
  light: 1.375,
  moderate: 1.55,
  sedentary: 1.2,
}

const GOAL_ADJUSTMENTS: Record<RecommendedInputs['goal'], number> = {
  gain: 0.1,
  lose: -0.15,
  maintain: 0,
}

const isPositiveNumber = (value: number): boolean =>
  Number.isFinite(value) && value > 0

export const calculateRecommendedTargets = (
  inputs: RecommendedInputs,
): MacroTargets => {
  if (
    !isPositiveNumber(inputs.age) ||
    !isPositiveNumber(inputs.heightCm) ||
    !isPositiveNumber(inputs.weightKg)
  ) {
    return { carbs: 0, fat: 0, kcal: 0, protein: 0 }
  }

  const base =
    inputs.sex === 'male'
      ? 10 * inputs.weightKg + 6.25 * inputs.heightCm - 5 * inputs.age + 5
      : 10 * inputs.weightKg + 6.25 * inputs.heightCm - 5 * inputs.age - 161

  const tdee = base * (ACTIVITY_MULTIPLIERS[inputs.activity] ?? 1)
  const kcal = Math.max(
    0,
    Math.round(tdee * (1 + GOAL_ADJUSTMENTS[inputs.goal])),
  )

  if (kcal === 0) return { carbs: 0, fat: 0, kcal: 0, protein: 0 }

  const protein = Math.max(0, Math.round(inputs.weightKg * 1.6))
  const fat = Math.max(0, Math.round(inputs.weightKg * 0.8))
  const remaining = kcal - protein * 4 - fat * 9
  const carbs = Math.max(0, Math.round(remaining / 4))

  return { carbs, fat, kcal, protein }
}
