import type { ViewFoodsList } from '@/features/foods/actions'

import { foodsApiFakeFactory } from '@/infra/foods-api-fake-factory'
import { dtoToDomain } from '@/infra/foods/mappers'
import { err, ok, toInfraError } from '@/shared/result'

export const createViewFoodsList = (storage: Storage): ViewFoodsList => {
  const api = foodsApiFakeFactory(storage)

  return async () => {
    try {
      const dtos = await api.listFoods()
      return ok(dtos.map(dtoToDomain))
    } catch {
      return err(toInfraError())
    }
  }
}
