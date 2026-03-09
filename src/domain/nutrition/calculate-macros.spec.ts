import { describe, expect, it } from 'vitest'

import type { Food } from '@/domain/foods/types'
import type { Meal } from '@/domain/meals/types'
import type { SummaryEntry } from '@/domain/summary/types'

import {
  calculateMealTotals,
  calculateSummaryEntryTotals,
  sumMacroTotals,
  zeroMacroTotals,
} from './calculate-macros'

const foods: Food[] = [
  {
    id: 'chicken',
    name: 'Chicken',
    per100g: { carbs: 0, fat: 3.6, kcal: 165, protein: 31 },
  },
  {
    id: 'rice',
    name: 'Rice',
    per100g: { carbs: 28, fat: 0.3, kcal: 130, protein: 2.7 },
  },
]

const foodsById = new Map(foods.map((food) => [food.id, food]))

describe('calculate-macros', () => {
  it('calculates meal totals from meal items', () => {
    const meal: Meal = {
      id: 'chicken-rice',
      items: [
        { foodId: 'chicken', grams: 150 },
        { foodId: 'rice', grams: 200 },
      ],
      name: 'Chicken Rice',
    }

    const totals = calculateMealTotals(meal, foodsById)

    expect(totals.grams).toBe(350)
    expect(totals.kcal).toBeCloseTo(507.5, 3)
    expect(totals.protein).toBeCloseTo(51.9, 3)
    expect(totals.fat).toBeCloseTo(6, 3)
    expect(totals.carbs).toBeCloseTo(56, 3)
  })

  it('returns zero totals for unknown meal food ids', () => {
    const meal: Meal = {
      id: 'bad',
      items: [{ foodId: 'unknown', grams: 100 }],
      name: 'Broken',
    }

    expect(calculateMealTotals(meal, foodsById)).toEqual(zeroMacroTotals())
  })

  it('calculates food summary entry totals', () => {
    const entry: SummaryEntry = {
      _t: 'food',
      createdAt: '2026-03-01T12:00:00.000Z',
      foodId: 'rice',
      grams: 150,
      id: 'entry-rice',
    }

    const totals = calculateSummaryEntryTotals(entry, new Map(), foodsById)

    expect(totals.grams).toBe(150)
    expect(totals.kcal).toBeCloseTo(195, 3)
    expect(totals.carbs).toBeCloseTo(42, 3)
  })

  it('calculates meal summary entry totals with scaling', () => {
    const meal: Meal = {
      id: 'chicken-rice',
      items: [
        { foodId: 'chicken', grams: 100 },
        { foodId: 'rice', grams: 100 },
      ],
      name: 'Chicken Rice',
    }
    const mealsById = new Map([[meal.id, meal]])
    const entry: SummaryEntry = {
      _t: 'meal',
      createdAt: '2026-03-01T12:00:00.000Z',
      grams: 100,
      id: 'entry-meal',
      mealId: meal.id,
    }

    const totals = calculateSummaryEntryTotals(entry, mealsById, foodsById)

    expect(totals.grams).toBe(100)
    expect(totals.kcal).toBeCloseTo(147.5, 3)
    expect(totals.protein).toBeCloseTo(16.85, 3)
  })

  it('sums macro totals', () => {
    const sum = sumMacroTotals(
      { carbs: 10, fat: 5, grams: 100, kcal: 120, protein: 7 },
      { carbs: 15, fat: 2, grams: 50, kcal: 80, protein: 4 },
    )

    expect(sum).toEqual({
      carbs: 25,
      fat: 7,
      grams: 150,
      kcal: 200,
      protein: 11,
    })
  })
})
