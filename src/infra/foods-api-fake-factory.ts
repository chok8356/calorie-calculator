export type FoodDto = {
  display_name: string
  food_id: string
  macros_per_100g: {
    carbs: number
    fat: number
    kcal: number
    protein: number
  }
}

type DeleteFoodResult = { _t: 'deleted' } | { _t: 'not-found' }

const STORAGE_KEY = 'foods.v1'

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

const isFoodDto = (value: unknown): value is FoodDto => {
  if (!value || typeof value !== 'object') return false
  const v = value as Partial<FoodDto>
  return (
    typeof v.food_id === 'string' &&
    typeof v.display_name === 'string' &&
    typeof v.macros_per_100g === 'object' &&
    v.macros_per_100g !== null
  )
}

const readFoodsDtos = (storage: Storage): FoodDto[] => {
  const data = readRaw(storage)
  if (!Array.isArray(data)) return []
  return data.filter(isFoodDto)
}

const writeFoodsDtos = (storage: Storage, foods: FoodDto[]): void => {
  storage.setItem(STORAGE_KEY, JSON.stringify(foods))
}

const compareByDisplayName = <T extends { display_name: string }>(
  left: T,
  right: T,
): number => left.display_name.localeCompare(right.display_name)

export const foodsApiFakeFactory = (
  storage: Storage,
): {
  deleteFood: (id: string) => Promise<DeleteFoodResult>
  listFoods: () => Promise<FoodDto[]>
  saveFood: (food: FoodDto) => Promise<FoodDto>
} => {
  return {
    async deleteFood(id) {
      await delay(150)
      const foods = readFoodsDtos(storage)
      const exists = foods.some((item) => item.food_id === id)
      if (!exists) return { _t: 'not-found' }
      writeFoodsDtos(
        storage,
        foods.filter((item) => item.food_id !== id),
      )
      return { _t: 'deleted' }
    },
    async listFoods() {
      await delay(150)
      return [...readFoodsDtos(storage)].sort(compareByDisplayName)
    },
    async saveFood(food) {
      await delay(150)
      const foods = readFoodsDtos(storage)
      const next = foods.some((item) => item.food_id === food.food_id)
        ? foods.map((item) => (item.food_id === food.food_id ? food : item))
        : [...foods, food]
      writeFoodsDtos(storage, next)
      return food
    },
  }
}
