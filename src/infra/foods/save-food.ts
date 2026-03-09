import type { Food } from '@/domain/foods/types'
import type { SaveFood } from '@/features/foods/actions'

import { foodsApiFakeFactory } from '@/infra/foods-api-fake-factory'
import { domainToDto, dtoToDomain } from '@/infra/foods/mappers'
import { err, ok, toInfraError } from '@/shared/result'

export const createSaveFood = (storage: Storage): SaveFood => {
  const api = foodsApiFakeFactory(storage)

  return async (food: Food) => {
    try {
      const saved = await api.saveFood(domainToDto(food))
      return ok(dtoToDomain(saved))
    } catch {
      return err(toInfraError())
    }
  }
}
