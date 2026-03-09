<template>
  <DrawerTitle
    v-bind="delegatedProps"
    :class="cn('text-foreground font-semibold', props.class)"
    data-slot="drawer-title">
    <slot />
  </DrawerTitle>
</template>

<script lang="ts" setup>
import type { DrawerTitleProps } from 'vaul-vue'
import type { HTMLAttributes } from 'vue'

import { reactiveOmit } from '@vueuse/core'
import { DrawerTitle } from 'vaul-vue'

import { cn } from '@/ui/shadcn/lib/utils'

const props = defineProps<
  DrawerTitleProps & { class?: HTMLAttributes['class'] }
>()

const delegatedProps = reactiveOmit(props, 'class')
</script>
