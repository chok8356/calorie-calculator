import { describe, expect, it } from 'vitest'

import type { Food } from '@/domain/foods/types'
import type { FoodDto } from '@/infra/foods-api-fake-factory'

import { domainToDto, dtoToDomain } from './mappers'

describe('foods mappers', () => {
  it('maps dto to domain', () => {
    const dto: FoodDto = {
      display_name: 'Banana',
      food_id: 'banana',
      macros_per_100g: { carbs: 23, fat: 0.3, kcal: 89, protein: 1.1 },
    }

    expect(dtoToDomain(dto)).toEqual<Food>({
      id: 'banana',
      name: 'Banana',
      per100g: { carbs: 23, fat: 0.3, kcal: 89, protein: 1.1 },
    })
  })

  it('maps domain to dto', () => {
    const food: Food = {
      id: 'banana',
      name: 'Banana',
      per100g: { carbs: 23, fat: 0.3, kcal: 89, protein: 1.1 },
    }

    expect(domainToDto(food)).toEqual<FoodDto>({
      display_name: 'Banana',
      food_id: 'banana',
      macros_per_100g: { carbs: 23, fat: 0.3, kcal: 89, protein: 1.1 },
    })
  })
})
