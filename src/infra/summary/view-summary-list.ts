import type { ViewSummaryList } from '@/features/summary/actions'

import { summaryApiFakeFactory } from '@/infra/summary-api-fake-factory'
import { dtoToDomain } from '@/infra/summary/mappers'
import { err, ok, toInfraError } from '@/shared/result'

export const createViewSummaryList = (storage: Storage): ViewSummaryList => {
  const api = summaryApiFakeFactory(storage)

  return async () => {
    try {
      const dtos = await api.listEntries()
      return ok(dtos.map(dtoToDomain))
    } catch {
      return err(toInfraError())
    }
  }
}
