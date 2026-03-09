<template>
  <Drawer
    :open="open"
    @update:open="onOpenChange">
    <DrawerContent
      class="rounded-t-3xl border-t border-white/10 bg-zinc-950/80 shadow-xl backdrop-blur-xl">
      <DrawerHeader class="px-5 pt-4">
        <DrawerTitle class="text-white">
          {{ isEditing ? 'Edit entry' : 'New entry' }}
        </DrawerTitle>
        <DrawerDescription class="text-zinc-400">
          Log what you ate and specify portion size in grams.
        </DrawerDescription>
      </DrawerHeader>

      <div class="px-5 pb-5">
        <div class="rounded-2xl border border-white/10 bg-zinc-900/50 p-4">
          <form
            class="space-y-4"
            @submit="onSubmit">
            <div class="space-y-2">
              <Label class="text-white"> Food or meal </Label>
              <Popover v-model:open="targetOpen">
                <PopoverTrigger as-child>
                  <Button
                    :aria-expanded="targetOpen"
                    class="w-full justify-between"
                    :disabled="availableTargets.length === 0"
                    role="combobox"
                    variant="outline">
                    <span class="truncate">
                      {{
                        selectedTargetLabel ||
                        (availableTargets.length
                          ? 'Select a food or meal'
                          : 'Add foods or meals first')
                      }}
                    </span>
                    <ChevronsUpDownIcon
                      class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  class="w-[var(--reka-popover-trigger-width)] p-0">
                  <Command>
                    <CommandInput placeholder="Search foods or meals..." />
                    <CommandEmpty>No match.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        <CommandItem
                          v-for="target in availableTargets"
                          :key="target.key"
                          :value="target.label"
                          @select="
                            () => {
                              targetId = target.key
                              targetOpen = false
                            }
                          ">
                          <CheckIcon
                            :class="
                              cn(
                                'mr-2 h-4 w-4',
                                targetId === target.key
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )
                            " />
                          {{ target.label }}
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div class="space-y-2">
              <Label class="text-white"> Portion (g) </Label>
              <NumberField
                :format-options="{ maximumFractionDigits: 1 }"
                :min="0"
                :model-value="grams"
                :step="0.1"
                @update:modelValue="
                  (value) => {
                    grams = value
                  }
                ">
                <NumberFieldContent>
                  <NumberFieldInput />
                </NumberFieldContent>
              </NumberField>
            </div>

            <div class="rounded-xl border border-white/10 bg-zinc-950/45 p-3">
              <p class="text-xs text-zinc-300">Entry preview</p>
              <p class="mt-1 text-sm font-semibold text-white">
                {{ selectedTargetName || 'No item selected' }}
              </p>
              <p class="mt-1 text-xs text-zinc-400">
                Portion: {{ formatNumber(grams) }} g
              </p>
            </div>

            <div
              v-if="createdAt"
              class="text-xs text-zinc-400">
              Added at {{ formatTime(createdAt) }}
            </div>

            <p
              v-if="submitError"
              class="text-xs text-red-300">
              {{ submitError }}
            </p>

            <DrawerFooter class="px-0 pb-0">
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
                        : 'Add entry'
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
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'

import type { Food } from '@/domain/foods/types'
import type { Meal } from '@/domain/meals/types'
import type { SummaryEntry } from '@/domain/summary/types'
import type { SaveSummaryEntry } from '@/features/summary/actions'

import { exhaustiveMatchingGuard } from '@/shared/exhaustive-matching-guard'
import { getInfraErrorMessage } from '@/ui/forms/errors'
import { requirePositive } from '@/ui/forms/validation'
import { useSaveSummaryEntryMutation } from '@/ui/query-hooks/summary/use-save-summary-entry-mutation'
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

type NamedOption = {
  _t: 'food' | 'meal'
  id: string
  key: string
  label: string
  name: string
}

const props = defineProps<{
  deps: {
    saveSummaryEntry: SaveSummaryEntry
  }
  entry?: SummaryEntry
  foods: Food[]
  meals: Meal[]
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', v: boolean): void
  (e: 'saved', entry: SummaryEntry): void
}>()

