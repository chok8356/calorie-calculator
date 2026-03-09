<template>
  <section
    class="relative h-full overflow-auto pb-25"
    :data-testid="getTestId('root')">
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-indigo-300/20 via-sky-300/10 to-transparent" />
    <header
      class="sticky top-0 z-2 flex w-full items-end justify-between gap-3 px-5 pt-6 pb-4 backdrop-blur-md">
      <div class="space-y-1.5">
        <p
          class="text-[11px] font-semibold tracking-[0.22em] text-indigo-100/75 uppercase">
          Profile Setup
        </p>
        <h1 class="text-3xl font-bold tracking-tight text-white">Profile</h1>
        <span class="text-xs font-medium text-zinc-300">Goals & targets</span>
        <p class="text-xs text-zinc-300">
          Configure your daily target once, then track progress on Summary.
        </p>
      </div>
    </header>

    <div class="space-y-4 px-5 pb-6">
      <div
        class="rounded-3xl border border-white/10 bg-zinc-950/35 p-4 text-white backdrop-blur-xl"
        :data-testid="getTestId('recommended-section')">
        <div class="flex items-center justify-between gap-2">
          <div>
            <h2 class="text-base font-semibold">Recommended targets</h2>
            <p class="mt-1 text-xs text-zinc-300">
              Enter your metrics and activity level to calculate a daily target.
            </p>
          </div>
          <span
            class="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] tracking-wide text-zinc-200 uppercase"
            >Auto</span
          >
        </div>

        <div class="mt-4 grid gap-3 md:grid-cols-2">
          <div class="space-y-2">
            <Label class="text-white">Sex</Label>
            <Select v-model="sex">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select sex" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="male">Male</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2">
            <Label class="text-white">Age</Label>
            <NumberField
              :format-options="{ maximumFractionDigits: 1 }"
              :min="0"
              :model-value="age"
              :step="0.1"
              @update:modelValue="
                (value) => {
                  age = value
                }
              ">
              <NumberFieldContent>
                <NumberFieldInput />
              </NumberFieldContent>
            </NumberField>
          </div>

          <div class="space-y-2">
            <Label class="text-white">Height (cm)</Label>
            <NumberField
              :format-options="{ maximumFractionDigits: 1 }"
              :min="0"
              :model-value="heightCm"
              :step="0.1"
              @update:modelValue="
                (value) => {
                  heightCm = value
                }
              ">
              <NumberFieldContent>
                <NumberFieldInput />
              </NumberFieldContent>
            </NumberField>
          </div>

          <div class="space-y-2">
            <Label class="text-white">Weight (kg)</Label>
            <NumberField
              :format-options="{ maximumFractionDigits: 1 }"
              :min="0"
              :model-value="weightKg"
              :step="0.1"
              @update:modelValue="
                (value) => {
                  weightKg = value
                }
              ">
              <NumberFieldContent>
                <NumberFieldInput />
              </NumberFieldContent>
            </NumberField>
          </div>

          <div class="space-y-2">
            <Label class="text-white">Activity</Label>
            <Select v-model="activity">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select activity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="athlete">Athlete</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2">
            <Label class="text-white">Goal</Label>
            <Select v-model="goal">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maintain">Maintain</SelectItem>
                <SelectItem value="lose">Lose fat</SelectItem>
                <SelectItem value="gain">Gain mass</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div class="mt-4 rounded-2xl border border-white/10 bg-zinc-900/45 p-4">
          <div class="flex items-center justify-between text-xs text-zinc-300">
            <span>Calculated targets</span>
            <span class="text-zinc-400">per day</span>
          </div>
          <div class="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <div class="flex items-center justify-between">
              <span class="text-zinc-300">Calories</span>
              <strong
                class="text-white"
                :data-testid="getTestId('recommended-kcal-value')"
                >{{ formatNumber(recommendedTargets.kcal) }} kcal</strong
              >
            </div>
            <div class="flex items-center justify-between">
              <span class="text-zinc-300">Protein</span>
              <strong class="text-white"
                >{{ formatNumber(recommendedTargets.protein) }} g</strong
              >
            </div>
            <div class="flex items-center justify-between">
              <span class="text-zinc-300">Fat</span>
              <strong class="text-white"
                >{{ formatNumber(recommendedTargets.fat) }} g</strong
              >
            </div>
            <div class="flex items-center justify-between">
              <span class="text-zinc-300">Carbs</span>
              <strong class="text-white"
                >{{ formatNumber(recommendedTargets.carbs) }} g</strong
              >
            </div>
          </div>
        </div>

        <p
          v-if="recommendedError"
          class="mt-3 text-xs text-red-300"
          :data-testid="getTestId('recommended-error')">
          {{ recommendedError }}
        </p>

        <div class="mt-4 flex flex-wrap items-center gap-3">
          <Button
            class="bg-indigo-300/90 text-zinc-950 hover:bg-indigo-200"
            :data-testid="getTestId('use-recommended-button')"
            :disabled="saving"
            @click="saveRecommended">
            {{ saving ? 'Saving...' : 'Apply recommended target' }}
          </Button>
          <span
            v-if="profile?.mode === 'recommended'"
            class="text-xs text-zinc-300"
            :data-testid="getTestId('recommended-active-goal')">
            Active now · updated {{ formattedUpdatedAt }}
          </span>
        </div>
      </div>

      <div
        class="rounded-3xl border border-white/10 bg-zinc-950/35 p-4 text-white backdrop-blur-xl"
        :data-testid="getTestId('custom-section')">
        <div class="flex items-center justify-between gap-2">
          <div>
            <h2 class="text-base font-semibold">Custom targets</h2>
            <p class="mt-1 text-xs text-zinc-300">
              Set your own calories and macros if you follow a manual plan.
            </p>
          </div>
          <span
            class="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] tracking-wide text-zinc-200 uppercase"
            >Manual</span
          >
        </div>

        <div class="mt-4 grid gap-3 md:grid-cols-2">
          <div class="space-y-2">
            <Label class="text-white">Calories</Label>
            <NumberField
              :format-options="{ maximumFractionDigits: 1 }"
              :min="0"
              :model-value="customKcal"
              :step="0.1"
              @update:modelValue="
                (value) => {
                  customKcal = value
                }
              ">
              <NumberFieldContent>
                <NumberFieldInput />
              </NumberFieldContent>
            </NumberField>
          </div>
          <div class="space-y-2">
            <Label class="text-white">Protein (g)</Label>
            <NumberField
              :format-options="{ maximumFractionDigits: 1 }"
              :min="0"
              :model-value="customProtein"
              :step="0.1"
              @update:modelValue="
                (value) => {
                  customProtein = value
                }
              ">
              <NumberFieldContent>
                <NumberFieldInput />
              </NumberFieldContent>
            </NumberField>
          </div>
          <div class="space-y-2">
            <Label class="text-white">Fat (g)</Label>
            <NumberField
              :format-options="{ maximumFractionDigits: 1 }"
              :min="0"
              :model-value="customFat"
              :step="0.1"
              @update:modelValue="
                (value) => {
                  customFat = value
                }
              ">
              <NumberFieldContent>
                <NumberFieldInput />
              </NumberFieldContent>
            </NumberField>
          </div>
          <div class="space-y-2">
            <Label class="text-white">Carbs (g)</Label>
            <NumberField
              :format-options="{ maximumFractionDigits: 1 }"
              :min="0"
              :model-value="customCarbs"
              :step="0.1"
              @update:modelValue="
                (value) => {
                  customCarbs = value
                }
              ">
              <NumberFieldContent>
                <NumberFieldInput />
              </NumberFieldContent>
            </NumberField>
          </div>
        </div>

        <p
          v-if="customError"
          class="mt-3 text-xs text-red-300"
          :data-testid="getTestId('custom-error')">
          {{ customError }}
        </p>

        <div class="mt-4 flex flex-wrap items-center gap-3">
          <Button
            :data-testid="getTestId('save-custom-button')"
            :disabled="saving"
            variant="outline"
            @click="saveCustom">
            {{ saving ? 'Saving...' : 'Apply custom target' }}
          </Button>
          <span
            v-if="profile?.mode === 'custom'"
            class="text-xs text-zinc-300"
            :data-testid="getTestId('custom-active-goal')">
            Active now · updated {{ formattedUpdatedAt }}
          </span>
        </div>
      </div>

      <div
        class="rounded-3xl border border-white/10 bg-zinc-950/35 p-4"
        :data-testid="getTestId('summary-impact')">
        <h3 class="text-sm font-semibold text-white">How it affects Summary</h3>
        <p class="mt-2 text-xs text-zinc-300">
          The selected target is used for the progress ring and daily delta.
        </p>
        <div class="mt-3 text-xs text-zinc-300">
          Current active target:
          <strong class="text-white"
            >{{ formatNumber(activeTargets.kcal) }} kcal</strong
          >
          · P {{ formatNumber(activeTargets.protein) }} · F
          {{ formatNumber(activeTargets.fat) }} · C
          {{ formatNumber(activeTargets.carbs) }}
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import type { SaveProfile, ViewProfile } from '@/features/profile/actions'

