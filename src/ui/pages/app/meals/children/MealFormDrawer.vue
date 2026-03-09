<template>
  <Drawer
    :open="open"
    @update:open="onOpenChange">
    <DrawerContent
      class="flex max-h-[88svh] flex-col rounded-t-3xl border-t border-white/10 bg-zinc-950/80 shadow-xl backdrop-blur-xl">
      <DrawerHeader class="px-4 pt-3 pb-2">
        <DrawerTitle class="text-white">
          {{ isEditing ? 'Edit meal' : 'New meal' }}
        </DrawerTitle>
        <DrawerDescription class="text-zinc-400">
          Build a reusable meal from foods and set grams for each item.
        </DrawerDescription>
      </DrawerHeader>

      <div class="min-h-0 overflow-auto px-4 pb-4">
        <div class="rounded-2xl border border-white/10 bg-zinc-900/50 p-3">
          <form
            class="space-y-3"
            @submit="onSubmit">
            <div class="space-y-2">
              <Label class="text-white"> Name </Label>
              <Input
                v-model="name"
                placeholder="For example: Breakfast bowl" />
            </div>

            <div class="space-y-2">
              <div class="flex items-center justify-between gap-2">
                <Label class="text-white"> Items </Label>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-zinc-400"
                    >{{ items.length }} items</span
                  >
                  <Button
                    size="sm"
                    type="button"
                    variant="outline"
                    @click="addItem">
                    Add item
                  </Button>
                </div>
              </div>

              <p
                v-if="foods.length === 0"
                class="text-xs text-zinc-300">
                Add foods in the Foods section before creating meals.
              </p>

              <div class="max-h-[36svh] space-y-2 overflow-auto pr-1">
                <div
                  v-for="(item, index) in items"
                  :key="item.id"
                  class="grid grid-cols-[minmax(0,1fr)_5rem_auto] items-end gap-2 rounded-xl border border-white/10 bg-zinc-950/60 p-2.5">
                  <div class="space-y-1">
                    <label class="text-[11px] text-zinc-400">Food</label>
                    <Popover v-model:open="item.open">
                      <PopoverTrigger as-child>
                        <Button
                          :aria-expanded="item.open"
                          class="h-9 w-full justify-between"
                          :disabled="foods.length === 0"
                          role="combobox"
                          variant="outline">
                          <span class="truncate">
                            {{
                              foodsById.get(item.foodId)?.name ?? 'Select food'
                            }}
                          </span>
                          <ChevronsUpDownIcon
                            class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        class="w-[var(--reka-popover-trigger-width)] p-0">
                        <Command>
                          <CommandInput placeholder="Search food..." />
                          <CommandEmpty>No food found.</CommandEmpty>
                          <CommandList>
                            <CommandGroup>
                              <CommandItem
                                v-for="food in foods"
                                :key="food.id"
                                :value="food.name"
                                @select="selectFood(item, food.id)">
                                <CheckIcon
                                  :class="
                                    cn(
                                      'mr-2 h-4 w-4',
                                      item.foodId === food.id
                                        ? 'opacity-100'
                                        : 'opacity-0',
                                    )
                                  " />
                                {{ food.name }}
                              </CommandItem>
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div class="space-y-1">
                    <label class="text-[11px] text-zinc-400">Grams</label>
                    <NumberField
                      :format-options="{ maximumFractionDigits: 1 }"
                      :min="0"
                      :model-value="item.grams"
                      :step="0.1"
                      @update:modelValue="
                        (value) => {
                          item.grams = value
                        }
                      ">
                      <NumberFieldContent>
                        <NumberFieldInput />
                      </NumberFieldContent>
                    </NumberField>
                  </div>

                  <Button
                    aria-label="Remove item"
                    class="h-9 w-9"
                    :disabled="items.length <= 1"
                    size="icon"
                    type="button"
                    variant="outline"
                    @click="removeItem(index)">
                    <XIcon class="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div
              class="rounded-lg border border-white/10 bg-zinc-950/50 p-2.5 text-xs">
              <div class="flex items-center justify-between gap-2">
                <p class="text-zinc-300">Meal total</p>
                <span
                  class="rounded-full border border-amber-200/25 bg-amber-200/10 px-2 py-0.5 font-medium text-amber-100">
                  {{ formatMacro(totals.kcal) }} kcal
                </span>
              </div>
              <p class="mt-1 text-zinc-400">
                Weight: {{ formatMacro(totals.grams) }} g
              </p>
              <p class="mt-1 text-white">
                P {{ formatMacro(totals.protein) }} · F
                {{ formatMacro(totals.fat) }} · C
                {{ formatMacro(totals.carbs) }}
              </p>
            </div>

            <p
              v-if="submitError"
              class="text-xs text-red-300">
              {{ submitError }}
            </p>

            <DrawerFooter class="px-0 pt-1 pb-0">
              <div class="flex gap-2">
                <DrawerClose as-child>
                  <Button
                    class="flex-1"
                    type="reset"
                    variant="outline">
                    Cancel
                  </Button>
                </DrawerClose>

                <Button
                  class="flex-1"
                  :disabled="submitting"
                  type="submit">
                  {{
                    submitting
                      ? 'Saving...'
                      : isEditing
                        ? 'Save changes'
                        : 'Create meal'
                  }}
                </Button>
              </div>
            </DrawerFooter>
          </form>
        </div>
      </div>
    </DrawerContent>
  </Drawer>
