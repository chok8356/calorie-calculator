import type { SummaryEntry } from '@/domain/summary/types'
import type { AsyncResult, InfraError } from '@/shared/result'

export type { ViewFoodsList } from '@/features/foods/actions'
export type { ViewMealsList } from '@/features/meals/actions'

export type DeleteSummaryEntry = (
  id: SummaryEntry['id'],
) => AsyncResult<void, DeleteSummaryEntryError | InfraError>

export type DeleteSummaryEntryError = { _t: 'not-found' }

export type SaveSummaryEntry = (
  input: SummaryEntry,
) => AsyncResult<SummaryEntry, InfraError>

export type ViewSummaryList = () => AsyncResult<SummaryEntry[], InfraError>
