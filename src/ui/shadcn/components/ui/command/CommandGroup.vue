<template>
  <ListboxGroup
    v-bind="delegatedProps"
    :id="id"
    :class="cn('text-foreground overflow-hidden p-1', props.class)"
    data-slot="command-group"
    :hidden="isRender ? undefined : true">
    <ListboxGroupLabel
      v-if="heading"
      class="text-muted-foreground px-2 py-1.5 text-xs font-medium"
      data-slot="command-group-heading">
      {{ heading }}
    </ListboxGroupLabel>
    <slot />
  </ListboxGroup>
</template>

<script setup lang="ts">
import type { ListboxGroupProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

import { reactiveOmit } from '@vueuse/core'
import { ListboxGroup, ListboxGroupLabel, useId } from 'reka-ui'
import { computed, onMounted, onUnmounted } from 'vue'

import { cn } from '@/ui/shadcn/lib/utils'

import { provideCommandGroupContext, useCommand } from '.'

const props = defineProps<
  ListboxGroupProps & {
    class?: HTMLAttributes['class']
    heading?: string
  }
>()

const delegatedProps = reactiveOmit(props, 'class')

const { allGroups, filterState } = useCommand()
const id = useId()

const isRender = computed(() =>
  !filterState.search ? true : filterState.filtered.groups.has(id),
)

provideCommandGroupContext({ id })
onMounted(() => {
  if (!allGroups.value.has(id)) allGroups.value.set(id, new Set())
})
onUnmounted(() => {
  allGroups.value.delete(id)
})
</script>
