<template>
  <Textarea
    :class="
      cn(
        'flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent',
        props.class,
      )
    "
    data-slot="input-group-control" />
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { Textarea } from '@/ui/shadcn/components/ui/textarea'
import { cn } from '@/ui/shadcn/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>
