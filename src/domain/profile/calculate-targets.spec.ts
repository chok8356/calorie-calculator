import { describe, expect, it } from 'vitest'

import { calculateRecommendedTargets } from './calculate-targets'

describe('calculateRecommendedTargets', () => {
  it('calculates daily targets for valid inputs', () => {
    expect(
      calculateRecommendedTargets({
        activity: 'moderate',
        age: 31,
        goal: 'maintain',
        heightCm: 176,
        sex: 'male',
        weightKg: 78,
      }),
    ).toEqual({
      carbs: 406,
      fat: 62,
      kcal: 2682,
      protein: 125,
    })
  })

  it('adjusts calories by goal', () => {
    const baseInputs = {
      activity: 'moderate' as const,
      age: 30,
      heightCm: 170,
      sex: 'female' as const,
      weightKg: 70,
    }

    const lose = calculateRecommendedTargets({
      ...baseInputs,
      goal: 'lose',
    })
    const maintain = calculateRecommendedTargets({
      ...baseInputs,
      goal: 'maintain',
    })
    const gain = calculateRecommendedTargets({
      ...baseInputs,
      goal: 'gain',
    })

    expect(lose.kcal).toBeLessThan(maintain.kcal)
    expect(gain.kcal).toBeGreaterThan(maintain.kcal)
    expect(lose.protein).toBe(maintain.protein)
    expect(gain.fat).toBe(maintain.fat)
  })

  it('returns zero targets for non-positive inputs', () => {
    expect(
      calculateRecommendedTargets({
        activity: 'sedentary',
        age: 0,
        goal: 'maintain',
        heightCm: 170,
        sex: 'female',
        weightKg: 70,
      }),
    ).toEqual({
      carbs: 0,
      fat: 0,
      kcal: 0,
      protein: 0,
    })
  })
})
