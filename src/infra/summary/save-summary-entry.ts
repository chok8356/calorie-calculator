import type { SaveSummaryEntry } from '@/features/summary/actions'

import { summaryApiFakeFactory } from '@/infra/summary-api-fake-factory'
import { domainToDto, dtoToDomain } from '@/infra/summary/mappers'
import { err, ok, toInfraError } from '@/shared/result'

export const createSaveSummaryEntry = (storage: Storage): SaveSummaryEntry => {
  const api = summaryApiFakeFactory(storage)

  return async (entry) => {
    try {
      const saved = await api.saveEntry(domainToDto(entry))
      return ok(dtoToDomain(saved))
    } catch {
      return err(toInfraError())
    }
  }
}
