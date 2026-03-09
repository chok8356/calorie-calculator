import { describe, expect, it } from 'vitest'

import type { Meal } from '@/domain/meals/types'
import type { MealDto } from '@/infra/meals-api-fake-factory'

import { domainToDto, dtoToDomain } from './mappers'

describe('meals mappers', () => {
  it('maps dto to domain', () => {
    const dto: MealDto = {
      display_name: 'Oatmeal',
      items: [{ food_id: 'oats', grams: 80 }],
      meal_id: 'meal-oats',
    }

    expect(dtoToDomain(dto)).toEqual<Meal>({
      id: 'meal-oats',
      items: [{ foodId: 'oats', grams: 80 }],
      name: 'Oatmeal',
    })
  })

  it('maps domain to dto', () => {
    const meal: Meal = {
      id: 'meal-oats',
      items: [{ foodId: 'oats', grams: 80 }],
      name: 'Oatmeal',
    }

    expect(domainToDto(meal)).toEqual<MealDto>({
      display_name: 'Oatmeal',
      items: [{ food_id: 'oats', grams: 80 }],
      meal_id: 'meal-oats',
    })
  })
})
