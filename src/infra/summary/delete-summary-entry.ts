import type { DeleteSummaryEntry } from '@/features/summary/actions'

import { summaryApiFakeFactory } from '@/infra/summary-api-fake-factory'
import { err, ok, toInfraError } from '@/shared/result'

export const createDeleteSummaryEntry = (
  storage: Storage,
): DeleteSummaryEntry => {
  const api = summaryApiFakeFactory(storage)

  return async (id) => {
    try {
      const res = await api.deleteEntry(id)
      if (res._t === 'not-found') return err({ _t: 'not-found' })
      return ok(undefined)
    } catch {
      return err(toInfraError())
    }
  }
}
