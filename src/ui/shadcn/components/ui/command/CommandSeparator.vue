<template>
  <Separator
    v-bind="delegatedProps"
    :class="cn('bg-border -mx-1 h-px', props.class)"
    data-slot="command-separator">
    <slot />
  </Separator>
</template>

<script setup lang="ts">
import type { SeparatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

import { reactiveOmit } from '@vueuse/core'
import { Separator } from 'reka-ui'

import { cn } from '@/ui/shadcn/lib/utils'

const props = defineProps<
  SeparatorProps & { class?: HTMLAttributes['class'] }
>()

const delegatedProps = reactiveOmit(props, 'class')
</script>
