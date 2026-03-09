import { describe, expect, it } from 'vitest'

import type { ProfileSettings } from '@/domain/profile/types'
import type { ProfileDto } from '@/infra/profile-api-fake-factory'

import { domainToDto, dtoToDomain } from './mappers'

describe('profile mappers', () => {
  it('maps dto to domain', () => {
    const dto: ProfileDto = {
      custom_targets: { carbs: 200, fat: 70, kcal: 2000, protein: 130 },
      mode: 'recommended',
      recommended: {
        activity: 'light',
        age: 30,
        goal: 'lose',
        height_cm: 185,
        sex: 'male',
        weight_kg: 82,
      },
      updated_at: '2026-02-27T12:00:00.000Z',
    }

    expect(dtoToDomain(dto)).toEqual<ProfileSettings>({
      customTargets: { carbs: 200, fat: 70, kcal: 2000, protein: 130 },
      mode: 'recommended',
      recommended: {
        activity: 'light',
        age: 30,
        goal: 'lose',
        heightCm: 185,
        sex: 'male',
        weightKg: 82,
      },
      updatedAt: '2026-02-27T12:00:00.000Z',
    })
  })

  it('maps domain to dto', () => {
    const profile: ProfileSettings = {
      customTargets: { carbs: 200, fat: 70, kcal: 2000, protein: 130 },
      mode: 'custom',
      recommended: {
        activity: 'moderate',
        age: 28,
        goal: 'maintain',
        heightCm: 172,
        sex: 'female',
        weightKg: 64,
      },
      updatedAt: '2026-02-27T12:00:00.000Z',
    }

    expect(domainToDto(profile)).toEqual<ProfileDto>({
      custom_targets: { carbs: 200, fat: 70, kcal: 2000, protein: 130 },
      mode: 'custom',
      recommended: {
        activity: 'moderate',
        age: 28,
        goal: 'maintain',
        height_cm: 172,
        sex: 'female',
        weight_kg: 64,
      },
      updated_at: '2026-02-27T12:00:00.000Z',
    })
  })
})
