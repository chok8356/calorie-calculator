<template>
  <textarea
    v-model="modelValue"
    :class="
      cn(
        'placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border-input flex min-h-20 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        props.class,
      )
    " />
</template>

<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'

import { cn } from '@/ui/shadcn/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  defaultValue?: string | undefined
  modelValue?: string | undefined
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
