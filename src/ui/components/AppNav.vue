<template>
  <nav
    class="absolute bottom-4 left-1/2 z-3 flex -translate-x-1/2 items-center justify-center gap-1 rounded-3xl bg-zinc-900/60 px-2 py-2 shadow-xl ring-1 ring-white/10 backdrop-blur-xl">
    <AppNavItem
      :icon="HouseIcon"
      label="Summary"
      :to="ROUTES.SUMMARY" />
    <AppNavItem
      :icon="ClipboardListIcon"
      label="Foods"
      :to="ROUTES.FOODS" />
    <AppNavItem
      :icon="UtensilsIcon"
      label="Meals"
      :to="ROUTES.MEALS" />
    <AppNavItem
      :icon="UserIcon"
      label="Profile"
      :to="ROUTES.PROFILE" />
  </nav>
</template>

<script setup lang="ts">
import {
  ClipboardListIcon,
  HouseIcon,
  UserIcon,
  UtensilsIcon,
} from 'lucide-vue-next'

import { ROUTES } from '@/ui/router/routes.ts'

import AppNavItem from './AppNavItem.vue'
</script>