export type ProfilePageViewDeps = {
  saveProfile: SaveProfile
  viewProfile: ViewProfile
}
</script>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

import type {
  ActivityLevel,
  GoalType,
  ProfileSettings,
  Sex,
} from '@/domain/profile/types'

import { calculateRecommendedTargets } from '@/domain/profile/calculate-targets'
import { useTestId } from '@/lib/use-test-id'
import { getInfraErrorMessage } from '@/ui/forms/errors'
import { requireNonNegative, requirePositive } from '@/ui/forms/validation'
import { useSaveProfileMutation } from '@/ui/query-hooks/profile/use-save-profile-mutation'
import { useViewProfileQuery } from '@/ui/query-hooks/profile/use-view-profile-query'
import { Button } from '@/ui/shadcn/components/ui/button'
import { Label } from '@/ui/shadcn/components/ui/label'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldInput,
} from '@/ui/shadcn/components/ui/number-field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/shadcn/components/ui/select'

const props = defineProps<{
  deps: ProfilePageViewDeps
}>()

const { getTestId } = useTestId('profile-page')

const { data: profileResult } = useViewProfileQuery(props.deps.viewProfile)
const { isPending: saving, mutateAsync: saveProfile } = useSaveProfileMutation(
  props.deps.saveProfile,
)

