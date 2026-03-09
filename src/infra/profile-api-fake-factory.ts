import type { ProfileSettings } from '@/domain/profile/types'

export type ProfileDto = {
  custom_targets: {
    carbs: number
    fat: number
    kcal: number
    protein: number
  }
  mode: 'custom' | 'recommended'
  recommended: {
    activity: ProfileSettings['recommended']['activity']
    age: number
    goal: ProfileSettings['recommended']['goal']
    height_cm: number
    sex: ProfileSettings['recommended']['sex']
    weight_kg: number
  }
  updated_at: string
}

const STORAGE_KEY = 'profile.v1'

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

const readRaw = (storage: Storage): unknown => {
  const raw = storage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as unknown
  } catch {
    return null
  }
}

const isProfileDto = (value: unknown): value is ProfileDto => {
  if (!value || typeof value !== 'object') return false
  const v = value as Partial<ProfileDto>
  const targets = v.custom_targets
  const recommended = v.recommended
  if (
    !targets ||
    typeof targets.kcal !== 'number' ||
    typeof targets.protein !== 'number' ||
    typeof targets.fat !== 'number' ||
    typeof targets.carbs !== 'number'
  ) {
    return false
  }
  if (
    !recommended ||
    typeof recommended.age !== 'number' ||
    typeof recommended.height_cm !== 'number' ||
    typeof recommended.weight_kg !== 'number' ||
    typeof recommended.sex !== 'string' ||
    typeof recommended.activity !== 'string' ||
    typeof recommended.goal !== 'string'
  ) {
    return false
  }
  return typeof v.mode === 'string' && typeof v.updated_at === 'string'
}

const readProfileDto = (storage: Storage): null | ProfileDto => {
  const data = readRaw(storage)
  if (!data) return null
  if (isProfileDto(data)) return data
  return null
}

const writeProfileDto = (storage: Storage, profile: ProfileDto): void => {
  storage.setItem(STORAGE_KEY, JSON.stringify(profile))
}

export const profileApiFakeFactory = (
  storage: Storage,
): {
  getProfile: () => Promise<null | ProfileDto>
  saveProfile: (profile: ProfileDto) => Promise<ProfileDto>
} => {
  return {
    async getProfile() {
      await delay(120)
      return readProfileDto(storage)
    },
    async saveProfile(profile) {
      await delay(120)
      writeProfileDto(storage, profile)
      return profile
    },
  }
}
