<template>
  <FoodsPageView :deps="deps" />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

import { createDeleteFood } from '@/infra/foods/delete-food.ts'
import { createSaveFood } from '@/infra/foods/save-food.ts'
import { createViewFoodsList } from '@/infra/foods/view-foods-list.ts'

const FoodsPageView = defineAsyncComponent(() => import('./FoodsPageView.vue'))

const deps = {
  deleteFood: createDeleteFood(window.localStorage),
  saveFood: createSaveFood(window.localStorage),
  viewFoodsList: createViewFoodsList(window.localStorage),
}
</script>
