<template>
  <div
    class="flex min-h-screen w-screen items-center justify-center overflow-auto p-8">
    <div
      class="app-bg relative aspect-9/19 w-full max-w-115 overflow-hidden rounded-(--app-rounded) border-10">
      <RouterView />
      <div
        class="pointer-events-none absolute top-0 left-0 z-1 h-30 w-full bg-linear-to-b from-black/60 via-black/80 to-transparent"></div>
      <div
        class="pointer-events-none absolute bottom-0 left-0 z-1 h-20 w-full bg-linear-to-t from-black/60 to-transparent"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
</script>