const profile = computed(() =>
  profileResult.value && profileResult.value.ok
    ? profileResult.value.value
    : null,
)

const sex = ref<Sex>('female')
const age = ref(30)
const heightCm = ref(170)
const weightKg = ref(70)
const activity = ref<ActivityLevel>('moderate')
const goal = ref<GoalType>('maintain')

const customKcal = ref(2000)
const customProtein = ref(130)
const customFat = ref(70)
const customCarbs = ref(200)

const recommendedError = ref('')
const customError = ref('')

const recommendedTargets = computed(() =>
  calculateRecommendedTargets({
    activity: activity.value,
    age: age.value,
    goal: goal.value,
    heightCm: heightCm.value,
    sex: sex.value,
    weightKg: weightKg.value,
  }),
)

const activeTargets = computed(() => {
  if (!profile.value) return recommendedTargets.value
  return profile.value.mode === 'custom'
    ? profile.value.customTargets
    : calculateRecommendedTargets(profile.value.recommended)
})

const formattedUpdatedAt = computed(() => {
  if (!profile.value?.updatedAt) return ''
  const date = new Date(profile.value.updatedAt)
  if (Number.isNaN(date.getTime())) return profile.value.updatedAt
  return new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
})

const setFromProfile = (next: null | ProfileSettings): void => {
  if (!next) return
  sex.value = next.recommended.sex
  age.value = next.recommended.age
  heightCm.value = next.recommended.heightCm
  weightKg.value = next.recommended.weightKg
  activity.value = next.recommended.activity
  goal.value = next.recommended.goal
  customKcal.value = next.customTargets.kcal
  customProtein.value = next.customTargets.protein
  customFat.value = next.customTargets.fat
  customCarbs.value = next.customTargets.carbs
}

watch(
  () => profile.value,
  (next) => {
    setFromProfile(next ?? null)
  },
  { immediate: true },
)

const buildProfile = (mode: ProfileSettings['mode']): ProfileSettings => {
  return {
    customTargets: {
      carbs: customCarbs.value,
      fat: customFat.value,
      kcal: customKcal.value,
      protein: customProtein.value,
    },
    mode,
    recommended: {
      activity: activity.value,
      age: age.value,
      goal: goal.value,
      heightCm: heightCm.value,
      sex: sex.value,
      weightKg: weightKg.value,
    },
    updatedAt: new Date().toISOString(),
  }
}

const validateRecommended = (): string => {
  return (
    requirePositive(age.value, 'Age') ??
    requirePositive(heightCm.value, 'Height') ??
    requirePositive(weightKg.value, 'Weight') ??
    ''
  )
}

const validateCustom = (): string => {
  return (
    requireNonNegative(customKcal.value, 'Kcal') ??
    requireNonNegative(customProtein.value, 'Protein') ??
    requireNonNegative(customFat.value, 'Fat') ??
    requireNonNegative(customCarbs.value, 'Carbs') ??
    ''
  )
}

const saveRecommended = async (): Promise<void> => {
  recommendedError.value = ''
  const validationError = validateRecommended()
  if (validationError) {
    recommendedError.value = validationError
    return
  }
  const res = await saveProfile(buildProfile('recommended'))
  if (!res.ok) {
    recommendedError.value = getInfraErrorMessage(res.error)
  }
}

const saveCustom = async (): Promise<void> => {
  customError.value = ''
  const validationError = validateCustom()
  if (validationError) {
    customError.value = validationError
    return
  }
  const res = await saveProfile(buildProfile('custom'))
  if (!res.ok) {
    customError.value = getInfraErrorMessage(res.error)
  }
}

const formatNumber = (value: number): string => {
  if (!Number.isFinite(value)) return '0'
  return Number.isInteger(value) ? `${value}` : value.toFixed(1)
}
</script>
