<template>
  <MealsPageView :deps="deps" />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

import { createViewFoodsList } from '@/infra/foods/view-foods-list.ts'
import { createDeleteMeal } from '@/infra/meals/delete-meal.ts'
import { createSaveMeal } from '@/infra/meals/save-meal.ts'
import { createViewMealsList } from '@/infra/meals/view-meals-list.ts'

const MealsPageView = defineAsyncComponent(() => import('./MealsPageView.vue'))

const deps = {
  deleteMeal: createDeleteMeal(window.localStorage),
  saveMeal: createSaveMeal(window.localStorage),
  viewFoodsList: createViewFoodsList(window.localStorage),
  viewMealsList: createViewMealsList(window.localStorage),
}
</script>
