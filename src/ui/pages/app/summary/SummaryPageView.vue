<template>
  <section
    class="relative h-full overflow-auto pb-25"
    :data-testid="getTestId('root')">
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-50 bg-gradient-to-b from-sky-300/20 via-cyan-300/12 to-transparent" />
    <header
      class="sticky top-0 z-2 flex w-full items-end justify-between gap-3 px-5 pt-6 pb-4 backdrop-blur-md">
      <div class="space-y-1.5">
        <p
          class="text-[11px] font-semibold tracking-[0.22em] text-cyan-100/75 uppercase">
          Daily Dashboard
        </p>
        <h1 class="text-3xl font-bold tracking-tight text-white">Summary</h1>
        <span class="text-xs font-medium text-zinc-300"
          >Today • {{ formattedDate }}</span
        >
        <p class="text-xs text-zinc-300">
          Track your daily intake and compare it with your target.
        </p>
      </div>

      <Button
        class="bg-cyan-300/90 text-zinc-950 shadow-lg shadow-cyan-400/15 hover:bg-cyan-200"
        @click="startCreate">
        Log entry
      </Button>
    </header>

    <div class="grid gap-4 px-5 pb-6">
      <div
        class="rounded-3xl border border-white/10 bg-zinc-950/35 p-4 text-white backdrop-blur-xl"
        :data-testid="getTestId('daily-summary-card')">
        <div class="flex items-center justify-between gap-4">
          <div>
            <h2 class="text-base font-semibold">Daily summary</h2>
            <p class="mt-2 text-3xl font-semibold">
              <span :data-testid="getTestId('total-kcal-value')">
                {{ formatMacro(dayTotals.kcal) }}
              </span>
            </p>
            <p class="text-xs text-zinc-300">
              kcal today · target {{ formatMacro(targetKcal) }}
            </p>
            <p class="mt-1 text-xs text-cyan-100">
              {{ kcalDeltaLabel }}
            </p>
          </div>
          <div
            class="relative flex h-20 w-20 items-center justify-center rounded-full p-[4px]"
            :style="{
              background: `conic-gradient(from 0deg, rgba(34, 211, 238, 0.9) 0% ${kcalPercent}%, rgba(255, 255, 255, 0.12) ${kcalPercent}% 100%)`,
            }">
            <div
              class="flex h-full w-full items-center justify-center rounded-full border border-white/10 bg-zinc-950/70">
              <span class="text-xs font-semibold">{{ kcalPercent }}%</span>
            </div>
          </div>
        </div>

        <div class="mt-5 space-y-3">
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-xs">
              <span class="text-zinc-300">Protein</span>
              <strong class="text-white"
                >{{ formatMacro(dayTotals.protein) }} g</strong
              >
            </div>
            <div class="h-2 rounded-full bg-white/5">
              <div
                class="h-full rounded-full bg-teal-300/80 transition-all"
                :style="{ width: `${macroPercents.protein}%` }" />
            </div>
          </div>
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-xs">
              <span class="text-zinc-300">Fat</span>
              <strong class="text-white"
                >{{ formatMacro(dayTotals.fat) }} g</strong
              >
            </div>
            <div class="h-2 rounded-full bg-white/5">
              <div
                class="h-full rounded-full bg-amber-300/80 transition-all"
                :style="{ width: `${macroPercents.fat}%` }" />
            </div>
          </div>
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-xs">
              <span class="text-zinc-300">Carbs</span>
              <strong class="text-white"
                >{{ formatMacro(dayTotals.carbs) }} g</strong
              >
            </div>
            <div class="h-2 rounded-full bg-white/5">
              <div
                class="h-full rounded-full bg-rose-300/80 transition-all"
                :style="{ width: `${macroPercents.carbs}%` }" />
            </div>
          </div>
        </div>
      </div>

      <div
        class="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/35 backdrop-blur-xl">
        <div class="border-b border-white/10 px-4 py-3">
          <h2 class="text-base font-semibold text-white">Today entries</h2>
          <p class="mt-1 text-xs text-zinc-400">
            {{ entries.length }} item(s) logged
          </p>
        </div>

        <div
          v-if="loading"
          class="p-4"
          :data-testid="getTestId('loading-state')">
          <p class="text-xs text-zinc-300">Loading...</p>
        </div>

        <div
          v-else-if="entries.length === 0"
          class="p-7 text-center"
          :data-testid="getTestId('empty-state')">
          <p class="text-sm font-semibold text-white">No entries for today.</p>
          <p class="mt-1 text-sm text-zinc-300">
            Add foods or meals to see them here.
          </p>
        </div>

        <ul
          v-else
          class="divide-y divide-white/10"
          :data-testid="getTestId('entries-list')">
          <li
            v-for="entry in entries"
            :key="entry.id"
            class="px-4 py-4"
            :data-testid="getTestId('entry-item')">
            <div class="flex items-start justify-between gap-3">
              <div class="flex w-full flex-col gap-1">
                <div class="flex items-center justify-between gap-2">
                  <div class="flex min-w-0 items-center gap-2">
                    <p class="truncate text-sm font-semibold text-white">
                      {{ getEntryName(entry) }}
                    </p>
                    <span
                      class="rounded-full border border-white/15 bg-white/8 px-2 py-0.5 text-[11px] text-zinc-300">
                      {{ entry._t === 'food' ? 'Food' : 'Meal' }}
                    </span>
                  </div>
                  <span class="text-xs text-zinc-400">{{
                    formatTime(entry.createdAt)
                  }}</span>
                </div>
                <p class="text-xs text-zinc-300">
                  Portion: {{ formatMacro(entry.grams) }} g
                </p>
                <p class="text-xs text-zinc-400">
                  {{ formatMacro(getEntryTotals(entry).kcal) }} kcal · P
                  {{ formatMacro(getEntryTotals(entry).protein) }} · F
                  {{ formatMacro(getEntryTotals(entry).fat) }} · C
                  {{ formatMacro(getEntryTotals(entry).carbs) }}
                </p>
              </div>
              <div class="flex shrink-0 items-center gap-2">
                <Button
                  aria-label="Edit entry"
                  size="icon"
                  variant="outline"
                  @click="startEdit(entry)">
                  <PencilIcon />
                </Button>
                <Button
                  aria-label="Delete entry"
                  size="icon"
                  variant="outline"
                  @click="removeEntry(entry.id)">
                  <TrashIcon />
                </Button>
              </div>
            </div>
          </li>
        </ul>

        <div
          v-if="listError"
          class="p-5">
          <p class="text-sm text-white">Load error</p>
          <p class="mt-1 text-xs text-zinc-300">{{ listError }}</p>
        </div>
        <div
          v-if="deleteError"
          class="p-5"
          :data-testid="getTestId('delete-error')">
          <p class="text-sm text-white">Delete error</p>
          <p class="mt-1 text-xs text-zinc-300">{{ deleteError }}</p>
        </div>
      </div>

      <aside
        class="rounded-3xl border border-white/10 bg-zinc-950/35 p-4 text-white backdrop-blur-xl"
        :data-testid="getTestId('targets-card')">
        <h2 class="text-base font-semibold">
          Targets
          <span class="ml-2 text-xs font-medium text-zinc-400"
            >from profile</span
          >
        </h2>
        <p class="mt-2 text-xs leading-relaxed text-zinc-300">
          Your summary ring uses the target from Profile settings.
        </p>
        <div
          v-if="profileTargets"
          class="mt-3 rounded-xl border border-white/10 bg-zinc-900/50 p-3 text-xs text-zinc-300">
          Target:
          <strong class="text-white"
            >{{ formatMacro(profileTargets.kcal) }} kcal</strong
          >
          · P {{ formatMacro(profileTargets.protein) }} · F
          {{ formatMacro(profileTargets.fat) }} · C
          {{ formatMacro(profileTargets.carbs) }}
        </div>
        <p
          v-else
          class="mt-3 text-xs text-zinc-400">
          Set up Profile goals to personalize your targets.
        </p>
      </aside>
    </div>

    <SummaryEntryFormDrawer
      v-model:open="showEntryFormModal"
      :deps="{ saveSummaryEntry: props.deps.saveSummaryEntry }"
      :entry="editingEntry"
      :foods="foods"
      :meals="meals" />
  </section>
