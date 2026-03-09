import type { Food } from '@/domain/foods/types'

import type { FoodDto } from '../foods-api-fake-factory'

export const dtoToDomain = (dto: FoodDto): Food => ({
  id: dto.food_id,
  name: dto.display_name,
  per100g: dto.macros_per_100g,
})

export const domainToDto = (food: Food): FoodDto => ({
  display_name: food.name,
  food_id: food.id,
  macros_per_100g: food.per100g,
})
