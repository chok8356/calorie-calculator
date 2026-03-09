<template>
  <DrawerDescription
    v-bind="delegatedProps"
    :class="cn('text-muted-foreground text-sm', props.class)"
    data-slot="drawer-description">
    <slot />
  </DrawerDescription>
</template>

<script lang="ts" setup>
import type { DrawerDescriptionProps } from 'vaul-vue'
import type { HTMLAttributes } from 'vue'

import { reactiveOmit } from '@vueuse/core'
import { DrawerDescription } from 'vaul-vue'

import { cn } from '@/ui/shadcn/lib/utils'

const props = defineProps<
  DrawerDescriptionProps & { class?: HTMLAttributes['class'] }
>()

const delegatedProps = reactiveOmit(props, 'class')
</script>
