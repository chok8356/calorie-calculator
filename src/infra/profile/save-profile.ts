import type { SaveProfile } from '@/features/profile/actions'

import { profileApiFakeFactory } from '@/infra/profile-api-fake-factory'
import { domainToDto, dtoToDomain } from '@/infra/profile/mappers'
import { err, ok, toInfraError } from '@/shared/result'

export const createSaveProfile = (storage: Storage): SaveProfile => {
  const api = profileApiFakeFactory(storage)

  return async (profile) => {
    try {
      const dto = await api.saveProfile(domainToDto(profile))
      return ok(dtoToDomain(dto))
    } catch {
      return err(toInfraError())
    }
  }
}
