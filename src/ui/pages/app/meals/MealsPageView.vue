<template>
  <section
    class="relative h-full overflow-auto pb-25"
    :data-testid="getTestId('root')">
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-42 bg-gradient-to-b from-amber-300/20 via-orange-300/10 to-transparent" />
    <header
      class="sticky top-0 z-2 flex w-full items-end justify-between gap-3 px-5 pt-6 pb-4 backdrop-blur-md">
      <div class="space-y-1.5">
        <p
          class="text-[11px] font-semibold tracking-[0.22em] text-amber-100/75 uppercase">
          Meal Builder
        </p>
        <h1 class="text-3xl font-bold tracking-tight text-white">Meals</h1>
        <span class="text-xs font-medium text-zinc-300"
          >Today • {{ formattedDate }}</span
        >
        <p class="text-xs text-zinc-300">
          Combine foods into reusable dishes and add them to your day faster.
        </p>
      </div>

      <Button
        class="bg-amber-300/90 text-zinc-950 shadow-lg shadow-amber-400/15 hover:bg-amber-200"
        @click="startCreate">
        Create meal
      </Button>
    </header>

    <div class="space-y-4 px-5 pb-6">
      <div class="grid gap-3 sm:grid-cols-2">
        <div
          class="rounded-2xl border border-white/10 bg-zinc-950/35 p-4 backdrop-blur-xl">
          <p
            class="text-[11px] font-semibold tracking-wide text-zinc-400 uppercase">
            Total meals
          </p>
          <p
            class="mt-2 text-2xl font-semibold text-white"
            :data-testid="getTestId('total-items-value')">
            {{ items.length }}
          </p>
          <p class="mt-1 text-xs text-zinc-400">Saved meal templates</p>
        </div>
        <div
          class="rounded-2xl border border-amber-300/20 bg-zinc-950/35 p-4 backdrop-blur-xl">
          <p
            class="text-[11px] font-semibold tracking-wide text-zinc-400 uppercase">
            Search results
          </p>
          <p
            class="mt-2 text-2xl font-semibold text-amber-200"
            :data-testid="getTestId('visible-items-value')">
            {{ visibleItems.length }}
          </p>
          <p class="mt-1 text-xs text-zinc-400">Meals matching current query</p>
        </div>
      </div>

      <div
        class="rounded-2xl border border-white/10 bg-zinc-950/35 p-4 backdrop-blur-xl">
        <p class="mb-2 text-xs font-medium text-zinc-400">Quick search</p>
        <InputGroup class="w-full">
          <InputGroupAddon>
            <SearchIcon class="text-amber-200" />
          </InputGroupAddon>
          <InputGroupInput
            v-model="query"
            :data-testid="getTestId('search-input')"
            placeholder="Find meal by name..." />
          <InputGroupAddon align="inline-end">
            <span class="text-xs text-zinc-400"
              >{{ visibleItems.length }}/{{ items.length }}</span
            >
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div
        class="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/35 backdrop-blur-xl">
        <div
          v-if="items.length > 0"
          class="border-b border-white/10 px-4 py-3">
          <h2 class="text-base font-semibold text-white">Meal list</h2>
          <p class="mt-1 text-xs text-zinc-400">
            Review totals before adding meals to your summary.
          </p>
        </div>

        <div
          v-if="loading"
          class="p-5"
          :data-testid="getTestId('loading-state')">
          <p class="text-xs text-zinc-300">Loading...</p>
        </div>

        <div
          v-else-if="items.length === 0"
          class="p-7 text-center"
          :data-testid="getTestId('empty-state')">
          <p class="text-sm font-semibold text-white">Nothing here yet</p>
          <p class="mt-1 text-sm text-zinc-300">
            Add your first meal to see it in the list.
          </p>
        </div>

        <div
          v-else-if="visibleItems.length === 0"
          class="p-7 text-center"
          :data-testid="getTestId('no-results-state')">
          <p class="text-sm font-semibold text-white">Nothing found</p>
          <p class="mt-1 text-sm text-zinc-300">Try adjusting your query.</p>
          <Button
            class="mt-3"
            :data-testid="getTestId('reset-search-button')"
            variant="outline"
            @click="query = ''">
            Reset search
          </Button>
        </div>

        <ul
          v-else
          class="divide-y divide-white/10"
          :data-testid="getTestId('meals-list')">
          <li
            v-for="item in visibleItems"
            :key="item.id"
            class="px-4 py-4"
            :data-testid="getTestId('meal-item')">
            <div class="flex items-start justify-between gap-3">
              <div class="flex w-full flex-col gap-1">
                <p class="line-clamp-2 text-sm font-semibold text-white">
                  {{ item.name }}
                </p>
                <div class="flex flex-wrap items-center gap-2 text-xs">
                  <span
                    class="rounded-full border border-amber-200/25 bg-amber-200/10 px-2 py-1 font-medium text-amber-100">
                    {{ formatMacro(getMealTotals(item).kcal) }} kcal
                  </span>
                  <span class="text-zinc-400">{{ formatSummary(item) }}</span>
                </div>
                <p class="text-xs break-words text-zinc-400">
                  P {{ formatMacro(getMealTotals(item).protein) }} · F
                  {{ formatMacro(getMealTotals(item).fat) }} · C
                  {{ formatMacro(getMealTotals(item).carbs) }}
                </p>
              </div>
              <div class="flex shrink-0 items-center gap-2">
                <Button
                  aria-label="Edit meal"
                  size="icon"
                  variant="outline"
                  @click="startEdit(item)">
                  <PencilIcon />
                </Button>
                <Button
                  aria-label="Delete meal"
                  size="icon"
                  variant="outline"
                  @click="removeMeal(item.id)">
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
    </div>

    <MealFormDrawer
      v-model:open="showMealFormModal"
      :deps="{ saveMeal: props.deps.saveMeal }"
      :foods="foods"
      :meal="editingMeal" />
  </section>
