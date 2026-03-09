<template>
  <SummaryPageView :deps="deps" />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

import { createViewFoodsList } from '@/infra/foods/view-foods-list.ts'
import { createViewMealsList } from '@/infra/meals/view-meals-list.ts'
import { createViewProfile } from '@/infra/profile/view-profile.ts'
import { createDeleteSummaryEntry } from '@/infra/summary/delete-summary-entry.ts'
import { createSaveSummaryEntry } from '@/infra/summary/save-summary-entry.ts'
import { createViewSummaryList } from '@/infra/summary/view-summary-list.ts'

const SummaryPageView = defineAsyncComponent(
  () => import('./SummaryPageView.vue'),
)

const deps = {
  deleteSummaryEntry: createDeleteSummaryEntry(window.localStorage),
  saveSummaryEntry: createSaveSummaryEntry(window.localStorage),
  viewFoodsList: createViewFoodsList(window.localStorage),
  viewMealsList: createViewMealsList(window.localStorage),
  viewProfile: createViewProfile(window.localStorage),
  viewSummaryList: createViewSummaryList(window.localStorage),
}
</script>
