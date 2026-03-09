import type { Food } from '@/domain/foods/types'
import type { Meal } from '@/domain/meals/types'
import type { SummaryEntry } from '@/domain/summary/types'

export type MacroTotals = {
  carbs: number
  fat: number
  grams: number
  kcal: number
  protein: number
}

export const zeroMacroTotals = (): MacroTotals => ({
  carbs: 0,
  fat: 0,
  grams: 0,
  kcal: 0,
  protein: 0,
})

export const sumMacroTotals = (
  acc: MacroTotals,
  next: MacroTotals,
): MacroTotals => ({
  carbs: acc.carbs + next.carbs,
  fat: acc.fat + next.fat,
  grams: acc.grams + next.grams,
  kcal: acc.kcal + next.kcal,
  protein: acc.protein + next.protein,
})

export const calculateMealTotals = (
  meal: Meal,
  foodsById: ReadonlyMap<string, Food>,
): MacroTotals => {
  let totals = zeroMacroTotals()

  for (const item of meal.items) {
    const food = foodsById.get(item.foodId)
    if (!food) continue
    const multiplier = item.grams / 100

    totals = sumMacroTotals(totals, {
      carbs: food.per100g.carbs * multiplier,
      fat: food.per100g.fat * multiplier,
      grams: item.grams,
      kcal: food.per100g.kcal * multiplier,
      protein: food.per100g.protein * multiplier,
    })
  }

  return totals
}

export const calculateSummaryEntryTotals = (
  entry: SummaryEntry,
  mealsById: ReadonlyMap<string, Meal>,
  foodsById: ReadonlyMap<string, Food>,
): MacroTotals => {
  if (entry._t === 'food') {
    const food = foodsById.get(entry.foodId)
    if (!food) return zeroMacroTotals()
    const multiplier = entry.grams / 100
    return {
      carbs: food.per100g.carbs * multiplier,
      fat: food.per100g.fat * multiplier,
      grams: entry.grams,
      kcal: food.per100g.kcal * multiplier,
      protein: food.per100g.protein * multiplier,
    }
  }

  const meal = mealsById.get(entry.mealId)
  if (!meal) return zeroMacroTotals()

  const base = calculateMealTotals(meal, foodsById)
  if (base.grams <= 0) return zeroMacroTotals()

  const multiplier = entry.grams / base.grams
  return {
    carbs: base.carbs * multiplier,
    fat: base.fat * multiplier,
    grams: entry.grams,
    kcal: base.kcal * multiplier,
    protein: base.protein * multiplier,
  }
}