const { isPending: submitting, mutateAsync: saveEntry } =
  useSaveSummaryEntryMutation(props.deps.saveSummaryEntry)

const isEditing = computed(() => !!props.entry?.id)

const targetId = ref('')
const grams = ref(100)
const createdAt = ref('')
const submitError = ref('')
const targetOpen = ref(false)

const availableTargets = computed<NamedOption[]>(() => [
  ...props.foods.map((food) => ({
    _t: 'food' as const,
    id: food.id,
    key: `food:${food.id}`,
    label: `Food · ${food.name}`,
    name: food.name,
  })),
  ...props.meals.map((meal) => ({
    _t: 'meal' as const,
    id: meal.id,
    key: `meal:${meal.id}`,
    label: `Meal · ${meal.name}`,
    name: meal.name,
  })),
])

const selectedTargetLabel = computed(() => {
  return (
    availableTargets.value.find((target) => target.key === targetId.value)
      ?.label ?? ''
  )
})

const selectedTargetName = computed(() => {
  return (
    availableTargets.value.find((target) => target.key === targetId.value)
      ?.name ?? ''
  )
})

const resetForm = (entry?: SummaryEntry): void => {
  const nextTargetId = (() => {
    if (!entry) return ''
    switch (entry._t) {
      case 'food':
        return `food:${entry.foodId}`
      case 'meal':
        return `meal:${entry.mealId}`
      default:
        return exhaustiveMatchingGuard(entry)
    }
  })()
  targetId.value = nextTargetId
  grams.value = entry?.grams ?? 100
  createdAt.value = entry?.createdAt ?? ''
  submitError.value = ''
  targetOpen.value = false
}

watch(
  () => [props.open, props.entry?.id] as const,
  ([open]) => {
    if (!open) return
    resetForm(props.entry)
  },
  { immediate: true },
)

const onOpenChange = (v: boolean) => emit('update:open', v)

const formatTime = (value: string): string => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '--:--'
  return date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  })
}

const formatNumber = (value: number): string => {
  if (!Number.isFinite(value)) return '0'
  return Number.isInteger(value) ? `${value}` : value.toFixed(1)
}

const validateForm = (): string => {
  if (!targetId.value) return 'Choose a food or meal'
  if (requirePositive(grams.value, 'Grams')) return 'Enter grams > 0'
  return ''
}

const onSubmit = async (event: Event): Promise<void> => {
  event.preventDefault()
  submitError.value = ''

  const validationError = validateForm()
  if (validationError) {
    submitError.value = validationError
    return
  }

  const selectedTarget = availableTargets.value.find(
    (target) => target.key === targetId.value,
  )
  const fallbackType = props.entry?._t ?? 'food'
  const selectedType = selectedTarget?._t ?? fallbackType
  const targetValue = (() => {
    if (selectedTarget?.id) return selectedTarget.id
    if (!props.entry) return ''
    switch (selectedType) {
      case 'food':
        if (props.entry._t === 'food') return props.entry.foodId
        return ''
      case 'meal':
        if (props.entry._t === 'meal') return props.entry.mealId
        return ''
      default:
        return exhaustiveMatchingGuard(selectedType)
    }
  })()
  const created = props.entry?.createdAt ?? new Date().toISOString()
  const entryId = props.entry?.id ?? crypto.randomUUID()
  const payload: SummaryEntry = (() => {
    switch (selectedType) {
      case 'food':
        return {
          _t: 'food',
          createdAt: created,
          foodId: targetValue,
          grams: grams.value,
          id: entryId,
        }
      case 'meal':
        return {
          _t: 'meal',
          createdAt: created,
          grams: grams.value,
          id: entryId,
          mealId: targetValue,
        }
      default:
        return exhaustiveMatchingGuard(selectedType)
    }
  })()

  const res = await saveEntry(payload)
  if (!res.ok) {
    submitError.value = getInfraErrorMessage(res.error)
    return
  }

  emit('update:open', false)
}
</script>