</template>

<script lang="ts">
import type {
  DeleteMeal,
  SaveMeal,
  ViewFoodsList,
  ViewMealsList,
} from '@/features/meals/actions'

export type MealsPageViewDeps = {
  deleteMeal: DeleteMeal
  saveMeal: SaveMeal
  viewFoodsList: ViewFoodsList
  viewMealsList: ViewMealsList
}
</script>

<script lang="ts" setup>
import { PencilIcon, SearchIcon, TrashIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'

import type { Food } from '@/domain/foods/types'
import type { Meal } from '@/domain/meals/types'

import { calculateMealTotals } from '@/domain/nutrition/calculate-macros'
import { useTestId } from '@/lib/use-test-id'
import { filterByQuery } from '@/shared/collection'
import { getInfraErrorMessage } from '@/ui/forms/errors'
import MealFormDrawer from '@/ui/pages/app/meals/children/MealFormDrawer.vue'
import { useViewFoodsListQuery } from '@/ui/query-hooks/foods/use-view-foods-list-query'
import { useDeleteMealMutation } from '@/ui/query-hooks/meals/use-delete-meal-mutation'
import { useViewMealsListQuery } from '@/ui/query-hooks/meals/use-view-meals-list-query'
import { Button } from '@/ui/shadcn/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/ui/shadcn/components/ui/input-group'

const props = defineProps<{
  deps: MealsPageViewDeps
}>()

const { getTestId } = useTestId('meals-page')

const { data: listResult, isLoading: loading } = useViewMealsListQuery(
  props.deps.viewMealsList,
)
const { data: foodsResult } = useViewFoodsListQuery(props.deps.viewFoodsList)
const { mutateAsync: deleteMeal } = useDeleteMealMutation(props.deps.deleteMeal)

const listError = computed(() =>
  listResult.value && !listResult.value.ok ? 'Failed to load meals' : '',
)

const items = computed(() =>
  listResult.value && listResult.value.ok ? listResult.value.value : [],
)

const foods = computed(() =>
  foodsResult.value && foodsResult.value.ok ? foodsResult.value.value : [],
)

const foodsById = computed(() => {
  const map = new Map<string, Food>()
  for (const food of foods.value) map.set(food.id, food)
  return map
})

const query = ref('')
const formattedDate = new Intl.DateTimeFormat(undefined, {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date())
const deleteError = ref('')

const visibleItems = computed(() => filterByQuery(items.value, query.value))

const showMealFormModal = ref(false)
const editingMeal = ref<Meal | undefined>()

const startCreate = (): void => {
  editingMeal.value = undefined
  showMealFormModal.value = true
}

const startEdit = (item: Meal): void => {
  editingMeal.value = item
  showMealFormModal.value = true
}

const removeMeal = async (id: string): Promise<void> => {
  deleteError.value = ''
  const res = await deleteMeal(id)
  if (!res.ok) {
    deleteError.value =
      res.error._t === 'infra'
        ? getInfraErrorMessage(res.error)
        : 'Meal no longer exists'
  }
}

const getMealTotals = (meal: Meal) => calculateMealTotals(meal, foodsById.value)

const formatMacro = (value: number): string => {
  if (!Number.isFinite(value)) return '0'
  return Number.isInteger(value) ? `${value}` : value.toFixed(1)
}

const formatSummary = (meal: Meal): string => {
  const totals = getMealTotals(meal)
  const count = meal.items.length
  return `${count} items · ${formatMacro(totals.grams)} g`
}
</script>
