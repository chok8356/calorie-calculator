import type { ViewProfile } from '@/features/profile/actions'

import { profileApiFakeFactory } from '@/infra/profile-api-fake-factory'
import { dtoToDomain } from '@/infra/profile/mappers'
import { err, ok, toInfraError } from '@/shared/result'

export const createViewProfile = (storage: Storage): ViewProfile => {
  const api = profileApiFakeFactory(storage)

  return async () => {
    try {
      const dto = await api.getProfile()
      return ok(dto ? dtoToDomain(dto) : null)
    } catch {
      return err(toInfraError())
    }
  }
}