</template>

<script lang="ts" setup>
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'

import type { Food } from '@/domain/foods/types'
import type { Meal } from '@/domain/meals/types'
import type { SaveMeal } from '@/features/meals/actions'

import { getInfraErrorMessage } from '@/ui/forms/errors'
import { requireNonEmpty, requirePositive } from '@/ui/forms/validation'
import { useSaveMealMutation } from '@/ui/query-hooks/meals/use-save-meal-mutation'
import { Button } from '@/ui/shadcn/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/ui/shadcn/components/ui/command'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/ui/shadcn/components/ui/drawer'
import { Input } from '@/ui/shadcn/components/ui/input'
import { Label } from '@/ui/shadcn/components/ui/label'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldInput,
} from '@/ui/shadcn/components/ui/number-field'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/ui/shadcn/components/ui/popover'
import { cn } from '@/ui/shadcn/lib/utils'

type ItemDraft = {
  foodId: string
  grams: number
  id: string
  open: boolean
}

type MealTotals = {
  carbs: number
  fat: number
  grams: number
  kcal: number
  protein: number
}

const props = defineProps<{
  deps: {
    saveMeal: SaveMeal
  }
  foods: Food[]
  meal?: Meal
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', v: boolean): void
  (e: 'saved', meal: Meal): void
}>()

const { isPending: submitting, mutateAsync: saveMeal } = useSaveMealMutation(
  props.deps.saveMeal,
)

const isEditing = computed(() => !!props.meal?.id)

const name = ref('')
const items = ref<ItemDraft[]>([])
const submitError = ref('')

const foodsById = computed(() => {
  const map = new Map<string, Food>()
  for (const food of props.foods) map.set(food.id, food)
  return map
})

const totals = computed<MealTotals>(() => {
  const acc: MealTotals = {
    carbs: 0,
    fat: 0,
    grams: 0,
    kcal: 0,
    protein: 0,
  }

  for (const item of items.value) {
    const food = foodsById.value.get(item.foodId)
    if (!food) continue
    const multiplier = item.grams / 100
    acc.grams += item.grams
    acc.kcal += food.per100g.kcal * multiplier
    acc.protein += food.per100g.protein * multiplier
    acc.fat += food.per100g.fat * multiplier
    acc.carbs += food.per100g.carbs * multiplier
  }

  return acc
})

const formatMacro = (value: number): string => {
  if (!Number.isFinite(value)) return '0'
  return Number.isInteger(value) ? `${value}` : value.toFixed(1)
}

const resetForm = (meal?: Meal): void => {
  name.value = meal?.name ?? ''
  items.value = meal?.items.length
    ? meal.items.map((item) => ({
        foodId: item.foodId,
        grams: item.grams,
        id: crypto.randomUUID(),
        open: false,
      }))
    : [
        {
          foodId: '',
          grams: 100,
          id: crypto.randomUUID(),
          open: false,
        },
      ]
  submitError.value = ''
}

watch(
  () => [props.open, props.meal?.id] as const,
  ([open]) => {
    if (!open) return
    resetForm(props.meal)
  },
  { immediate: true },
)

const onOpenChange = (v: boolean) => emit('update:open', v)

const addItem = (): void => {
  items.value.push({
    foodId: '',
    grams: 100,
    id: crypto.randomUUID(),
    open: false,
  })
}

const removeItem = (index: number): void => {
  if (items.value.length <= 1) return
  items.value.splice(index, 1)
}

const selectFood = (item: ItemDraft, selectedId: string): void => {
  item.foodId = selectedId === item.foodId ? '' : selectedId
  item.open = false
}

const validateForm = (): string => {
  if (requireNonEmpty(name.value, 'Name')) return 'Name is required'
  if (!items.value.length) return 'Add at least one item'
  if (
    items.value.some(
      (item) =>
        !!requireNonEmpty(item.foodId, 'Food') ||
        !!requirePositive(item.grams, 'Grams'),
    )
  ) {
    return 'Each item needs a food and grams > 0'
  }
  return ''
}

const onSubmit = async (event: Event): Promise<void> => {
  event.preventDefault()
  submitError.value = ''

  const payload: Meal = {
    id: props.meal?.id ?? crypto.randomUUID(),
    items: items.value.map((item) => ({
      foodId: item.foodId,
      grams: item.grams,
    })),
    name: name.value,
  }

  const validationError = validateForm()
  if (validationError) {
    submitError.value = validationError
    return
  }

  const res = await saveMeal(payload)
  if (!res.ok) {
    submitError.value = getInfraErrorMessage(res.error)
    return
  }

  emit('update:open', false)
}
</script>
