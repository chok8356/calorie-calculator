<template>
  <RouterLink
    v-slot="{ isActive }"
    :to="to">
    <div
      :class="[
        'flex w-20 flex-col items-center gap-1 rounded-2xl px-3 py-2',
        isActive
          ? 'bg-black/5 text-zinc-950 dark:bg-white/10 dark:text-white'
          : 'text-zinc-600 hover:bg-black/5 dark:text-zinc-300 dark:hover:bg-white/5',
      ]">
      <component
        :is="icon"
        class="h-4 w-4" />
      <span class="text-xs font-medium">{{ label }}</span>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { type Component } from 'vue'
import { RouterLink } from 'vue-router'

defineProps<{
  icon: Component
  label: string
  to: string
}>()
</script>
