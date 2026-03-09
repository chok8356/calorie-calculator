import type { Food } from '@/domain/foods/types'
import type { DeleteFood } from '@/features/foods/actions'

import { foodsApiFakeFactory } from '@/infra/foods-api-fake-factory'
import { err, ok, toInfraError } from '@/shared/result'

export const createDeleteFood = (storage: Storage): DeleteFood => {
  const api = foodsApiFakeFactory(storage)

  return async (id: Food['id']) => {
    try {
      const res = await api.deleteFood(id)
      if (res._t === 'not-found') return err({ _t: 'not-found' })
      return ok(undefined)
    } catch {
      return err(toInfraError())
    }
  }
}
