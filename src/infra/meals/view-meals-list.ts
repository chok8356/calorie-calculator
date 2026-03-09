import type { ViewMealsList } from '@/features/meals/actions'

import { mealsApiFakeFactory } from '@/infra/meals-api-fake-factory'
import { dtoToDomain } from '@/infra/meals/mappers'
import { err, ok, toInfraError } from '@/shared/result'

export const createViewMealsList = (storage: Storage): ViewMealsList => {
  const api = mealsApiFakeFactory(storage)

  return async () => {
    try {
      const dtos = await api.listMeals()
      return ok(dtos.map(dtoToDomain))
    } catch {
      return err(toInfraError())
    }
  }
}
