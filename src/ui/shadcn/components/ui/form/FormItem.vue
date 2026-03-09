<template>
  <div
    :class="cn('grid gap-2', props.class)"
    data-slot="form-item">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

import { useId } from 'reka-ui'
import { provide } from 'vue'

import { cn } from '@/ui/shadcn/lib/utils'

import { FORM_ITEM_INJECTION_KEY } from './injectionKeys'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const id = useId()
provide(FORM_ITEM_INJECTION_KEY, id)
</script>
