<template>
  <Select
    :options="addProductToMealPlanStore.products"
    placeholder="Select product"
    size="lg"
    type="secondary"
    @update:value="addProductToMealPlanStore.selectProduct">
  </Select>
</template>

<script lang="ts" setup>
import { addProductToMealPlanModel } from '@/features/add-product-to-meal-plan';
import { Select } from '@/shared/ui/components';

const addProductToMealPlanStore = addProductToMealPlanModel.use();
</script>
