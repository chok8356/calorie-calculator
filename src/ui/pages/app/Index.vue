<template>
  <RouterView />
  <AppNav />
  <div id="drawer-root"></div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import AppNav from '@/ui/components/AppNav.vue'
</script>
