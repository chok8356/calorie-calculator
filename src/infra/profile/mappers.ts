import type { ProfileSettings } from '@/domain/profile/types'
import type { ProfileDto } from '@/infra/profile-api-fake-factory'

export const dtoToDomain = (dto: ProfileDto): ProfileSettings => {
  return {
    customTargets: {
      carbs: dto.custom_targets.carbs,
      fat: dto.custom_targets.fat,
      kcal: dto.custom_targets.kcal,
      protein: dto.custom_targets.protein,
    },
    mode: dto.mode,
    recommended: {
      activity: dto.recommended.activity,
      age: dto.recommended.age,
      goal: dto.recommended.goal,
      heightCm: dto.recommended.height_cm,
      sex: dto.recommended.sex,
      weightKg: dto.recommended.weight_kg,
    },
    updatedAt: dto.updated_at,
  }
}

export const domainToDto = (profile: ProfileSettings): ProfileDto => {
  return {
    custom_targets: {
      carbs: profile.customTargets.carbs,
      fat: profile.customTargets.fat,
      kcal: profile.customTargets.kcal,
      protein: profile.customTargets.protein,
    },
    mode: profile.mode,
    recommended: {
      activity: profile.recommended.activity,
      age: profile.recommended.age,
      goal: profile.recommended.goal,
      height_cm: profile.recommended.heightCm,
      sex: profile.recommended.sex,
      weight_kg: profile.recommended.weightKg,
    },
    updated_at: profile.updatedAt,
  }
}
