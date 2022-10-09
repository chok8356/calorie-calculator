<template>
  <div :class="$style.root">
    <h3>Total</h3>

    <!--facts-->
    <ProductNutritionFactsList :facts="mealPlanTotalInfoStore.totalInfo.nutritionFacts" />

    <!--amount-->
    <div :class="$style.amount">
      <label>Amount</label>
      <b>{{ mealPlanTotalInfoStore.totalInfo.amount.toFixed(2) }}</b>
    </div>

    <!--download-->
    <Button
      :class="$style.button"
      @click="mealPlanTotalInfoStore.downloadMealPlan">
      Download .xlsx
    </Button>
  </div>
</template>

<script lang="ts" setup>
import { ProductNutritionFactsList } from '@/entities/product';
import { Button } from '@/shared/ui/components';
import { mealPlanTotalInfoModel } from '@/widgets/meal-plan-total-info';

const mealPlanTotalInfoStore = mealPlanTotalInfoModel.use();
</script>

<style lang="scss" module>
.root {
  background-color: var(--color-grey-0);
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;

  h3 {
    line-height: 1;
  }
}

.amount {
  align-items: center;
  display: grid;
  gap: 0 1rem;
  grid-template-columns: auto 1fr;

  label {
    color: var(--color-grey-75);

    &::first-letter {
      text-transform: uppercase;
    }
  }

  b {
    font-weight: 500;
  }
}
</style>
