import type { Meal } from '@/domain/meals/types'

import type { MealDto } from '../meals-api-fake-factory'

export const dtoToDomain = (dto: MealDto): Meal => ({
  id: dto.meal_id,
  items: dto.items.map((item) => ({
    foodId: item.food_id,
    grams: item.grams,
  })),
  name: dto.display_name,
})

export const domainToDto = (meal: Meal): MealDto => ({
  display_name: meal.name,
  items: meal.items.map((item) => ({
    food_id: item.foodId,
    grams: item.grams,
  })),
  meal_id: meal.id,
})