</template>

<script lang="ts">
import type { ViewProfile } from '@/features/profile/actions'
import type {
  DeleteSummaryEntry,
  SaveSummaryEntry,
  ViewFoodsList,
  ViewMealsList,
  ViewSummaryList,
} from '@/features/summary/actions'

export type SummaryPageViewDeps = {
  deleteSummaryEntry: DeleteSummaryEntry
  saveSummaryEntry: SaveSummaryEntry
  viewFoodsList: ViewFoodsList
  viewMealsList: ViewMealsList
  viewProfile: ViewProfile
  viewSummaryList: ViewSummaryList
}
</script>

<script lang="ts" setup>
import { PencilIcon, TrashIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'

import type { Food } from '@/domain/foods/types'
import type { Meal } from '@/domain/meals/types'
import type { SummaryEntry } from '@/domain/summary/types'

import {
  calculateSummaryEntryTotals,
  type MacroTotals,
  sumMacroTotals,
  zeroMacroTotals,
} from '@/domain/nutrition/calculate-macros'
import { calculateRecommendedTargets } from '@/domain/profile/calculate-targets'
import { useTestId } from '@/lib/use-test-id'
import { getInfraErrorMessage } from '@/ui/forms/errors'
import SummaryEntryFormDrawer from '@/ui/pages/app/summary/children/SummaryEntryFormDrawer.vue'
import { useViewFoodsListQuery } from '@/ui/query-hooks/foods/use-view-foods-list-query'
import { useViewMealsListQuery } from '@/ui/query-hooks/meals/use-view-meals-list-query'
import { useViewProfileQuery } from '@/ui/query-hooks/profile/use-view-profile-query'
import { useDeleteSummaryEntryMutation } from '@/ui/query-hooks/summary/use-delete-summary-entry-mutation'
import { useViewSummaryListQuery } from '@/ui/query-hooks/summary/use-view-summary-list-query'
import { Button } from '@/ui/shadcn/components/ui/button'

const props = defineProps<{
  deps: SummaryPageViewDeps
}>()

const { getTestId } = useTestId('summary-page')

const { data: listResult, isLoading: loading } = useViewSummaryListQuery(
  props.deps.viewSummaryList,
)
const { data: foodsResult } = useViewFoodsListQuery(props.deps.viewFoodsList)
const { data: mealsResult } = useViewMealsListQuery(props.deps.viewMealsList)
const { data: profileResult } = useViewProfileQuery(props.deps.viewProfile)
const { mutateAsync: deleteEntry } = useDeleteSummaryEntryMutation(
  props.deps.deleteSummaryEntry,
)

const listError = computed(() =>
  listResult.value && !listResult.value.ok ? 'Failed to load entries' : '',
)

const entries = computed(() =>
  listResult.value && listResult.value.ok ? listResult.value.value : [],
)

const foods = computed(() =>
  foodsResult.value && foodsResult.value.ok ? foodsResult.value.value : [],
)

const meals = computed(() =>
  mealsResult.value && mealsResult.value.ok ? mealsResult.value.value : [],
)

const profile = computed(() =>
  profileResult.value && profileResult.value.ok
    ? profileResult.value.value
    : null,
)

const foodsById = computed(() => {
  const map = new Map<string, Food>()
  for (const food of foods.value) map.set(food.id, food)
  return map
})

const mealsById = computed(() => {
  const map = new Map<string, Meal>()
  for (const meal of meals.value) map.set(meal.id, meal)
  return map
})

const showEntryFormModal = ref(false)
const editingEntry = ref<SummaryEntry | undefined>()
const deleteError = ref('')
const formattedDate = new Intl.DateTimeFormat(undefined, {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date())

const startCreate = (): void => {
  editingEntry.value = undefined
  showEntryFormModal.value = true
}

const startEdit = (entry: SummaryEntry): void => {
  editingEntry.value = entry
  showEntryFormModal.value = true
}

const removeEntry = async (id: string): Promise<void> => {
  deleteError.value = ''
  const res = await deleteEntry(id)
  if (!res.ok) {
    deleteError.value =
      res.error._t === 'infra'
        ? getInfraErrorMessage(res.error)
        : 'Entry no longer exists'
  }
}

const getEntryTotals = (entry: SummaryEntry): MacroTotals => {
  return calculateSummaryEntryTotals(entry, mealsById.value, foodsById.value)
}

const dayTotals = computed<MacroTotals>(() => {
  let totals = zeroMacroTotals()
  for (const entry of entries.value) {
    totals = sumMacroTotals(totals, getEntryTotals(entry))
  }
  return totals
})

const macroPercents = computed(() => {
  const total =
    dayTotals.value.protein + dayTotals.value.fat + dayTotals.value.carbs
  if (!total) return { carbs: 0, fat: 0, protein: 0 }
  return {
    carbs: Math.min(100, Math.round((dayTotals.value.carbs / total) * 100)),
    fat: Math.min(100, Math.round((dayTotals.value.fat / total) * 100)),
    protein: Math.min(100, Math.round((dayTotals.value.protein / total) * 100)),
  }
})

const kcalPercent = computed(() => {
  const target = targetKcal.value
  if (!Number.isFinite(dayTotals.value.kcal) || target <= 0) return 0
  return Math.min(100, Math.round((dayTotals.value.kcal / target) * 100))
})

const kcalDeltaLabel = computed(() => {
  const delta = targetKcal.value - dayTotals.value.kcal
  if (!Number.isFinite(delta)) return 'No target data'
  if (delta > 0) return `${formatMacro(delta)} kcal remaining`
  if (delta < 0) return `${formatMacro(Math.abs(delta))} kcal above target`
  return 'Target reached'
})

const profileTargets = computed(() => {
  if (!profile.value) return null
  return profile.value.mode === 'custom'
    ? profile.value.customTargets
    : calculateRecommendedTargets(profile.value.recommended)
})

const targetKcal = computed(() => profileTargets.value?.kcal ?? 2000)

const getEntryName = (entry: SummaryEntry): string => {
  if (entry._t === 'food') {
    return foodsById.value.get(entry.foodId)?.name ?? 'Unknown food'
  }
  return mealsById.value.get(entry.mealId)?.name ?? 'Unknown meal'
}

const formatMacro = (value: number): string => {
  if (!Number.isFinite(value)) return '0'
  return Number.isInteger(value) ? `${value}` : value.toFixed(1)
}

const formatTime = (value: string): string => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '--:--'
  return date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>
