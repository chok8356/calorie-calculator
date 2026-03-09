<template>
  <div
    :class="cn('flex flex-col gap-1.5 p-4', props.class)"
    data-slot="drawer-header">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

import { cn } from '@/ui/shadcn/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>
