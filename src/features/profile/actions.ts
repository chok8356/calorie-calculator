import type { ProfileSettings } from '@/domain/profile/types'
import type { AsyncResult, InfraError } from '@/shared/result'

export type SaveProfile = (
  input: ProfileSettings,
) => AsyncResult<ProfileSettings, InfraError>

export type ViewProfile = () => AsyncResult<null | ProfileSettings, InfraError>
