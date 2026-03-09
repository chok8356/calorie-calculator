<template>
  <Drawer
    :open="open"
    @update:open="onOpenChange">
    <DrawerContent
      class="rounded-t-3xl border-t border-white/10 bg-zinc-950/80 shadow-xl backdrop-blur-xl">
      <DrawerHeader class="px-5 pt-4">
        <DrawerTitle class="text-white">
          {{ isEditing ? 'Edit food' : 'New food' }}
        </DrawerTitle>
        <DrawerDescription class="text-zinc-400">
          Enter nutrition values per 100 g. Use label/package data if possible.
        </DrawerDescription>
      </DrawerHeader>

      <div class="px-5 pb-5">
        <div class="rounded-2xl border border-white/10 bg-zinc-900/50 p-4">
          <form
            class="space-y-4"
            @submit="onSubmit">
            <div class="space-y-2">
              <Label class="text-white"> Name </Label>
              <Input
                v-model="name"
                placeholder="For example: Oatmeal" />
            </div>

            <div class="grid grid-cols-2 items-start gap-3">
              <div class="space-y-2">
                <Label class="text-white"> Calories (kcal) </Label>
                <NumberField
                  :format-options="{ maximumFractionDigits: 1 }"
                  :min="0"
                  :model-value="kcal"
                  :step="0.1"
                  @update:modelValue="
                    (value) => {
                      kcal = value
                    }
                  ">
                  <NumberFieldContent>
                    <NumberFieldInput />
                  </NumberFieldContent>
                </NumberField>
              </div>

              <div class="space-y-2">
                <Label class="text-white"> Protein (g) </Label>
                <NumberField
                  :format-options="{ maximumFractionDigits: 1 }"
                  :min="0"
                  :model-value="protein"
                  :step="0.1"
                  @update:modelValue="
                    (value) => {
                      protein = value
                    }
                  ">
                  <NumberFieldContent>
                    <NumberFieldInput />
                  </NumberFieldContent>
                </NumberField>
              </div>

              <div class="space-y-2">
                <Label class="text-white"> Fat (g) </Label>
                <NumberField
                  :format-options="{ maximumFractionDigits: 1 }"
                  :min="0"
                  :model-value="fat"
                  :step="0.1"
                  @update:modelValue="
                    (value) => {
                      fat = value
                    }
                  ">
                  <NumberFieldContent>
                    <NumberFieldInput />
                  </NumberFieldContent>
                </NumberField>
              </div>

              <div class="space-y-2">
                <Label class="text-white"> Carbs (g) </Label>
                <NumberField
                  :format-options="{ maximumFractionDigits: 1 }"
                  :min="0"
                  :model-value="carbs"
                  :step="0.1"
                  @update:modelValue="
                    (value) => {
                      carbs = value
                    }
                  ">
                  <NumberFieldContent>
                    <NumberFieldInput />
                  </NumberFieldContent>
                </NumberField>
              </div>
            </div>

            <div class="rounded-xl border border-white/10 bg-zinc-950/45 p-3">
              <p class="text-xs text-zinc-300">Preview per 100 g</p>
              <p class="mt-1 text-sm font-semibold text-white">
                {{ formatNumber(kcal ?? 0) }} kcal
              </p>
              <p class="mt-1 text-xs text-zinc-400">
                P {{ formatNumber(protein ?? 0) }} · F
                {{ formatNumber(fat ?? 0) }} · C {{ formatNumber(carbs ?? 0) }}
              </p>
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
                  type="submit"
                  variant="default">
                  {{
                    submitting
                      ? 'Saving...'
                      : isEditing
                        ? 'Save changes'
                        : 'Create food'
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
import { computed, nextTick, ref, watch } from 'vue'

import type { Food } from '@/domain/foods/types'
import type { SaveFood } from '@/features/foods/actions'

import { getInfraErrorMessage } from '@/ui/forms/errors'
import { requireNonEmpty, requireNonNegative } from '@/ui/forms/validation'
import { useSaveFoodMutation } from '@/ui/query-hooks/foods/use-save-food-mutation.ts'
import { Button } from '@/ui/shadcn/components/ui/button'
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

const props = defineProps<{
  deps: {
    saveFood: SaveFood
  }
  food?: Food
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', v: boolean): void
  (e: 'saved', food: Food): void
}>()

const { mutateAsync: saveFood } = useSaveFoodMutation(props.deps.saveFood)

const isEditing = computed(() => !!props.food?.id)
const nameInputRef = ref<HTMLInputElement | null>(null)
const submitting = ref(false)
const name = ref('')
const kcal = ref<null | number>(null)
const protein = ref<null | number>(null)
const fat = ref<null | number>(null)
const carbs = ref<null | number>(null)
const submitError = ref('')

const setFormValues = (food?: Food): void => {
  name.value = food?.name ?? ''
  kcal.value = food?.per100g.kcal ?? null
  protein.value = food?.per100g.protein ?? null
  fat.value = food?.per100g.fat ?? null
  carbs.value = food?.per100g.carbs ?? null
  submitError.value = ''
}

watch(
  () => [props.open, props.food?.id] as const,
  ([open]) => {
    if (!open) return
    setFormValues(props.food)
    void nextTick(() => {
      nameInputRef.value?.focus()
    })
  },
  { immediate: true },
)

const onOpenChange = (v: boolean) => emit('update:open', v)

const formatNumber = (value: number): string => {
  if (!Number.isFinite(value)) return '0'
  return Number.isInteger(value) ? `${value}` : value.toFixed(1)
}

const validateForm = (): string => {
  return (
    requireNonEmpty(name.value, 'Name') ??
    requireNonNegative(kcal.value ?? 0, 'Kcal') ??
    requireNonNegative(protein.value ?? 0, 'Protein') ??
    requireNonNegative(fat.value ?? 0, 'Fat') ??
    requireNonNegative(carbs.value ?? 0, 'Carbs') ??
    ''
  )
}

const onSubmit = async (event: Event): Promise<void> => {
  event.preventDefault()
  submitError.value = ''

  const payload: Food = {
    id: props.food?.id ?? crypto.randomUUID(),
    name: name.value.trim(),
    per100g: {
      carbs: carbs.value ?? 0,
      fat: fat.value ?? 0,
      kcal: kcal.value ?? 0,
      protein: protein.value ?? 0,
    },
  }

  const validationError = validateForm()
  if (validationError) {
    submitError.value = validationError
    return
  }

  submitting.value = true
  const res = await saveFood(payload)
  submitting.value = false
  if (!res.ok) {
    submitError.value = getInfraErrorMessage(res.error)
    return
  }

  emit('update:open', false)
}
</script>
