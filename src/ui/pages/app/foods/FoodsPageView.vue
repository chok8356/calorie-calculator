<template>
  <section
    class="relative h-full overflow-auto pb-25"
    :data-testid="getTestId('root')">
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-42 bg-gradient-to-b from-emerald-400/20 via-cyan-300/10 to-transparent" />
    <header
      class="sticky top-0 z-2 flex w-full items-end justify-between gap-3 px-5 pt-6 pb-4 backdrop-blur-md">
      <div class="space-y-1.5">
        <p
          class="text-[11px] font-semibold tracking-[0.22em] text-emerald-100/70 uppercase">
          Food Database
        </p>
        <h1 class="text-3xl font-bold tracking-tight text-white">Foods</h1>
        <span class="text-xs font-medium text-zinc-300"
          >Today • {{ formattedDate }}</span
        >
        <p class="text-xs text-zinc-300">
          Keep products here to quickly assemble meals and summary entries.
        </p>
      </div>

      <Button
        class="bg-emerald-300/90 text-zinc-950 shadow-lg shadow-emerald-400/15 hover:bg-emerald-200"
        :data-testid="getTestId('add-food-button')"
        @click="startCreate">
        Add new food
      </Button>
    </header>

    <div class="space-y-4 px-5 pb-6">
      <div class="grid gap-3 sm:grid-cols-2">
        <div
          class="rounded-2xl border border-white/10 bg-zinc-950/30 p-4 backdrop-blur-xl">
          <p
            class="text-[11px] font-semibold tracking-wide text-zinc-400 uppercase">
            Total foods
          </p>
          <p
            class="mt-2 text-2xl font-semibold text-white"
            :data-testid="getTestId('total-items-value')">
            {{ items.length }}
          </p>
          <p class="mt-1 text-xs text-zinc-400">
            All products in your database
          </p>
        </div>
        <div
          class="rounded-2xl border border-emerald-300/20 bg-zinc-950/30 p-4 backdrop-blur-xl">
          <p
            class="text-[11px] font-semibold tracking-wide text-zinc-400 uppercase">
            Search results
          </p>
          <p
            class="mt-2 text-2xl font-semibold text-emerald-200"
            :data-testid="getTestId('visible-items-value')">
            {{ visibleItems.length }}
          </p>
          <p class="mt-1 text-xs text-zinc-400">
            Foods that match current query
          </p>
        </div>
      </div>

      <div
        class="rounded-2xl border border-white/10 bg-zinc-950/35 p-4 backdrop-blur-xl">
        <p class="mb-2 text-xs font-medium text-zinc-400">Quick search</p>
        <InputGroup class="w-full">
          <InputGroupAddon>
            <SearchIcon class="text-emerald-200" />
          </InputGroupAddon>
          <InputGroupInput
            v-model="query"
            :data-testid="getTestId('search-input')"
            placeholder="Find food by name..." />
          <InputGroupAddon align="inline-end">
            <span
              class="text-xs text-zinc-400"
              :data-testid="getTestId('search-counter')"
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
          <h2 class="text-base font-semibold text-white">Food list</h2>
          <p class="mt-1 text-xs text-zinc-400">
            Edit values to keep calories and macros accurate.
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
            Add your first food to see it in the list.
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
          :data-testid="getTestId('foods-list')">
          <li
            v-for="item in visibleItems"
            :key="item.id"
            class="px-4 py-4"
            :data-testid="getTestId('food-item')">
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0 space-y-1">
                <p class="text-sm font-semibold text-white">{{ item.name }}</p>
                <div class="flex flex-wrap items-center gap-2 text-xs">
                  <span
                    class="rounded-full border border-emerald-200/25 bg-emerald-200/10 px-2 py-1 font-medium text-emerald-100">
                    {{ item.per100g.kcal }} kcal / 100g
                  </span>
                  <span class="text-zinc-400">
                    P {{ item.per100g.protein }} · F {{ item.per100g.fat }} · C
                    {{ item.per100g.carbs }}
                  </span>
                </div>
                <p class="text-[11px] text-zinc-500">
                  Per 100 grams reference values
                </p>
              </div>
              <div class="flex shrink-0 items-center gap-2">
                <Button
                  aria-label="Edit food"
                  size="icon"
                  variant="outline"
                  @click="startEdit(item)">
                  <PencilIcon />
                </Button>
                <Button
                  aria-label="Delete food"
                  size="icon"
                  variant="outline"
                  @click="removeFood(item.id)">
                  <TrashIcon />
                </Button>
              </div>
            </div>
          </li>
        </ul>

        <div
          v-if="listError"
          class="p-5"
          :data-testid="getTestId('list-error')">
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

    <FoodFormDrawer
      v-model:open="showFoodFormModal"
      :deps="{ saveFood: props.deps.saveFood }"
      :food="editingFood" />
  </section>
</template>

<script lang="ts">
import type {
  DeleteFood,
  SaveFood,
  ViewFoodsList,
} from '@/features/foods/actions'

export type FoodsPageViewDeps = {
  deleteFood: DeleteFood
  saveFood: SaveFood
  viewFoodsList: ViewFoodsList
}
</script>

<script lang="ts" setup>
import { PencilIcon, SearchIcon, TrashIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'

import type { Food } from '@/domain/foods/types.ts'

import { useTestId } from '@/lib/use-test-id.ts'
import { filterByQuery } from '@/shared/collection'
import { getInfraErrorMessage } from '@/ui/forms/errors'
import FoodFormDrawer from '@/ui/pages/app/foods/children/FoodFormDrawer.vue'
import { useDeleteFoodMutation } from '@/ui/query-hooks/foods/use-delete-food-mutation.ts'
import { useViewFoodsListQuery } from '@/ui/query-hooks/foods/use-view-foods-list-query.ts'
import { Button } from '@/ui/shadcn/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/ui/shadcn/components/ui/input-group'

const props = defineProps<{
  deps: FoodsPageViewDeps
}>()

const { getTestId } = useTestId('foods-page')

const { data: listResult, isLoading: loading } = useViewFoodsListQuery(
  props.deps.viewFoodsList,
)
const { mutateAsync: deleteFood } = useDeleteFoodMutation(props.deps.deleteFood)

const listError = computed(() =>
  listResult.value && !listResult.value.ok ? 'Failed to load foods' : '',
)

const items = computed(() =>
  listResult.value && listResult.value.ok ? listResult.value.value : [],
)

const query = ref('')
const formattedDate = new Intl.DateTimeFormat(undefined, {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date())
const deleteError = ref('')

const visibleItems = computed(() => filterByQuery(items.value, query.value))

const showFoodFormModal = ref(false)
const editingFood = ref<Food | undefined>()

const startCreate = (): void => {
  editingFood.value = undefined
  showFoodFormModal.value = true
}

const startEdit = (item: Food): void => {
  editingFood.value = item
  showFoodFormModal.value = true
}

const removeFood = async (id: string): Promise<void> => {
  deleteError.value = ''
  const res = await deleteFood(id)
  if (!res.ok) {
    deleteError.value =
      res.error._t === 'infra'
        ? getInfraErrorMessage(res.error)
        : 'Food no longer exists'
  }
}
</script>
