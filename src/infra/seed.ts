import type { FoodDto } from '@/infra/foods-api-fake-factory'
import type { MealDto } from '@/infra/meals-api-fake-factory'
import type { ProfileDto } from '@/infra/profile-api-fake-factory'
import type { SummaryEntryDto } from '@/infra/summary-api-fake-factory'

const FOODS_KEY = 'foods.v1'
const MEALS_KEY = 'meals.v1'
const SUMMARY_KEY = 'summary.v1'
const PROFILE_KEY = 'profile.v1'

const hasKey = (storage: Storage, key: string): boolean => {
  const value = storage.getItem(key)
  return value !== null && value !== ''
}

const seedFoods: FoodDto[] = [
  {
    display_name: 'Chicken breast',
    food_id: 'food-chicken-breast',
    macros_per_100g: {
      carbs: 0,
      fat: 3.6,
      kcal: 165,
      protein: 31,
    },
  },
  {
    display_name: 'Boiled rice',
    food_id: 'food-rice-boiled',
    macros_per_100g: {
      carbs: 28,
      fat: 0.3,
      kcal: 130,
      protein: 2.7,
    },
  },
  {
    display_name: 'Banana',
    food_id: 'food-banana',
    macros_per_100g: {
      carbs: 23,
      fat: 0.3,
      kcal: 89,
      protein: 1.1,
    },
  },
]

const seedMeals: MealDto[] = [
  {
    display_name: 'Chicken and rice bowl',
    items: [
      { food_id: 'food-chicken-breast', grams: 180 },
      { food_id: 'food-rice-boiled', grams: 200 },
    ],
    meal_id: 'meal-chicken-rice-bowl',
  },
  {
    display_name: 'Banana snack',
    items: [{ food_id: 'food-banana', grams: 150 }],
    meal_id: 'meal-banana-snack',
  },
]

const seedSummary: SummaryEntryDto[] = [
  {
    created_at: '2026-02-25T08:30:00.000Z',
    entry_data: {
      _t: 'meal',
      meal_id: 'meal-chicken-rice-bowl',
    },
    entry_id: 'entry-breakfast-1',
    grams: 380,
  },
  {
    created_at: '2026-02-25T13:10:00.000Z',
    entry_data: {
      _t: 'food',
      food_id: 'food-banana',
    },
    entry_id: 'entry-snack-1',
    grams: 120,
  },
  {
    created_at: '2026-02-25T19:40:00.000Z',
    entry_data: {
      _t: 'meal',
      meal_id: 'meal-banana-snack',
    },
    entry_id: 'entry-evening-1',
    grams: 150,
  },
]

const seedProfile: ProfileDto = {
  custom_targets: { carbs: 200, fat: 70, kcal: 2000, protein: 130 },
  mode: 'recommended',
  recommended: {
    activity: 'light',
    age: 30,
    goal: 'lose',
    height_cm: 185,
    sex: 'male',
    weight_kg: 82,
  },
  updated_at: '2026-01-29T20:41:13.797Z',
}

export const seedLocalStorage = (storage: Storage): void => {
  if (!hasKey(storage, FOODS_KEY)) {
    storage.setItem(FOODS_KEY, JSON.stringify(seedFoods))
  }
  if (!hasKey(storage, MEALS_KEY)) {
    storage.setItem(MEALS_KEY, JSON.stringify(seedMeals))
  }
  if (!hasKey(storage, SUMMARY_KEY)) {
    storage.setItem(SUMMARY_KEY, JSON.stringify(seedSummary))
  }
  if (!hasKey(storage, PROFILE_KEY)) {
    storage.setItem(PROFILE_KEY, JSON.stringify(seedProfile))
  }
}
