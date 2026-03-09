import type { Meal } from '@/domain/meals/types'
import type { SaveMeal } from '@/features/meals/actions'

import { mealsApiFakeFactory } from '@/infra/meals-api-fake-factory'
import { domainToDto, dtoToDomain } from '@/infra/meals/mappers'
import { err, ok, toInfraError } from '@/shared/result'

export const createSaveMeal = (storage: Storage): SaveMeal => {
  const api = mealsApiFakeFactory(storage)

  return async (meal: Meal) => {
    try {
      const saved = await api.saveMeal(domainToDto(meal))
      return ok(dtoToDomain(saved))
    } catch {
      return err(toInfraError())
    }
  }
}
