export type MealDto = {
  display_name: string
  items: Array<{
    food_id: string
    grams: number
  }>
  meal_id: string
}

type DeleteMealResult = { _t: 'deleted' } | { _t: 'not-found' }

const STORAGE_KEY = 'meals.v1'

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

const readRaw = (storage: Storage): unknown => {
  const raw = storage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as unknown
  } catch {
    return []
  }
}

const isMealDto = (value: unknown): value is MealDto => {
  if (!value || typeof value !== 'object') return false
  const v = value as Partial<MealDto>
  return (
    typeof v.meal_id === 'string' &&
    typeof v.display_name === 'string' &&
    Array.isArray(v.items)
  )
}

const readMealDtos = (storage: Storage): MealDto[] => {
  const data = readRaw(storage)
  if (!Array.isArray(data)) return []
  return data.filter(isMealDto)
}

const writeMealDtos = (storage: Storage, meals: MealDto[]): void => {
  storage.setItem(STORAGE_KEY, JSON.stringify(meals))
}

const compareByDisplayName = <T extends { display_name: string }>(
  left: T,
  right: T,
): number => left.display_name.localeCompare(right.display_name)

export const mealsApiFakeFactory = (
  storage: Storage,
): {
  deleteMeal: (id: string) => Promise<DeleteMealResult>
  listMeals: () => Promise<MealDto[]>
  saveMeal: (meal: MealDto) => Promise<MealDto>
} => {
  return {
    async deleteMeal(id) {
      await delay(150)
      const meals = readMealDtos(storage)
      const exists = meals.some((item) => item.meal_id === id)
      if (!exists) return { _t: 'not-found' }
      writeMealDtos(
        storage,
        meals.filter((item) => item.meal_id !== id),
      )
      return { _t: 'deleted' }
    },
    async listMeals() {
      await delay(150)
      return [...readMealDtos(storage)].sort(compareByDisplayName)
    },
    async saveMeal(meal) {
      await delay(150)
      const meals = readMealDtos(storage)
      const next = meals.some((item) => item.meal_id === meal.meal_id)
        ? meals.map((item) => (item.meal_id === meal.meal_id ? meal : item))
        : [...meals, meal]
      writeMealDtos(storage, next)
      return meal
    },
  }
}
