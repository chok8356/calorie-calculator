import type { Meal } from '@/domain/meals/types'
import type { DeleteMeal } from '@/features/meals/actions'

import { mealsApiFakeFactory } from '@/infra/meals-api-fake-factory'
import { err, ok, toInfraError } from '@/shared/result'

export const createDeleteMeal = (storage: Storage): DeleteMeal => {
  const api = mealsApiFakeFactory(storage)

  return async (id: Meal['id']) => {
    try {
      const res = await api.deleteMeal(id)
      if (res._t === 'not-found') return err({ _t: 'not-found' })
      return ok(undefined)
    } catch {
      return err(toInfraError())
    }
  }
}
