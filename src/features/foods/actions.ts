import type { Food } from '@/domain/foods/types'
import type { AsyncResult, InfraError } from '@/shared/result'

export type DeleteFood = (
  id: Food['id'],
) => AsyncResult<void, DeleteFoodError | InfraError>

export type DeleteFoodError = { _t: 'not-found' }

export type SaveFood = (input: Food) => AsyncResult<Food, InfraError>

export type ViewFoodsList = () => AsyncResult<Food[], InfraError>
