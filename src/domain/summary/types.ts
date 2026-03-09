export type FoodSummaryEntry = SummaryEntryBase & {
  _t: 'food'
  foodId: string
}

export type MealSummaryEntry = SummaryEntryBase & {
  _t: 'meal'
  mealId: string
}

export type SummaryEntry = FoodSummaryEntry | MealSummaryEntry

export type SummaryEntryBase = {
  createdAt: string
  grams: number
  id: string
}
