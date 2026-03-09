export type Meal = {
  id: string
  items: MealItem[]
  name: string
}

export type MealItem = {
  foodId: string
  grams: number
}
