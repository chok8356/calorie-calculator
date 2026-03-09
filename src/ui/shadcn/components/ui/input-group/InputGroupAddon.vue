<template>
  <div
    :class="cn(inputGroupAddonVariants({ align: props.align }), props.class)"
    :data-align="props.align"
    data-slot="input-group-addon"
    role="group"
    @click="handleInputGroupAddonClick">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { cn } from '@/ui/shadcn/lib/utils'

import type { InputGroupVariants } from '.'

import { inputGroupAddonVariants } from '.'

const props = withDefaults(
  defineProps<{
    align?: InputGroupVariants['align']
    class?: HTMLAttributes['class']
  }>(),
  {
    align: 'inline-start',
  },
)

function handleInputGroupAddonClick(e: MouseEvent) {
  const currentTarget = e.currentTarget as HTMLElement | null
  const target = e.target as HTMLElement | null
  if (target && target.closest('button')) {
    return
  }
  if (currentTarget && currentTarget?.parentElement) {
    currentTarget.parentElement?.querySelector('input')?.focus()
  }
}
</script>
