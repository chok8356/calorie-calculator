export type Food = {
  id: string
  name: string
  per100g: FoodMacros
}

export type FoodMacros = {
  carbs: number
  fat: number
  kcal: number
  protein: number
}
