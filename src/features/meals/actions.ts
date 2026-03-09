import type { Meal } from '@/domain/meals/types'
import type { AsyncResult, InfraError } from '@/shared/result'

export type { ViewFoodsList } from '@/features/foods/actions'

export type DeleteMeal = (
  id: Meal['id'],
) => AsyncResult<void, DeleteMealError | InfraError>

export type DeleteMealError = { _t: 'not-found' }

export type SaveMeal = (input: Meal) => AsyncResult<Meal, InfraError>

export type ViewMealsList = () => AsyncResult<Meal[], InfraError>
