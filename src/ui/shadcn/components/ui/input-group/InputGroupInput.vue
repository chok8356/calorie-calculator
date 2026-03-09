<template>
  <Input
    v-model="modelValue"
    :class="
      cn(
        'flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent',
        props.class,
      )
    "
    data-slot="input-group-control"
    :placeholder="placeholder" />
</template>

<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'

import { Input } from '@/ui/shadcn/components/ui/input'
import { cn } from '@/ui/shadcn/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  defaultValue?: string | undefined
  modelValue?: string | undefined
  placeholder?: string | undefined
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string): void
}>()

const modelValue = computed({
  get() {
    return props.modelValue ?? props.defaultValue ?? ''
  },
  set(value: string) {
    emits('update:modelValue', value)
  },
})
</script>
